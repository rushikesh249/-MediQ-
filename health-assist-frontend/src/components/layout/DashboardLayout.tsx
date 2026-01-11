import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout: React.FC = () => {
    const [open, setOpen] = useState(true);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Header open={open} />
            <Sidebar open={open} onToggle={handleDrawerToggle} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${open ? 260 : 65}px)` },
                    transition: 'width 0.3s',
                    marginTop: '64px', // Height of header
                    backgroundColor: 'background.default',
                    minHeight: '100vh',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default DashboardLayout;
