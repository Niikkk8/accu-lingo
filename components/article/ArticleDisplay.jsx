'use client';

import React from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    ThemeProvider,
    createTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
            marginBottom: '1rem',
        },
        h2: {
            fontSize: '1.75rem',
            fontWeight: 500,
            marginBottom: '0.75rem',
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 500,
            marginBottom: '0.5rem',
        },
    },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
}));

const ChipContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
}));

const ArticleDisplay = ({ article }) => {
    const {
        basicInfo,
        productServiceDetails,
        mediaInsights,
        articleDetails,
        articleGeneration,
    } = article;

    return (
        <div className="pt-20">

            <ThemeProvider theme={theme}>
                <Container maxWidth="lg">
                    <StyledPaper elevation={3}>
                        {/* Header Section */}
                        <Typography variant="h1" gutterBottom>
                            {basicInfo.brandName}
                        </Typography>
                        {basicInfo.tagline && (
                            <Typography variant="h2" color="textSecondary" gutterBottom>
                                {basicInfo.tagline}
                            </Typography>
                        )}

                        <Box my={3}>
                            <ChipContainer>
                                <Chip label={basicInfo.industryType} color="primary" />
                                <Chip label={basicInfo.productOrServiceType} color="primary" variant="outlined" />
                                <Chip label={basicInfo.targetAudience} color="primary" variant="outlined" />
                            </ChipContainer>
                        </Box>

                        <Divider />

                        {/* Product/Service Details */}
                        <Box my={4}>
                            <Typography variant="h2">Product Features & USPs</Typography>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h3">Key Features</Typography>
                                    <List>
                                        {productServiceDetails.features.map((feature, index) => (
                                            <ListItem key={index}>
                                                <ListItemText primary={feature} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h3">Unique Selling Points</Typography>
                                    <List>
                                        {productServiceDetails.USPs.map((usp, index) => (
                                            <ListItem key={index}>
                                                <ListItemText primary={usp} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </Grid>

                            <Box mt={3}>
                                <Typography variant="h3">Primary Problem Solved</Typography>
                                <Typography variant="body1">
                                    {productServiceDetails.primaryProblemSolved}
                                </Typography>
                            </Box>
                        </Box>

                        <Divider />

                        {/* Market Insights */}
                        <Box my={4}>
                            <Typography variant="h2">Market Analysis</Typography>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h3">Target Demographics</Typography>
                                    <Typography variant="body1">
                                        {mediaInsights.primaryAudienceDemographics}
                                    </Typography>

                                    <Box mt={3}>
                                        <Typography variant="h3">Pain Points Addressed</Typography>
                                        <List>
                                            {mediaInsights.painPointsAddressed.map((point, index) => (
                                                <ListItem key={index}>
                                                    <ListItemText primary={point} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Typography variant="h3">Market Position</Typography>
                                    <Typography variant="body1">
                                        {mediaInsights.marketPosition}
                                    </Typography>

                                    <Box mt={3}>
                                        <Typography variant="h3">Competitors</Typography>
                                        <List>
                                            {mediaInsights.competitors.map((competitor, index) => (
                                                <ListItem key={index}>
                                                    <ListItemText primary={competitor} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider />

                        {/* Generated Article */}
                        <Box my={4}>
                            <Typography variant="h2">Generated Content</Typography>
                            <Box mt={2}>
                                <Typography variant="h3">Keywords</Typography>
                                <ChipContainer>
                                    {articleDetails.keywordsToEmphasize.map((keyword, index) => (
                                        <Chip key={index} label={keyword} variant="outlined" />
                                    ))}
                                </ChipContainer>
                            </Box>

                            <Box mt={4}>
                                <Typography variant="h3">Article</Typography>
                                <Paper elevation={1} sx={{ p: 3, bgcolor: 'grey.50' }}>
                                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                        {articleGeneration.englishArticle}
                                    </Typography>
                                </Paper>
                            </Box>

                            {articleDetails.callToAction && (
                                <Box mt={3}>
                                    <Typography variant="h3">Call to Action</Typography>
                                    <Typography variant="body1" color="primary">
                                        {articleDetails.callToAction}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </StyledPaper>
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default ArticleDisplay;