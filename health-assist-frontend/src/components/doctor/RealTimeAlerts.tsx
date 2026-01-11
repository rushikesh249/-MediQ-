import React, { useState, useEffect } from 'react';
import {
    Paper, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar,
    IconButton, Fade, Box, Button, Chip
} from '@mui/material';
import {
    NotificationsActive as AlertIcon,
    Close as CloseIcon,
    Bloodtype as BloodIcon,
    MonitorHeart as HeartIcon
} from '@mui/icons-material';

interface Alert {
    id: string;
    type: 'critical' | 'warning' | 'info';
    message: string;
    patient: string;
    time: string;
    read: boolean;
}

const RealTimeAlerts: React.FC = () => {
    const [alerts, setAlerts] = useState<Alert[]>([
        { id: '1', type: 'critical', message: 'Critical Hb: 6.2g/dL', patient: '#234', time: '2m ago', read: false },
        { id: '2', type: 'warning', message: 'High Glucose: 300mg/dL', patient: '#892', time: '15m ago', read: false },
    ]);

    // Simulate WebSocket updates
    useEffect(() => {
        const interval = setInterval(() => {
            const newAlert: Alert = {
                id: Date.now().toString(),
                type: Math.random() > 0.7 ? 'critical' : 'warning',
                message: Math.random() > 0.5 ? 'New Lab Result Available' : 'Patient reported Check-in',
                patient: `#${Math.floor(Math.random() * 999)}`,
                time: 'Just now',
                read: false
            };

            // Add new alert and keep list to max 5
            setAlerts(prev => [newAlert, ...prev].slice(0, 5));
        }, 15000); // New alert every 15 seconds

        return () => clearInterval(interval);
    }, []);

    const markAsRead = (id: string) => {
        setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
    };

    return (
        <Paper sx={{ p: 2, height: '100%', maxHeight: 400, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="600" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AlertIcon color="error" /> Real-time Alerts
                </Typography>
                <Chip label="Live" color="success" size="small" variant="outlined" sx={{ height: 20, animation: 'pulse 2s infinite' }} />
            </Box>

            <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                {alerts.map((alert) => (
                    <Fade key={alert.id} in={true}>
                        <ListItem
                            alignItems="flex-start"
                            secondaryAction={
                                !alert.read && (
                                    <IconButton edge="end" size="small" onClick={() => markAsRead(alert.id)}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                )
                            }
                            sx={{
                                bgcolor: alert.read ? 'transparent' : 'action.hover',
                                borderRadius: 2,
                                mb: 1,
                                borderLeft: `4px solid`,
                                borderColor: alert.type === 'critical' ? 'error.main' : 'warning.main'
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: alert.type === 'critical' ? 'error.light' : 'warning.light' }}>
                                    {alert.type === 'critical' ? <HeartIcon sx={{ color: 'error.main' }} /> : <BloodIcon sx={{ color: 'warning.main' }} />}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle2" fontWeight={alert.read ? 400 : 700}>
                                        {alert.message}
                                    </Typography>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography component="span" variant="caption" color="text.primary">
                                            Patient {alert.patient}
                                        </Typography>
                                        {" — " + alert.time}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </Fade>
                ))}
            </List>
            <Button size="small" sx={{ mt: 1 }}>View All History</Button>
        </Paper>
    );
};

export default RealTimeAlerts;
