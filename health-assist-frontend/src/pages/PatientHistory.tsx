import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Chip, IconButton, CircularProgress, Alert, Avatar
} from '@mui/material';
import { Visibility, History, Person } from '@mui/icons-material';
import { fetchAllPatients } from '../services/authService';

interface Patient {
    _id: string;
    name: string;
    email: string;
    role: string;
}

const PatientHistory: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPatients = async () => {
            try {
                const data = await fetchAllPatients();
                setPatients(data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch patient records.");
            } finally {
                setLoading(false);
            }
        };

        loadPatients();
    }, []);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="600" gutterBottom>
                Patient Registry
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
                Live viewing of all registered patients in the system.
            </Typography>

            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'grey.100' }}>
                        <TableRow>
                            <TableCell>Patient Name</TableCell>
                            <TableCell>Contact / Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                                    <Typography color="text.secondary">No patients found registered in the system.</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            patients.map((patient) => (
                                <TableRow key={patient._id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: 'primary.main' }}>{patient.name.charAt(0).toUpperCase()}</Avatar>
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight="600">{patient.name}</Typography>
                                                <Typography variant="caption" color="text.secondary">ID: {patient._id.slice(-6)}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{patient.email}</TableCell>
                                    <TableCell>
                                        <Chip label="Active" color="success" size="small" variant="outlined" />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton size="small" color="primary" title="View Profile">
                                            <Visibility />
                                        </IconButton>
                                        <IconButton size="small" color="default" title="View History">
                                            <History />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default PatientHistory;
