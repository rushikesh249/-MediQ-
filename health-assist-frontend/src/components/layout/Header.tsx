import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Badge, Chip, useTheme, Button } from '@mui/material';
import { Notifications as NotificationsIcon, Search as SearchIcon } from '@mui/icons-material';

interface HeaderProps {
    open: boolean;
}

const Header: React.FC<HeaderProps> = ({ open }) => {
    const theme = useTheme();
    const drawerWidth = 260;

    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${open ? drawerWidth : 65}px)`,
                ml: `${open ? drawerWidth : 65}px`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                boxShadow: 'none',
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
                    Doctor Portal
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                        color="inherit"
                        variant="outlined"
                        size="small"
                        onClick={() => window.location.href = '/patient'}
                        sx={{ mr: 2, display: { xs: 'none', sm: 'flex' } }}
                    >
                        Patient View
                    </Button>

                    {/* Quick Stats Chips */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                        <Chip label="Today: 145" size="small" color="primary" variant="outlined" />
                        <Chip label="Critical: 3" size="small" color="error" />
                    </Box>

                    <IconButton>
                        <SearchIcon />
                    </IconButton>

                    <IconButton>
                        <Badge badgeContent={4} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1, cursor: 'pointer' }}>
                        <Avatar
                            alt="Dr. Smith"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}
                        >
                            DS
                        </Avatar>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>Dr. Smith</Typography>
                            <Typography variant="caption" color="text.secondary">Cardiologist</Typography>
                        </Box>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
