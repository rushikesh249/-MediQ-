import React, { useState } from 'react';
import {
    Box, Typography, Button, Container, Card, CardContent, Grid, Stack, Avatar, useTheme
} from '@mui/material';
import {
    CloudUpload as CloudIcon,
    WhatsApp as WhatsAppIcon,
    Email as EmailIcon
} from '@mui/icons-material';
import WhatsAppBot from '../components/simulation/WhatsAppBot';
import FamilyDashboard from '../components/simulation/FamilyDashboard';
import EmergencyAlert from '../components/patient/EmergencyAlert';
import { useNavigate } from 'react-router-dom';

const PatientPortal: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [chatOpen, setChatOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    return (
        <Box sx={{ pb: 8 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    pt: 8,
                    pb: 10,
                    px: 2,
                    textAlign: 'center',
                    borderBottomLeftRadius: 32,
                    borderBottomRightRadius: 32
                }}
            >
                <Container maxWidth="sm">
                    <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                        <Button
                            variant="text"
                            sx={{ color: 'rgba(255,255,255,0.8)' }}
                            onClick={() => navigate('/doctor/dashboard')}
                        >
                            Doctor View
                        </Button>
                    </Box>
                    <Typography variant="h3" fontWeight="800" gutterBottom>
                        HealthAssist AI
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                        Understand Your Health Report in 2 Minutes
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        startIcon={<CloudIcon />}
                        onClick={() => navigate('/upload')} // Assuming generic upload or patient specific
                        sx={{
                            borderRadius: 8,
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                        }}
                    >
                        Upload Report Now
                    </Button>
                </Container>
            </Box>

            {/* Upload Methods */}
            <Container maxWidth="md" sx={{ mt: -6 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={4}>
                        <Card sx={{ textAlign: 'center', p: 2, height: '100%', borderRadius: 4 }}>
                            <CardContent>
                                <Avatar sx={{ bgcolor: '#25D366', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                                    <WhatsAppIcon fontSize="large" />
                                </Avatar>
                                <Typography variant="h6" gutterBottom>WhatsApp</Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    Send your report to +91 98765 43210
                                </Typography>
                                <Button variant="outlined" color="success" fullWidth>Chat Now</Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid xs={12} md={4}>
                        <Card sx={{ textAlign: 'center', p: 2, height: '100%', borderRadius: 4 }}>
                            <CardContent>
                                <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 56, height: 56, mx: 'auto', mb: 2 }}>
                                    <CloudIcon fontSize="large" />
                                </Avatar>
                                <Typography variant="h6" gutterBottom>Web Upload</Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    Drag & Drop PDF or Photos here
                                </Typography>
                                <Button variant="outlined" color="primary" fullWidth onClick={() => navigate('/upload')}>
                                    Upload
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid xs={12} md={4}>
                        <Card sx={{ textAlign: 'center', p: 2, height: '100%', borderRadius: 4 }}>
                            <CardContent>
                                <Avatar sx={{ bgcolor: theme.palette.warning.main, width: 56, height: 56, mx: 'auto', mb: 2 }}>
                                    <EmailIcon fontSize="large" />
                                </Avatar>
                                <Typography variant="h6" gutterBottom>Email</Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    Forward to reports@healthassist.ai
                                </Typography>
                                <Button variant="outlined" color="warning" fullWidth>Copy Email</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            {/* How it works */}
            <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    How it works
                </Typography>
                <Stack spacing={4} sx={{ mt: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, textAlign: 'left' }}>
                        <Typography variant="h2" color="grey.300" fontWeight="bold">1</Typography>
                        <Box>
                            <Typography variant="h6" fontWeight="bold">Upload Report</Typography>
                            <Typography color="text.secondary">Take a photo or upload PDF of your lab report.</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, textAlign: 'left' }}>
                        <Typography variant="h2" color="grey.300" fontWeight="bold">2</Typography>
                        <Box>
                            <Typography variant="h6" fontWeight="bold">AI Analysis</Typography>
                            <Typography color="text.secondary">Our advanced AI scans and analyzes values instantly.</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, textAlign: 'left' }}>
                        <Typography variant="h2" color="grey.300" fontWeight="bold">3</Typography>
                        <Box>
                            <Typography variant="h6" fontWeight="bold">Simple Explanation</Typography>
                            <Typography color="text.secondary">Get results in simple language with next steps.</Typography>
                        </Box>
                    </Box>
                </Stack>
            </Container>

            {/* Family Section */}
            <Container maxWidth="md" sx={{ mt: 8 }}>
                <FamilyDashboard />
            </Container>

            {/* Demo Triggers (Hidden in production or distinct) */}
            <Box sx={{ mt: 8, textAlign: 'center', opacity: 0.5 }}>
                <Typography variant="caption">DEMO CONTROLS</Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 1 }}>
                    <Button size="small" onClick={() => setChatOpen(true)}>Test WhatsApp Bot</Button>
                    <Button size="small" color="error" onClick={() => setAlertOpen(true)}>Test Emergency Alert</Button>
                </Box>
            </Box>

            {/* Simulations */}
            <WhatsAppBot open={chatOpen} onClose={() => setChatOpen(false)} />
            <EmergencyAlert
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                value="6.2 g/dL"
                parameter="Hemoglobin"
            />
        </Box>
    );
};

export default PatientPortal;
