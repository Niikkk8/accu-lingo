import React from 'react';
import Link from 'next/link';

const LANGUAGES = {
    english: 'English',
    hindi: 'हिंदी',
    marathi: 'मराठी',
    gujarati: 'ગુજરાતી',
    tamil: 'தமிழ்',
    kannada: 'ಕನ್ನಡ',
    telugu: 'తెలుగు',
    bengali: 'বাংলা',
    malayalam: 'മലയാളം',
    punjabi: 'ਪੰਜਾਬੀ',
    odia: 'ଓଡ଼ିଆ'
};

const MetricsDisplay = ({ metrics }) => {
    if (!metrics) return null;

    return (
        <div className="mb-6 bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Translation Quality Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <span className="block text-sm font-medium text-gray-500 mb-1">BLEU Score</span>
                    <span className="text-lg font-semibold text-blue-600">
                        {(metrics.bleu * 100).toFixed(2)}%
                    </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <span className="block text-sm font-medium text-gray-500 mb-1">ROUGE-1</span>
                    <span className="text-lg font-semibold text-blue-600">
                        {(metrics['rouge-1'] * 100).toFixed(2)}%
                    </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <span className="block text-sm font-medium text-gray-500 mb-1">ROUGE-2</span>
                    <span className="text-lg font-semibold text-blue-600">
                        {(metrics['rouge-2'] * 100).toFixed(2)}%
                    </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <span className="block text-sm font-medium text-gray-500 mb-1">ROUGE-L</span>
                    <span className="text-lg font-semibold text-blue-600">
                        {(metrics['rouge-l'] * 100).toFixed(2)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

const ArticleDisplay = ({ article, id, language = 'english', translationMetrics }) => {
    const brandName = article?.basicInfo?.brandName || 'Our Brand';

    // Extract title and content
    const fullArticle = article.articleGeneration.englishArticle;
    const titleMatch = fullArticle.match(/^Title:\s*(.+?)(?=\s+\w)/);
    const title = titleMatch ? titleMatch[1] : brandName;
    const articlePara = fullArticle.replace(/^Title:\s*.+?(?=\s+\w)/, '').trim();

    return (
        <div className="max-w-4xl mx-auto px-4 pb-8 pt-20">
            {/* Language Navigation */}
            <div className="mb-6 bg-white shadow-lg rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Languages</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(LANGUAGES).map(([langCode, langName]) => (
                        <Link
                            key={langCode}
                            href={`/article/${id}/${langCode}`}
                            className={`flex items-center justify-center px-4 py-2 rounded-lg text-gray-700 transition-colors duration-200 border ${language === langCode
                                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                                    : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200'
                                }`}
                        >
                            {langName}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Translation Metrics */}
            {language !== 'english' && <MetricsDisplay metrics={translationMetrics} />}

            <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-50 to-white p-8 border-b border-gray-200">
                    <div className="flex flex-col mb-6">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">
                            {brandName}
                        </h1>
                        {article?.basicInfo?.tagline && (
                            <p className="text-xl text-gray-600 italic font-light">
                                {article.basicInfo.tagline}
                            </p>
                        )}
                    </div>

                    {/* Meta Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <span className="block font-semibold text-gray-800 mb-1">Industry</span>
                            <span className="text-gray-600">{article?.basicInfo?.industryType}</span>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <span className="block font-semibold text-gray-800 mb-1">Type</span>
                            <span className="text-gray-600">{article?.basicInfo?.productOrServiceType}</span>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <span className="block font-semibold text-gray-800 mb-1">Target</span>
                            <span className="text-gray-600">{article?.basicInfo?.targetAudience}</span>
                        </div>
                    </div>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-2">
                        {article?.articleDetails?.keywordsToEmphasize?.map((keyword, index) => (
                            <span
                                key={index}
                                className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                            >
                                {keyword}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Article Content */}
                <div className="px-8 py-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        {title}
                    </h2>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {articlePara}
                        </p>
                    </div>

                    {/* Product Features and USPs */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                            <ul className="list-disc list-inside space-y-2">
                                {article?.productServiceDetails?.features?.map((feature, index) => (
                                    <li key={index} className="text-gray-700">{feature}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Unique Selling Points</h3>
                            <ul className="list-disc list-inside space-y-2">
                                {article?.productServiceDetails?.USPs?.map((usp, index) => (
                                    <li key={index} className="text-gray-700">{usp}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Call to Action */}
                    {article?.articleDetails?.callToAction && (
                        <div className="mt-12 bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <p className="text-blue-900 font-medium text-lg">
                                {article.articleDetails.callToAction}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArticleDisplay;