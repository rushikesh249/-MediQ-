import React from 'react';
import {
    Paper, Typography, Box, Card, CardContent, Chip, Grid, Divider
} from '@mui/material';
import UrgencyBadge from '../common/UrgencyBadge';

interface KanbanCardProps {
    id: string;
    patientId: string;
    age: number;
    testType: string;
    urgency: 'critical' | 'high' | 'medium' | 'low';
    time: string;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ patientId, age, testType, urgency, time }) => (
    <Card sx={{ mb: 2, cursor: 'grab', '&:hover': { boxShadow: 3 } }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold">Patient {patientId}</Typography>
                <Typography variant="caption" color="text.secondary">{time}</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                {testType} • {age}y
            </Typography>
            <Box sx={{ mt: 1 }}>
                <UrgencyBadge level={urgency} size="small" />
            </Box>
        </CardContent>
    </Card>
);

const KanbanColumn: React.FC<{ title: string; count: number; items: any[], color?: string }> = ({
    title, count, items, color = 'primary.main'
}) => (
    <Paper sx={{ p: 2, bgcolor: 'background.default', height: '100%', minHeight: 400 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="600">{title}</Typography>
            <Chip label={count} size="small" sx={{ bgcolor: color, color: 'white', fontWeight: 'bold' }} />
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ minHeight: 100 }}>
            {items.map(item => (
                <KanbanCard key={item.id} {...item} />
            ))}
        </Box>
    </Paper>
);

const KanbanBoard: React.FC = () => {
    // Mock Data
    const pendingItems = [
        { id: '1', patientId: '#842', age: 45, testType: 'CBC Panel', urgency: 'high', time: '10m' },
        { id: '2', patientId: '#331', age: 28, testType: 'Vitamin D', urgency: 'low', time: '25m' },
        { id: '3', patientId: '#129', age: 62, testType: 'Thyroid', urgency: 'medium', time: '1h' },
    ] as const;

    const reviewingItems = [
        { id: '4', patientId: '#552', age: 34, testType: 'Diabetes', urgency: 'critical', time: '5m' },
    ] as const;

    const actionItems = [
        { id: '5', patientId: '#991', age: 70, testType: 'Cardiac', urgency: 'medium', time: '2h' },
    ] as const;

    return (
        <Grid container spacing={2} sx={{ height: '100%' }}>
            <Grid xs={12} md={4}>
                <KanbanColumn
                    title="Pending"
                    count={35}
                    items={pendingItems as any}
                    color="#3B82F6"
                />
            </Grid>
            <Grid xs={12} md={4}>
                <KanbanColumn
                    title="Reviewing"
                    count={12}
                    items={reviewingItems as any}
                    color="#F59E0B"
                />
            </Grid>
            <Grid xs={12} md={4}>
                <KanbanColumn
                    title="Action Needed"
                    count={8}
                    items={actionItems as any}
                    color="#EF4444"
                />
            </Grid>
        </Grid>
    );
};

export default KanbanBoard;
