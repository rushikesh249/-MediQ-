import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Divider, Box, IconButton, useTheme, Typography, Tooltip, Badge
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Assignment as ReportIcon,
    Warning as CriticalIcon,
    People as PatientIcon,
    BarChart as AnalyticsIcon,
    Settings as SettingsIcon,
    Help as HelpIcon,
    ChevronLeft as ChevronLeftIcon,
    Menu as MenuIcon
} from '@mui/icons-material';

const drawerWidth = 260;

interface SidebarProps {
    open: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/doctor/dashboard' },
        { text: 'Report Queue', icon: <ReportIcon />, path: '/doctor/reports', count: 35 },
        { text: 'Critical Cases', icon: <CriticalIcon color="error" />, path: '/doctor/critical', count: 3 },
        { text: 'Patient History', icon: <PatientIcon />, path: '/doctor/patients' },
        { text: 'Analytics', icon: <AnalyticsIcon />, path: '/doctor/analytics' },
    ];

    const bottomItems = [
        { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
        { text: 'Help & Support', icon: <HelpIcon />, path: '/help' },
    ];

    return (
        <Drawer
            variant="permanent"
            open={open}
            sx={{
                width: open ? drawerWidth : 65,
                flexShrink: 0,
                whiteSpace: 'nowrap',
                boxSizing: 'border-box',
                '& .MuiDrawer-paper': {
                    width: open ? drawerWidth : 65,
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    overflowX: 'hidden',
                    backgroundColor: theme.palette.background.paper,
                    borderRight: `1px solid ${theme.palette.divider}`,
                },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, height: 64 }}>
                {open && (
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                        HealthAssist
                    </Typography>
                )}
                <IconButton onClick={onToggle}>
                    {open ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>
            </Box>
            <Divider />

            <List sx={{ flexGrow: 1 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                        <Tooltip title={!open ? item.text : ''} placement="right">
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    backgroundColor: location.pathname === item.path ? theme.palette.action.selected : 'transparent',
                                    borderLeft: location.pathname === item.path ? `4px solid ${theme.palette.primary.main}` : '4px solid transparent',
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.hover,
                                    },
                                }}
                                onClick={() => navigate(item.path)}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 2 : 'auto',
                                        justifyContent: 'center',
                                        color: location.pathname === item.path ? theme.palette.primary.main : theme.palette.text.secondary,
                                    }}
                                >
                                    <Badge badgeContent={item.count} color="error" invisible={!item.count || !open}>
                                        {item.icon}
                                    </Badge>
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                                {open && item.count && (
                                    <Box
                                        sx={{
                                            bgcolor: item.path.includes('critical') ? 'error.main' : 'primary.main',
                                            color: 'white',
                                            borderRadius: '12px',
                                            px: 1,
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {item.count}
                                    </Box>
                                )}
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>

            <Divider />

            <List>
                {bottomItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                        <Tooltip title={!open ? item.text : ''} placement="right">
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={() => navigate(item.path)}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 2 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
