import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Avatar, IconButton } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import HealthMeter from '../common/HealthMeter';

const FamilyDashboard: React.FC = () => {
    const members = [
        { name: 'Me', relation: 'Self', score: 78, avatar: 'M' },
        { name: 'Dad', relation: 'Father', score: 65, avatar: 'D' },
        { name: 'Mom', relation: 'Mother', score: 82, avatar: 'M' },
    ];

    return (
        <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>My Family</Typography>
            <Grid container spacing={2}>
                {members.map((member, idx) => (
                    <Grid xs={6} md={3} key={idx}>
                        <Card sx={{ borderRadius: 3, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' }, cursor: 'pointer' }}>
                            <CardContent sx={{ textAlign: 'center', p: 2 }}>
                                <Avatar sx={{ mx: 'auto', mb: 1, bgcolor: idx % 2 ? 'secondary.main' : 'primary.main' }}>
                                    {member.avatar}
                                </Avatar>
                                <Typography variant="subtitle1" fontWeight="bold">{member.name}</Typography>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>{member.relation}</Typography>
                                <HealthMeter score={member.score} label="" />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

                {/* Add Member Card */}
                <Grid xs={6} md={3}>
                    <Card sx={{ borderRadius: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ccc', boxShadow: 'none' }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <IconButton color="primary" size="large">
                                <AddIcon fontSize="large" />
                            </IconButton>
                            <Typography variant="body2" color="primary">Add Member</Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FamilyDashboard;
