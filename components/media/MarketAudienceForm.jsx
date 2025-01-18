'use client'

import React, { useState } from 'react';
import {
    Stepper,
    Step,
    StepLabel,
    TextField,
    Button,
    MenuItem,
    Box,
    Paper,
    Typography,
    Container,
    Chip,
    Stack,
    ThemeProvider,
    createTheme,
    Alert,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Create theme instance
const theme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                fullWidth: true,
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
    },
});

// Styled components
const FormPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    borderRadius: theme.shape.borderRadius * 2,
}));

const StepContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(4),
}));

const ChipContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
}));

const initialFormData = {
    basicInfo: {
        brandName: '',
        industryType: '',
        productOrServiceType: '',
        targetAudience: '',
    },
    productServiceDetails: {
        features: [],
        USPs: [],
        primaryProblemSolved: '',
    },
};

const MarketAudienceForm = () => {
    // State management
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState(initialFormData);
    const [tempFeature, setTempFeature] = useState('');
    const [tempUSP, setTempUSP] = useState('');
    const [apiResponse, setApiResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({
        basicInfo: {
            brandName: false,
            industryType: false,
            productOrServiceType: false,
            targetAudience: false,
        },
        productServiceDetails: {
            primaryProblemSolved: false,
            features: false,
            USPs: false,
        },
    });
    const [showSuccess, setShowSuccess] = useState(false);

    // Form options
    const industryTypes = [
        'Technology',
        'Healthcare',
        'Finance',
        'Retail',
        'Education',
        'Entertainment',
        'Other',
    ];

    const productTypes = [
        'SaaS',
        'PaaS',
        'IaaS',
        'Consumer Goods',
        'B2B Services',
        'B2C Services',
        'Other',
    ];

    const audienceTypes = [
        'Small Businesses',
        'Enterprise Companies',
        'Freelancers',
        'Students',
        'Tech-Savvy Professionals',
        'General Consumers',
        'Other',
    ];

    // Event handlers
    const handleInputChange = (section, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
        setErrors((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: false,
            },
        }));
    };

    const handleAddFeature = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (tempFeature.trim()) {
                setFormData((prev) => ({
                    ...prev,
                    productServiceDetails: {
                        ...prev.productServiceDetails,
                        features: [...prev.productServiceDetails.features, tempFeature.trim()],
                    },
                }));
                setTempFeature('');
                setErrors((prev) => ({
                    ...prev,
                    productServiceDetails: {
                        ...prev.productServiceDetails,
                        features: false,
                    },
                }));
            }
        }
    };

    const handleAddUSP = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (tempUSP.trim()) {
                setFormData((prev) => ({
                    ...prev,
                    productServiceDetails: {
                        ...prev.productServiceDetails,
                        USPs: [...prev.productServiceDetails.USPs, tempUSP.trim()],
                    },
                }));
                setTempUSP('');
                setErrors((prev) => ({
                    ...prev,
                    productServiceDetails: {
                        ...prev.productServiceDetails,
                        USPs: false,
                    },
                }));
            }
        }
    };

    const handleRemoveFeature = (indexToRemove) => {
        setFormData((prev) => ({
            ...prev,
            productServiceDetails: {
                ...prev.productServiceDetails,
                features: prev.productServiceDetails.features.filter((_, index) => index !== indexToRemove),
            },
        }));
    };

    const handleRemoveUSP = (indexToRemove) => {
        setFormData((prev) => ({
            ...prev,
            productServiceDetails: {
                ...prev.productServiceDetails,
                USPs: prev.productServiceDetails.USPs.filter((_, index) => index !== indexToRemove),
            },
        }));
    };

    // Validation
    const validateStep = () => {
        if (activeStep === 0) {
            const { brandName, industryType, productOrServiceType, targetAudience } = formData.basicInfo;
            return Boolean(brandName && industryType && productOrServiceType && targetAudience);
        }

        if (activeStep === 1) {
            const { features, USPs, primaryProblemSolved } = formData.productServiceDetails;
            return Boolean(features.length > 0 && USPs.length > 0 && primaryProblemSolved);
        }

        return false;
    };

    const setStepErrors = () => {
        if (activeStep === 0) {
            const { brandName, industryType, productOrServiceType, targetAudience } = formData.basicInfo;
            setErrors(prev => ({
                ...prev,
                basicInfo: {
                    brandName: !brandName,
                    industryType: !industryType,
                    productOrServiceType: !productOrServiceType,
                    targetAudience: !targetAudience,
                }
            }));
        }

        if (activeStep === 1) {
            const { features, USPs, primaryProblemSolved } = formData.productServiceDetails;
            setErrors(prev => ({
                ...prev,
                productServiceDetails: {
                    features: features.length === 0,
                    USPs: USPs.length === 0,
                    primaryProblemSolved: !primaryProblemSolved,
                }
            }));
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleNext = () => {
        setStepErrors();
        if (validateStep()) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleSubmit = async () => {
        setStepErrors();
        if (validateStep()) {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        basicInfo: formData.basicInfo,
                        productServiceDetails: {
                            description: formData.productServiceDetails.primaryProblemSolved,
                            features: formData.productServiceDetails.features,
                            USPs: formData.productServiceDetails.USPs,
                            primaryProblemSolved: formData.productServiceDetails.primaryProblemSolved,
                        },
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch market insights');
                }

                const data = await response.json();
                setApiResponse(data.mediaInsights);
                setShowSuccess(true);
                setActiveStep(2);
            } catch (error) {
                console.error('Submission error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setActiveStep(0);
        setShowSuccess(false);
        setApiResponse(null);
        setError(null);
        setErrors({
            basicInfo: {
                brandName: false,
                industryType: false,
                productOrServiceType: false,
                targetAudience: false,
            },
            productServiceDetails: {
                primaryProblemSolved: false,
                features: false,
                USPs: false,
            },
        });
        setTempFeature('');
        setTempUSP('');
    };

    const renderSuccessContent = () => {
        if (loading) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                    <CircularProgress />
                </Box>
            );
        }

        if (error) {
            return (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            );
        }

        if (!apiResponse) {
            return (
                <Typography variant="body1" color="text.secondary">
                    No market insights available
                </Typography>
            );
        }

        return (
            <Box sx={{ mt: 3, p: 2, bgcolor: '#f9f9f9', borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Market Insights
                </Typography>

                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: '#1976d2' }}>
                    Primary Audience Demographics
                </Typography>
                <Typography variant="body1" paragraph>
                    {apiResponse.primaryAudienceDemographics}
                </Typography>

                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: '#1976d2' }}>
                    Pain Points Addressed
                </Typography>
                <List>
                    {apiResponse.painPointsAddressed.map((point, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={point} />
                        </ListItem>
                    ))}
                </List>

                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: '#1976d2' }}>
                    Competitors
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {apiResponse.competitors.map((competitor, index) => (
                        <Chip key={index} label={competitor} variant="outlined" color="primary" />
                    ))}
                </Box>

                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: '#1976d2' }}>
                    Market Position
                </Typography>
                <Typography variant="body1" paragraph>
                    {apiResponse.marketPosition}
                </Typography>

                <Button
                    variant="contained"
                    onClick={handleReset}
                    sx={{ mt: 3, bgcolor: '#1976d2', '&:hover': { bgcolor: '#115293' } }}
                >
                    Submit Another Response
                </Button>
            </Box>
        );
    };

    // Step content renderer
    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Basic Information
                        </Typography>
                        <Stack spacing={3}>
                            <TextField
                                label="Brand Name"
                                value={formData.basicInfo.brandName}
                                onChange={(e) => handleInputChange('basicInfo', 'brandName', e.target.value)}
                                error={errors.basicInfo.brandName}
                                helperText={errors.basicInfo.brandName ? "Brand name is required" : ""}
                                required
                            />
                            <TextField
                                select
                                label="Industry Type"
                                value={formData.basicInfo.industryType}
                                onChange={(e) => handleInputChange('basicInfo', 'industryType', e.target.value)}
                                error={errors.basicInfo.industryType}
                                helperText={errors.basicInfo.industryType ? "Industry type is required" : ""}
                                required
                            >
                                {industryTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                label="Product/Service Type"
                                value={formData.basicInfo.productOrServiceType}
                                onChange={(e) => handleInputChange('basicInfo', 'productOrServiceType', e.target.value)}
                                error={errors.basicInfo.productOrServiceType}
                                helperText={errors.basicInfo.productOrServiceType ? "Product/Service type is required" : ""}
                                required
                            >
                                {productTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                label="Target Audience"
                                value={formData.basicInfo.targetAudience}
                                onChange={(e) => handleInputChange('basicInfo', 'targetAudience', e.target.value)}
                                error={errors.basicInfo.targetAudience}
                                helperText={errors.basicInfo.targetAudience ? "Target audience is required" : ""}
                                required
                            >
                                {audienceTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Stack>
                    </Box>
                );
            case 1:
                return (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Product/Service Details
                        </Typography>
                        <Stack spacing={3}>
                            <Box>
                                <TextField
                                    label="Add Features (Press Enter to add)"
                                    value={tempFeature}
                                    onChange={(e) => setTempFeature(e.target.value)}
                                    onKeyDown={handleAddFeature}
                                    error={errors.productServiceDetails.features}
                                    helperText={errors.productServiceDetails.features ? "At least one feature is required" : ""}
                                />
                                <ChipContainer>
                                    {formData.productServiceDetails.features.map((feature, index) => (
                                        <Chip
                                            key={index}
                                            label={feature}
                                            onDelete={() => handleRemoveFeature(index)}
                                            color="primary"
                                            variant="outlined"
                                        />
                                    ))}
                                </ChipContainer>
                            </Box>
                            <Box>
                                <TextField
                                    label="Add USPs (Press Enter to add)"
                                    value={tempUSP}
                                    onChange={(e) => setTempUSP(e.target.value)}
                                    onKeyDown={handleAddUSP}
                                    error={errors.productServiceDetails.USPs}
                                    helperText={errors.productServiceDetails.USPs ? "At least one USP is required" : ""}
                                />
                                <ChipContainer>
                                    {formData.productServiceDetails.USPs.map((usp, index) => (
                                        <Chip
                                            key={index}
                                            label={usp}
                                            onDelete={() => handleRemoveUSP(index)}
                                            color="primary"
                                            variant="outlined"
                                        />
                                    ))}
                                </ChipContainer>
                            </Box>
                            <TextField
                                multiline
                                rows={4}
                                label="Primary Problem Solved"
                                value={formData.productServiceDetails.primaryProblemSolved}
                                onChange={(e) =>
                                    handleInputChange('productServiceDetails', 'primaryProblemSolved', e.target.value)
                                }
                                error={errors.productServiceDetails.primaryProblemSolved}
                                helperText={errors.productServiceDetails.primaryProblemSolved ? "Please describe the primary problem your product/service solves" : ""}
                                required
                            />
                        </Stack>
                    </Box>
                );
            case 2:
                return (
                    <Box textAlign="left">
                        {showSuccess && (
                            <Alert severity="success" sx={{ mb: 3 }}>
                                Form submitted successfully!
                            </Alert>
                        )}
                        {renderSuccessContent()}
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <FormPaper elevation={3}>
                    <Stepper activeStep={activeStep}>
                        <Step>
                            <StepLabel>Basic Information</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Product/Service Details</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Results</StepLabel>
                        </Step>
                    </Stepper>

                    <StepContainer>
                        {renderStepContent(activeStep)}
                        {activeStep !== 2 && (
                            <ButtonContainer>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={activeStep === 1 ? handleSubmit : handleNext}
                                    disabled={!validateStep()}
                                >
                                    {activeStep === 1 ? 'Submit' : 'Next'}
                                </Button>
                            </ButtonContainer>
                        )}
                    </StepContainer>
                </FormPaper>
            </Container>
        </ThemeProvider>
    );
};

export default MarketAudienceForm;