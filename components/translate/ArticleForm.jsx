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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Ensure Firebase is initialized here
import { useRouter } from "next/navigation";

// Theme configuration
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
        tagline: '',
        industryType: '',
        productOrServiceType: '',
        targetAudience: '',
    },
    productServiceDetails: {
        features: [],
        USPs: [],
        primaryProblemSolved: '',
    },
    mediaInsights: {
        primaryAudienceDemographics: '',
        painPointsAddressed: [],
        competitors: [],
        marketPosition: '',
    },
    articleDetails: {
        articleType: '',
        articleLength: 100,
        keywordsToEmphasize: [],
        callToAction: '',
    },
};

const CompleteForm = () => {
    // State management
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState(initialFormData);
    const [tempFeature, setTempFeature] = useState('');
    const [tempUSP, setTempUSP] = useState('');
    const [tempPainPoint, setTempPainPoint] = useState('');
    const [tempCompetitor, setTempCompetitor] = useState('');
    const [tempKeyword, setTempKeyword] = useState('');
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
        mediaInsights: {
            primaryAudienceDemographics: false,
            painPointsAddressed: false,
            competitors: false,
            marketPosition: false,
        },
        articleDetails: {
            articleType: false,
            articleLength: false,
            keywordsToEmphasize: false,
        },
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const router = useRouter()

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

    const articleTypes = [
        'Blog',
        'News Article',
        'Press Release',
        'Case Study',
        'Whitepaper',
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

    // Chip handlers
    const handleAddItem = (e, tempValue, setTempValue, section, field) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (tempValue.trim()) {
                setFormData((prev) => ({
                    ...prev,
                    [section]: {
                        ...prev[section],
                        [field]: [...prev[section][field], tempValue.trim()],
                    },
                }));
                setTempValue('');
                setErrors((prev) => ({
                    ...prev,
                    [section]: {
                        ...prev[section],
                        [field]: false,
                    },
                }));
            }
        }
    };

    const handleRemoveItem = (section, field, indexToRemove) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: prev[section][field].filter((_, index) => index !== indexToRemove),
            },
        }));
    };

    // Validation
    const validateStep = () => {
        switch (activeStep) {
            case 0: // Basic Info
                const { brandName, industryType, productOrServiceType, targetAudience } = formData.basicInfo;
                return Boolean(brandName && industryType && productOrServiceType && targetAudience);

            case 1: // Product Service Details
                const { features, USPs, primaryProblemSolved } = formData.productServiceDetails;
                return Boolean(features.length > 0 && USPs.length > 0 && primaryProblemSolved);

            case 2: // Media Insights
                const { primaryAudienceDemographics, painPointsAddressed, competitors, marketPosition } = formData.mediaInsights;
                return Boolean(
                    primaryAudienceDemographics &&
                    painPointsAddressed.length > 0 &&
                    competitors.length > 0 &&
                    marketPosition
                );

            case 3: // Article Details
                const { articleType, articleLength, keywordsToEmphasize } = formData.articleDetails;
                return Boolean(articleType && articleLength >= 100 && keywordsToEmphasize.length > 0);

            default:
                return false;
        }
    };

    const setStepErrors = () => {
        switch (activeStep) {
            case 0:
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
                break;

            case 1:
                const { features, USPs, primaryProblemSolved } = formData.productServiceDetails;
                setErrors(prev => ({
                    ...prev,
                    productServiceDetails: {
                        features: features.length === 0,
                        USPs: USPs.length === 0,
                        primaryProblemSolved: !primaryProblemSolved,
                    }
                }));
                break;

            case 2:
                const { primaryAudienceDemographics, painPointsAddressed, competitors, marketPosition } = formData.mediaInsights;
                setErrors(prev => ({
                    ...prev,
                    mediaInsights: {
                        primaryAudienceDemographics: !primaryAudienceDemographics,
                        painPointsAddressed: painPointsAddressed.length === 0,
                        competitors: competitors.length === 0,
                        marketPosition: !marketPosition,
                    }
                }));
                break;

            case 3:
                const { articleType, articleLength, keywordsToEmphasize } = formData.articleDetails;
                setErrors(prev => ({
                    ...prev,
                    articleDetails: {
                        articleType: !articleType,
                        articleLength: articleLength < 100,
                        keywordsToEmphasize: keywordsToEmphasize.length === 0,
                    }
                }));
                break;
        }
    };

    // Navigation handlers
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
            try {
                // Prepare the data to send to the API
                const apiData = {
                    basicInfo: formData.basicInfo,
                    productServiceDetails: formData.productServiceDetails,
                    articleDetails: formData.articleDetails,
                    mediaInsights: formData.mediaInsights,
                };

                // Generate article content
                const response = await fetch("https://content-insight-api.onrender.com/generate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(apiData),
                });

                const result = await response.json();

                if (!result.content?.article) {
                    setShowError("Article generation failed");
                    return;
                }

                // Format the article data
                const formattedArticle = {
                    englishArticle: result.content.article,
                    translations: {
                        hindi: "",
                        marathi: "",
                        gujarati: "",
                        tamil: "",
                        kannada: "",
                        telugu: "",
                        bengali: "",
                        malayalam: "",
                        punjabi: "",
                        odia: "",
                    },
                };

                // Create complete data with the article
                const completeData = {
                    ...apiData,
                    articleGeneration: formattedArticle,
                };

                // Add the document to Firestore
                const articlesCollection = collection(db, "articles"); // Reference the "articles" collection
                const docRef = await addDoc(articlesCollection, completeData);

                // Push the user to the article page using the document ID
                router.push(`/article/${docRef.id}`);
            } catch (error) {
                console.error("Submission error:", error);
                setShowError(error.message || "An error occurred during submission");
            }
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setActiveStep(0);
        setShowSuccess(false);
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
            mediaInsights: {
                primaryAudienceDemographics: false,
                painPointsAddressed: false,
                competitors: false,
                marketPosition: false,
            },
            articleDetails: {
                articleType: false,
                articleLength: false,
                keywordsToEmphasize: false,
            },
        });
        setTempFeature('');
        setTempUSP('');
        setTempPainPoint('');
        setTempCompetitor('');
        setTempKeyword('');
    };

    // Render form steps
    const renderStepContent = (step) => {
        switch (step) {
            case 0: // Basic Information
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
                                label="Tagline"
                                value={formData.basicInfo.tagline}
                                onChange={(e) => handleInputChange('basicInfo', 'tagline', e.target.value)}
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

            case 1: // Product/Service Details
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
                                    onKeyDown={(e) => handleAddItem(e, tempFeature, setTempFeature, 'productServiceDetails', 'features')}
                                    error={errors.productServiceDetails.features}
                                    helperText={errors.productServiceDetails.features ? "At least one feature is required" : ""}
                                />
                                <ChipContainer>
                                    {formData.productServiceDetails.features.map((feature, index) => (
                                        <Chip
                                            key={index}
                                            label={feature}
                                            onDelete={() => handleRemoveItem('productServiceDetails', 'features', index)}
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
                                    onKeyDown={(e) => handleAddItem(e, tempUSP, setTempUSP, 'productServiceDetails', 'USPs')}
                                    error={errors.productServiceDetails.USPs}
                                    helperText={errors.productServiceDetails.USPs ? "At least one USP is required" : ""}
                                />
                                <ChipContainer>
                                    {formData.productServiceDetails.USPs.map((usp, index) => (
                                        <Chip
                                            key={index}
                                            label={usp}
                                            onDelete={() => handleRemoveItem('productServiceDetails', 'USPs', index)}
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
                                onChange={(e) => handleInputChange('productServiceDetails', 'primaryProblemSolved', e.target.value)}
                                error={errors.productServiceDetails.primaryProblemSolved}
                                helperText={errors.productServiceDetails.primaryProblemSolved ? "Please describe the primary problem your product/service solves" : ""}
                                required
                            />
                        </Stack>
                    </Box>
                );

            case 2: // Media Insights
                return (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Media Insights
                        </Typography>
                        <Stack spacing={3}>
                            <TextField
                                label="Primary Audience Demographics"
                                value={formData.mediaInsights.primaryAudienceDemographics}
                                onChange={(e) => handleInputChange('mediaInsights', 'primaryAudienceDemographics', e.target.value)}
                                error={errors.mediaInsights.primaryAudienceDemographics}
                                helperText={errors.mediaInsights.primaryAudienceDemographics ? "Demographics information is required" : ""}
                                required
                            />

                            <Box>
                                <TextField
                                    label="Add Pain Points (Press Enter to add)"
                                    value={tempPainPoint}
                                    onChange={(e) => setTempPainPoint(e.target.value)}
                                    onKeyDown={(e) => handleAddItem(e, tempPainPoint, setTempPainPoint, 'mediaInsights', 'painPointsAddressed')}
                                    error={errors.mediaInsights.painPointsAddressed}
                                    helperText={errors.mediaInsights.painPointsAddressed ? "At least one pain point is required" : ""}
                                />
                                <ChipContainer>
                                    {formData.mediaInsights.painPointsAddressed.map((point, index) => (
                                        <Chip
                                            key={index}
                                            label={point}
                                            onDelete={() => handleRemoveItem('mediaInsights', 'painPointsAddressed', index)}
                                            color="primary"
                                            variant="outlined"
                                        />
                                    ))}
                                </ChipContainer>
                            </Box>

                            <Box>
                                <TextField
                                    label="Add Competitors (Press Enter to add)"
                                    value={tempCompetitor}
                                    onChange={(e) => setTempCompetitor(e.target.value)}
                                    onKeyDown={(e) => handleAddItem(e, tempCompetitor, setTempCompetitor, 'mediaInsights', 'competitors')}
                                    error={errors.mediaInsights.competitors}
                                    helperText={errors.mediaInsights.competitors ? "At least one competitor is required" : ""}
                                />
                                <ChipContainer>
                                    {formData.mediaInsights.competitors.map((competitor, index) => (
                                        <Chip
                                            key={index}
                                            label={competitor}
                                            onDelete={() => handleRemoveItem('mediaInsights', 'competitors', index)}
                                            color="primary"
                                            variant="outlined"
                                        />
                                    ))}
                                </ChipContainer>
                            </Box>

                            <TextField
                                multiline
                                rows={4}
                                label="Market Position"
                                value={formData.mediaInsights.marketPosition}
                                onChange={(e) => handleInputChange('mediaInsights', 'marketPosition', e.target.value)}
                                error={errors.mediaInsights.marketPosition}
                                helperText={errors.mediaInsights.marketPosition ? "Market position is required" : ""}
                                required
                            />
                        </Stack>
                    </Box>
                );

            case 3: // Article Details
                return (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Article Details
                        </Typography>
                        <Stack spacing={3}>
                            <TextField
                                select
                                label="Article Type"
                                value={formData.articleDetails.articleType}
                                onChange={(e) => handleInputChange('articleDetails', 'articleType', e.target.value)}
                                error={errors.articleDetails.articleType}
                                helperText={errors.articleDetails.articleType ? "Article type is required" : ""}
                                required
                            >
                                {articleTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                type="number"
                                label="Article Length (words)"
                                value={formData.articleDetails.articleLength}
                                onChange={(e) => handleInputChange('articleDetails', 'articleLength', parseInt(e.target.value, 10))}
                                error={errors.articleDetails.articleLength}
                                helperText={errors.articleDetails.articleLength ? "Article length must be at least 100 words" : ""}
                                required
                                inputProps={{ min: 100 }}
                            />

                            <Box>
                                <TextField
                                    label="Add Keywords (Press Enter to add)"
                                    value={tempKeyword}
                                    onChange={(e) => setTempKeyword(e.target.value)}
                                    onKeyDown={(e) => handleAddItem(e, tempKeyword, setTempKeyword, 'articleDetails', 'keywordsToEmphasize')}
                                    error={errors.articleDetails.keywordsToEmphasize}
                                    helperText={errors.articleDetails.keywordsToEmphasize ? "At least one keyword is required" : ""}
                                />
                                <ChipContainer>
                                    {formData.articleDetails.keywordsToEmphasize.map((keyword, index) => (
                                        <Chip
                                            key={index}
                                            label={keyword}
                                            onDelete={() => handleRemoveItem('articleDetails', 'keywordsToEmphasize', index)}
                                            color="primary"
                                            variant="outlined"
                                        />
                                    ))}
                                </ChipContainer>
                            </Box>

                            <TextField
                                label="Call to Action"
                                value={formData.articleDetails.callToAction}
                                onChange={(e) => handleInputChange('articleDetails', 'callToAction', e.target.value)}
                            />
                        </Stack>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                {showSuccess && (
                    <Alert
                        severity="success"
                        sx={{ mt: 2 }}
                        onClose={() => setShowSuccess(false)}
                    >
                        Form submitted successfully!
                    </Alert>
                )}
                <FormPaper elevation={3}>
                    <Stepper activeStep={activeStep}>
                        <Step>
                            <StepLabel>Basic Information</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Product/Service Details</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Media Insights</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Article Details</StepLabel>
                        </Step>
                    </Stepper>

                    <StepContainer>
                        {activeStep === 4 ? (
                            <Box textAlign="center">
                                <Typography variant="h6" gutterBottom>
                                    Form Submitted Successfully!
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={handleReset}
                                    sx={{ mt: 2 }}
                                >
                                    Submit Another Response
                                </Button>
                            </Box>
                        ) : (
                            <>
                                {renderStepContent(activeStep)}
                                <ButtonContainer>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={activeStep === 3 ? handleSubmit : handleNext}
                                        disabled={!validateStep()}
                                    >
                                        {activeStep === 3 ? 'Submit' : 'Next'}
                                    </Button>
                                </ButtonContainer>
                            </>
                        )}
                    </StepContainer>
                </FormPaper>
            </Container>
        </ThemeProvider>
    );
};

export default CompleteForm;