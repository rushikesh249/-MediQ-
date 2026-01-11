import React from 'react';
import { Typography, Grid, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RealTimeAlerts from '../components/doctor/RealTimeAlerts';
import KanbanBoard from '../components/doctor/KanbanBoard';

const DoctorDashboard: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" fontWeight="600">Dashboard Overview</Typography>
                <Button variant="contained" onClick={() => navigate('/doctor/upload')}>
                    Upload New Report
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* Statistics Cards */}
                <Grid xs={12} md={3}>
                    <Paper sx={{ p: 3, height: '100%', borderRadius: 3 }}>
                        <Typography color="textSecondary" variant="subtitle2">Total Reports</Typography>
                        <Typography variant="h3" fontWeight="bold">145</Typography>
                        <Typography variant="body2" color="success.main">+12% from yesterday</Typography>
                    </Paper>
                </Grid>
                <Grid xs={12} md={3}>
                    <Paper sx={{ p: 3, height: '100%', borderRadius: 3, bgcolor: '#FEF2F2' }}>
                        <Typography color="error" variant="subtitle2" fontWeight="bold">Critical Cases</Typography>
                        <Typography variant="h3" color="error" fontWeight="bold">3</Typography>
                        <Typography variant="body2" color="error">Requires immediate attention</Typography>
                    </Paper>
                </Grid>
                <Grid xs={12} md={3}>
                    <Paper sx={{ p: 3, height: '100%', borderRadius: 3 }}>
                        <Typography color="textSecondary" variant="subtitle2">Avg Process Time</Typography>
                        <Typography variant="h3" fontWeight="bold">2.4m</Typography>
                        <Typography variant="body2" color="success.main">Faster than goal (2.5m)</Typography>
                    </Paper>
                </Grid>
                <Grid xs={12} md={3}>
                    <Paper sx={{ p: 3, height: '100%', borderRadius: 3 }}>
                        <Typography color="textSecondary" variant="subtitle2">Patient Satisfaction</Typography>
                        <Typography variant="h3" fontWeight="bold">92%</Typography>
                        <Typography variant="body2" color="text.secondary">Based on 45 reviews</Typography>
                    </Paper>
                </Grid>

                {/* Middle Section: Kanban Queue and Alerts */}
                <Grid xs={12} lg={8}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Urgency Queue</Typography>
                    <KanbanBoard />
                </Grid>
                <Grid xs={12} lg={4}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Live Activity</Typography>
                    <RealTimeAlerts />
                </Grid>
            </Grid>
        </Box>
    );
};

export default DoctorDashboard;
