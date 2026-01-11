import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;
            return (
                <Box sx={{ p: 3, border: '1px solid red', borderRadius: 2, bgcolor: '#fff0f0' }}>
                    <Typography variant="h6" color="error">Something went wrong.</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {this.state.error?.message}
                    </Typography>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
