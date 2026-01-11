import React, { useState, useEffect } from 'react';
import {
    Dialog, Button, Typography, Box
} from '@mui/material';
import { Warning as WarningIcon, Phone as PhoneIcon, Navigation as MapIcon } from '@mui/icons-material';

interface EmergencyAlertProps {
    open: boolean;
    onClose: () => void;
    value: string;
    parameter: string;
}

const EmergencyAlert: React.FC<EmergencyAlertProps> = ({ open, onClose, value, parameter }) => {
    const [countdown, setCountdown] = useState(30);

    useEffect(() => {
        let timer: any;
        if (open && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [open, countdown]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen
            PaperProps={{
                style: {
                    backgroundColor: '#ffebee', // Light red background
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
            }}
        >
            <Box sx={{ maxWidth: 600, width: '100%', p: 3, textAlign: 'center' }}>
                <Box sx={{ animation: 'pulse 1s infinite' }}>
                    <WarningIcon color="error" sx={{ fontSize: 120, mb: 2 }} />
                </Box>

                <Typography variant="h3" color="error" fontWeight="bold" gutterBottom>
                    CRITICAL ALERT
                </Typography>

                <Typography variant="h5" gutterBottom>
                    Abnormal {parameter} Detected: {value}
                </Typography>

                <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                    This value indicates a potential medical emergency. Please seek immediate medical attention.
                </Typography>

                <Box sx={{ my: 4, p: 3, bgcolor: 'white', borderRadius: 4, boxShadow: 3 }}>
                    <Typography variant="h6" fontWeight="bold">Nearest Hospital: City General (1.2km)</Typography>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button variant="contained" color="error" size="large" startIcon={<PhoneIcon />} fullWidth>
                            Call Ambulance (108)
                        </Button>
                        <Button variant="contained" color="primary" size="large" startIcon={<MapIcon />} fullWidth>
                            Navigate to Hospital
                        </Button>
                    </Box>
                </Box>

                <Button onClick={onClose} color="inherit" size="small">
                    I understand, dimiss alert
                </Button>

            </Box>
        </Dialog>
    );
};

export default EmergencyAlert;
