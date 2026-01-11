import React, { useState } from 'react';
import {
    Box, Typography, Container, Tabs, Tab, Paper, Grid, Button, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    Share as ShareIcon,
    Download as DownloadIcon,
    LocalHospital as HospitalIcon
} from '@mui/icons-material';
import UrgencyBadge from '../components/common/UrgencyBadge';
import HealthMeter from '../components/common/HealthMeter';
import ParameterTable from '../components/common/ParameterTable';

const ReportView: React.FC = () => {
    const [tab, setTab] = useState(0);

    // Mock Data
    const reportData = {
        patientName: "Pranav",
        date: "10 Jan 2026",
        healthScore: 78,
        urgency: "medium",
        summary: "Your hemoglobin is slightly low (Anemia). Other parameters are within normal range.",
        parameters: [
            { name: 'Hemoglobin', value: 10.2, unit: 'g/dL', range: '12-16', status: 'low', explanation: 'Low hemoglobin indicates anemia. It causes fatigue and weakness.' },
            { name: 'RBC Count', value: 4.5, unit: 'mill/uL', range: '4.5-5.5', status: 'normal' },
            { name: 'WBC Count', value: 7500, unit: '/uL', range: '4000-11000', status: 'normal' },
            { name: 'Platelets', value: 250000, unit: '/uL', range: '150000-450000', status: 'normal' },
            { name: 'Vitamin B12', value: 180, unit: 'pg/mL', range: '200-900', status: 'low', explanation: 'Borderline deficiency may contribute to fatigue.' }
        ]
    };

    const actions = [
        { text: "Consult General Physician this week", type: 'urgent' },
        { text: "Increase intake of iron-rich foods (spinach, dates)", type: 'diet' },
        { text: "Repeat CBC test after 30 days", type: 'followup' }
    ];

    return (
        <Container maxWidth="md" sx={{ mt: 4, pb: 8 }}>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">CBC Report Analysis</Typography>
                <Typography color="text.secondary">Uploaded on {reportData.date}</Typography>
            </Box>

            {/* Urgency Banner */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 4,
                    bgcolor: 'warning.light',
                    color: 'warning.dark',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 2
                }}
            >
                <Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <UrgencyBadge level={reportData.urgency as any} />
                        Action Recommended
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        {reportData.summary}
                    </Typography>
                </Box>
                <Button variant="contained" color="warning" startIcon={<HospitalIcon />}>
                    Find Doctors
                </Button>
            </Paper>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth">
                    <Tab label="Summary" />
                    <Tab label="Detailed Results" />
                    <Tab label="Action Plan" />
                </Tabs>
            </Box>

            {/* Tab Panels */}
            {tab === 0 && (
                <Box className="fade-in">
                    <Grid container spacing={3}>
                        <Grid xs={12} md={6}>
                            <Paper sx={{ p: 3, textAlign: 'center', height: '100%', borderRadius: 4 }}>
                                <HealthMeter score={reportData.healthScore} label="Overall Health Score" />
                            </Paper>
                        </Grid>
                        <Grid xs={12} md={6}>
                            <Paper sx={{ p: 3, height: '100%', borderRadius: 4 }}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">Key Findings</Typography>
                                <ul style={{ paddingLeft: 20 }}>
                                    <li><Typography color="error">Hemoglobin is Low (10.2)</Typography></li>
                                    <li><Typography color="warning.main">Vitamin B12 is Borderline</Typography></li>
                                    <li><Typography color="success.main">White Blood Cells are Normal</Typography></li>
                                    <li><Typography color="success.main">Platelets are Normal</Typography></li>
                                </ul>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            )}

            {tab === 1 && (
                <Box className="fade-in">
                    <ParameterTable parameters={reportData.parameters as any} />
                </Box>
            )}

            {tab === 2 && (
                <Box className="fade-in">
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Recommended Next Steps:</Typography>
                    {actions.map((action, idx) => (
                        <Accordion key={idx} defaultExpanded={idx === 0} sx={{ mb: 1, boxShadow: 'none', border: '1px solid #eee', '&:before': { display: 'none' } }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography fontWeight="500">{idx + 1}. {action.text}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2" color="text.secondary">
                                    Based on your low hemoglobin levels, this is recommended to improve your blood count.
                                </Typography>
                                <Button size="small" sx={{ mt: 1 }}>Add to Calendar</Button>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            )}

            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button variant="outlined" startIcon={<DownloadIcon />}>Download PDF</Button>
                <Button variant="outlined" startIcon={<ShareIcon />}>Share Report</Button>
            </Box>

        </Container>
    );
};

export default ReportView;
