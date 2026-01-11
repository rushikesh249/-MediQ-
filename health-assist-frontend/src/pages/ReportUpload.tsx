import React, { useState, useCallback } from 'react';
import {
    Box, Typography, Paper, Button, LinearProgress, IconButton, Alert, Fade, Card, CardContent, Divider
} from '@mui/material';
import { CloudUpload as CloudUploadIcon, Close as CloseIcon, Description as FileIcon, MedicalServices as DoctorIcon, AutoAwesome as AiIcon, Map as MapIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { analyzeReportFile } from '../services/aiService';
import HospitalMap from '../components/map/HospitalMap';
import ErrorBoundary from '../components/common/ErrorBoundary';

const ReportUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [aiResult, setAiResult] = useState<{ explanation: string; specialist: string } | null>(null);
    const [showMap, setShowMap] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const uploadedFile = acceptedFiles[0];
        if (uploadedFile) {
            if (uploadedFile.size > 10 * 1024 * 1024) { // 10MB
                setError('File size exceeds 10MB limit');
                return;
            }
            setFile(uploadedFile);
            setError(null);
            handleUpload(uploadedFile);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png']
        },
        maxFiles: 1
    });

    const handleUpload = async (uploadedFile: File) => {
        setUploading(true);
        setProgress(0);
        setAiResult(null);
        setShowMap(false);

        // Simulated progress
        const interval = setInterval(() => {
            setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
        }, 500);

        try {
            const data = await analyzeReportFile(uploadedFile);
            clearInterval(interval);
            setProgress(100);
            setAiResult(data);
        } catch (err: any) {
            clearInterval(interval);
            setError("Failed to analyze report. Please try again.");
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const removeFile = () => {
        setFile(null);
        setProgress(0);
        setUploading(false);
        setAiResult(null);
        setShowMap(false);
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, pb: 8 }}>
            <Typography variant="h4" fontWeight="600" gutterBottom>
                Upload Medical Report
            </Typography>
            <Typography color="text.secondary" paragraph>
                Upload patient reports (PDF, JPG, PNG) for AI analysis. Secure and HIPAA compliant.
            </Typography>

            {!file ? (
                <Paper
                    {...getRootProps()}
                    sx={{
                        p: 6,
                        border: '2px dashed',
                        borderColor: isDragActive ? 'primary.main' : 'grey.300',
                        borderRadius: 4,
                        bgcolor: isDragActive ? 'action.hover' : 'background.paper',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'action.hover'
                        }
                    }}
                >
                    <input {...getInputProps()} />
                    <CloudUploadIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        {isDragActive ? 'Drop report here' : 'Drag & drop report here'}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                        or click to select file
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button variant="outlined" startIcon={<FileIcon />}>
                            Select File
                        </Button>
                    </Box>
                    <Typography variant="caption" display="block" sx={{ mt: 2, color: 'text.secondary' }}>
                        Max size: 10MB • Supported: PDF, JPG, PNG
                    </Typography>
                </Paper>
            ) : (
                <Fade in>
                    <Paper sx={{ p: 4, borderRadius: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Box
                                sx={{
                                    width: 50, height: 50, borderRadius: 2, bgcolor: 'primary.light',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2
                                }}
                            >
                                <FileIcon sx={{ color: 'white' }} />
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle1" fontWeight="600">
                                    {file.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </Typography>
                            </Box>
                            <IconButton onClick={removeFile} disabled={uploading}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        {uploading ? (
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="caption" fontWeight="600" color="primary">
                                        Analyzing with AI...
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {progress}%
                                    </Typography>
                                </Box>
                                <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
                            </Box>
                        ) : aiResult ? (
                            <Box>
                                <Alert severity="success" sx={{ borderRadius: 2, mb: 3 }} icon={<AiIcon />}>
                                    Analysis Complete!
                                </Alert>
                                <Card variant="outlined" sx={{ borderRadius: 3, bgcolor: 'background.default' }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <AiIcon color="secondary" /> Simple Explanation
                                        </Typography>
                                        <Typography variant="body1" paragraph>
                                            {aiResult.explanation}
                                        </Typography>
                                        <Divider sx={{ my: 2 }} />
                                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <DoctorIcon color="primary" /> Recommended Specialist
                                        </Typography>
                                        <Typography variant="h5" color="primary.main" fontWeight="bold">
                                            {aiResult.specialist}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            sx={{ mt: 2 }}
                                            fullWidth
                                            startIcon={<MapIcon />}
                                            onClick={() => setShowMap(true)}
                                        >
                                            Find Nearby {aiResult.specialist}s
                                        </Button>

                                        {showMap && (
                                            <Fade in>
                                                <Box sx={{ mt: 3 }}>
                                                    <ErrorBoundary>
                                                        <HospitalMap specialist={aiResult.specialist} />
                                                    </ErrorBoundary>
                                                </Box>
                                            </Fade>
                                        )}
                                    </CardContent>
                                </Card>
                            </Box>
                        ) : null}
                    </Paper>
                </Fade>
            )}

            {error && (
                <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}
        </Box>
    );
};

export default ReportUpload;
