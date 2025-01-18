'use client';

import { Box, CircularProgress, Container, Typography } from '@mui/material';

export default function Loading() {
    return (
        <div className="min-h-screen">
            <Container maxWidth="lg">
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="50vh"
                >
                    <CircularProgress size={60} />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Loading article...
                    </Typography>
                </Box>
            </Container>
        </div>
    );
}