'use client'

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import ArticleForm from '@/components/translate/ArticleForm';

export default function ArticleFormPage() {
    return (
        <div className='pt-20'>
            <Box sx={{ py: 4 }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                        Article Generation & Media Insights
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ mb: 6 }}>
                        Fill out the form below to generate your article and get media insights
                    </Typography>
                    <ArticleForm />
                </Container>
            </Box>
        </div>
    );
}