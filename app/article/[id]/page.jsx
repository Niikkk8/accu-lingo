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

// Fetch single article data from Firestore
async function getArticleData(id) {
    if (!id) return null;

    try {
        const docRef = doc(db, 'articles', id);
        const articleSnap = await getDoc(docRef);

        if (!articleSnap.exists()) {
            console.error(`No document found with ID: ${id}`);
            return null;
        }

        return { id: articleSnap.id, ...articleSnap.data() };
    } catch (error) {
        console.error('Error fetching article from Firestore:', error);
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

        const title =
            language === 'english'
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
        const articleData = await getArticleData(id);

        return (
            <div className="min-h-screen">
                <ArticleDisplay article={articleData} currentLanguage={language} />
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
