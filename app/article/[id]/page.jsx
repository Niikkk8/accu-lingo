import { db } from '@/app/api/utils/db';
import ArticleDisplay from '@/components/article/ArticleDisplay';

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

async function getArticleData(id) {
    if (!id) return null;

    try {
        const collection = db.collection('brand_info');
        // First try to find by _id
        const article = await collection.findOne({ _id: id });

        if (!article) {
            // If not found, try with string ID for backward compatibility
            return await collection.findOne({
                $or: [
                    { id: id },
                    { _id: id }
                ]
            });
        }

        return article;
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
                description: 'The requested article could not be found.'
            };
        }

        const brandName = article.basicInfo?.brandName || '';
        const industry = article.basicInfo?.industryType || '';
        const targetAudience = article.basicInfo?.targetAudience || '';
        const keywords = article.articleDetails?.keywordsToEmphasize || [];
        const language = params.language || 'english';

        const title = language === 'english'
            ? `${brandName}: Revolutionary ${industry} Solutions for ${targetAudience}`
            : `${brandName}: ${industry} Solutions - ${language.charAt(0).toUpperCase() + language.slice(1)}`;

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
                tags: keywords
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Article',
            description: 'View article content'
        };
    }
}

export default async function ArticlePage({ params: { id, language = 'english' } }) {

    try {
        const articleData = await getArticleData(id);

        if (!articleData) {
            notFound();
        }

        const articleWithId = {
            ...articleData,
            id: articleData._id || articleData.id || id
        };

        return (
            <div className="min-h-screen">
                <ArticleDisplay
                    article={articleWithId}
                    currentLanguage={language}
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
        const collection = db.collection('brand_info');
        const articles = await collection.find({}).toArray();

        return articles.flatMap(article =>
            VALID_LANGUAGES.map(language => ({
                id: article._id || article.id,
                language
            }))
        );
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}