import ArticleDisplay from '@/components/article/ArticleDisplay';
import { db } from '@/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

const VALID_LANGUAGES = [
    'english',
    'hindi',
    'marathi',
    'gujarati',
    'tamil',
    'kannada',
    'telugu',
    'bengali',
    'malayalam',
    'punjabi',
    'odia'
];

const LANGUAGE_CODES = {
    'hindi': 'hi',
    'marathi': 'mr',
    'gujarati': 'gu',
    'tamil': 'ta',
    'kannada': 'kn',
    'telugu': 'te',
    'bengali': 'bn',
    'malayalam': 'ml',
    'punjabi': 'pa',
    'odia': 'or'
};

// Fetch translation from API
async function getTranslation(text, language) {
    try {
        const response = await fetch('https://translator-api-key.onrender.com/translate_all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text })
        });

        if (!response.ok) {
            throw new Error(`Translation API error: ${response.statusText}`);
        }

        const data = await response.json();
        const langCode = LANGUAGE_CODES[language];

        if (data.translations && data.translations[langCode]) {
            const translation = data.translations[langCode];
            return {
                translatedText: translation.translated_text,
                metrics: {
                    bleu: translation.metrics.bleu,
                    'rouge-1': translation.metrics['rouge-1'],
                    'rouge-2': translation.metrics['rouge-2'],
                    'rouge-l': translation.metrics['rouge-l']
                }
            };
        }

        throw new Error(`Translation not found for language: ${language}`);
    } catch (error) {
        console.error('Translation API error:', error);
        return null;
    }
}

// Fetch single article data from Firestore
async function getArticleData(id, language = 'english') {
    if (!id) return null;

    try {
        const docRef = doc(db, 'articles', id);
        const articleSnap = await getDoc(docRef);

        if (!articleSnap.exists()) {
            console.error(`No document found with ID: ${id}`);
            return null;
        }

        const articleData = { id: articleSnap.id, ...articleSnap.data() };

        // If requested language is English, return as is
        if (language === 'english') {
            return articleData;
        }

        // Check if translation exists in Firestore
        if (articleData.translations?.[LANGUAGE_CODES[language]]) {
            const translation = articleData.translations[LANGUAGE_CODES[language]];
            return {
                ...articleData,
                articleGeneration: {
                    ...articleData.articleGeneration,
                    [`${language}Article`]: translation.translated_text
                },
                translationMetrics: {
                    bleu: translation.metrics.bleu,
                    'rouge-1': translation.metrics['rouge-1'],
                    'rouge-2': translation.metrics['rouge-2'],
                    'rouge-l': translation.metrics['rouge-l']
                }
            };
        }

        // If translation doesn't exist, fetch from API
        const englishArticle = articleData.articleGeneration.englishArticle;
        const translationResult = await getTranslation(englishArticle, language);

        if (translationResult) {
            return {
                ...articleData,
                articleGeneration: {
                    ...articleData.articleGeneration,
                    [`${language}Article`]: translationResult.translatedText
                },
                translationMetrics: translationResult.metrics
            };
        }

        // Fallback to English if translation fails
        return articleData;
    } catch (error) {
        console.error('Error fetching article:', error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    try {
        const article = await getArticleData(params.id);

        if (!article) {
            return {
                title: 'Article Not Found',
                description: 'The requested article could not be found.',
            };
        }

        const brandName = article.basicInfo?.brandName || '';
        const industry = article.basicInfo?.industryType || '';
        const targetAudience = article.basicInfo?.targetAudience || '';
        const keywords = article.articleDetails?.keywordsToEmphasize || [];
        const language = params.language || 'english';

        const title = `${brandName}: Revolutionary ${industry} Solutions for ${targetAudience}`;
        const description = `Discover how ${brandName} is revolutionizing ${industry} for ${targetAudience}. Learn about our innovative solutions and industry-leading features.`;

        return {
            title,
            description,
            keywords: keywords.join(', '),
            openGraph: {
                title: `Transform Your Business with ${brandName}`,
                description,
                type: 'article',
                publishedTime: new Date().toISOString(),
                tags: keywords,
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Article',
            description: 'View article content',
        };
    }
}

// Main Article Page Component
export default async function ArticlePage({ params: { id, language = 'english' } }) {
    try {
        if (!VALID_LANGUAGES.includes(language)) {
            throw new Error('Invalid language');
        }

        const articleData = await getArticleData(id, language);

        if (!articleData) {
            throw new Error('Article not found');
        }

        // If we have a translation for the requested language, use it
        if (language !== 'english' && articleData.articleGeneration[`${language}Article`]) {
            articleData.articleGeneration.englishArticle = articleData.articleGeneration[`${language}Article`];
        }

        return (
            <div className="min-h-screen">
                <ArticleDisplay
                    article={articleData}
                    id={id}
                    language={language}
                    translationMetrics={language !== 'english' ? articleData.translationMetrics : null}
                />
            </div>
        );
    } catch (error) {
        console.error('Page error:', error);
        throw error;
    }
}

export async function generateStaticParams() {
    try {
        const collectionRef = collection(db, 'articles');
        const articlesSnap = await getDocs(collectionRef);

        if (articlesSnap.empty) {
            console.error('No articles found in Firestore');
            return [];
        }

        const articles = articlesSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return articles.flatMap(article =>
            VALID_LANGUAGES.map(language => ({
                id: article.id,
                language,
            }))
        );
    } catch (error) {
        console.error('Error generating static params from Firestore:', error);
        return [];
    }
}