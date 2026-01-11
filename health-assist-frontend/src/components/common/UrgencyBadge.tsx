import React from 'react';
import { Chip } from '@mui/material';
import {
    Warning as WarningIcon,
    Error as ErrorIcon,
    Info as InfoIcon,
    CheckCircle as CheckIcon
} from '@mui/icons-material';

type UrgencyLevel = 'critical' | 'high' | 'medium' | 'low';

interface UrgencyBadgeProps {
    level: UrgencyLevel;
    showIcon?: boolean;
    size?: 'small' | 'medium';
}

const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ level, showIcon = true, size = 'medium' }) => {
    const config = {
        critical: { label: 'CRITICAL', color: 'error', icon: <ErrorIcon /> },
        high: { label: 'HIGH', color: 'warning', icon: <WarningIcon /> },
        medium: { label: 'MEDIUM', color: 'warning', icon: <InfoIcon /> }, // Using warning color (orange/yellow)
        low: { label: 'LOW', color: 'success', icon: <CheckIcon /> },
    };

    const { label, color, icon } = config[level];

    // Map 'warning' color for 'medium' visually if needed, but MUI 'warning' is standard orange.
    // For 'low', we use 'success' (green).

    return (
        <Chip
            label={label}
            color={color as any}
            icon={showIcon ? icon : undefined}
            size={size}
            sx={{ fontWeight: 'bold' }}
        />
    );
};

export default UrgencyBadge;
