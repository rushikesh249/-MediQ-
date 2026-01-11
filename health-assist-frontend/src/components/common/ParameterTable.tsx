import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    IconButton, Collapse, Box, Typography, Chip
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

interface Parameter {
    name: string;
    value: string | number;
    unit: string;
    range: string;
    status: 'low' | 'normal' | 'high' | 'critical';
    explanation?: string;
}

interface ParameterTableProps {
    parameters: Parameter[];
}

const Row: React.FC<{ row: Parameter }> = ({ row }) => {
    const [open, setOpen] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'critical': return 'error';
            case 'high': return 'error'; // or orange
            case 'low': return 'info';
            default: return 'success';
        }
    };

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                    {row.name}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>{row.value} {row.unit}</TableCell>
                <TableCell align="right" sx={{ color: 'text.secondary' }}>{row.range}</TableCell>
                <TableCell align="right">
                    <Chip
                        label={row.status.toUpperCase()}
                        size="small"
                        color={getStatusColor(row.status) as any}
                        variant={row.status === 'normal' ? 'outlined' : 'filled'}
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                Understanding this result:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {row.explanation || "No additional details available."}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

const ParameterTable: React.FC<ParameterTableProps> = ({ parameters }) => {
    return (
        <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Test Parameter</TableCell>
                        <TableCell align="right">Value</TableCell>
                        <TableCell align="right">Normal Range</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {parameters.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ParameterTable;
