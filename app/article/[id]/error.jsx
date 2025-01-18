'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Error({ error }) {
    const router = useRouter();

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
                    <Typography variant="h4" gutterBottom>
                        Something went wrong!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        {error?.message || 'Failed to load article'}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => router.back()}
                        sx={{ mt: 2 }}
                    >
                        Go Back
                    </Button>
                </Box>
            </Container>
        </div>
    );
}