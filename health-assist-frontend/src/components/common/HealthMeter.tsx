import React from 'react';
import { Box, Typography, LinearProgress, useTheme } from '@mui/material';

interface HealthMeterProps {
    score: number; // 0-100
    label?: string;
    showMarker?: boolean;
}

const HealthMeter: React.FC<HealthMeterProps> = ({ score, label = "Health Score" }) => {
    const theme = useTheme();

    // Determine color based on score
    const getColor = (s: number) => {
        if (s < 40) return theme.palette.error.main;
        if (s < 70) return theme.palette.warning.main;
        return theme.palette.success.main;
    };

    const color = getColor(score);

    return (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {label}
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex', width: '100%', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress
                        variant="determinate"
                        value={score}
                        sx={{
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: theme.palette.grey[200],
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: color
                            }
                        }}
                    />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary" fontWeight="bold">
                        {score}/100
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default HealthMeter;
