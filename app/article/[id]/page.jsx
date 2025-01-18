import { db } from '@/app/api/utils/db';
import ArticleDisplay from '@/components/article/ArticleDisplay';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params: { id } }) {
    if (!id) {
        return {
            title: 'Article Not Found'
        };
    }
    return {
        title: 'Article Details',
        description: 'View article content'
    };
}

async function getArticleData(id) {
    if (!id) return null;

    try {
        // Using the findOne method from DataAPIClient
        const collection = db.collection('brand_info');
        const article = await collection.findOne({ id: id });

        return article;
    } catch (error) {
        console.error('Error fetching article:', error);
        throw new Error('Failed to fetch article data');
    }
}

export default async function ArticlePage({ params: { id } }) {
    if (!id) {
        notFound();
    }

    try {
        const articleData = await getArticleData(id);

        if (!articleData) {
            notFound();
        }

        return <ArticleDisplay article={articleData} />;
    } catch (error) {
        console.error('Page error:', error);
        throw error;
    }
}