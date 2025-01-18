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
    malayalam: 'മലയาളം',
    punjabi: 'ਪੰਜਾਬੀ',
    odia: 'ଓଡ଼ിଆ'
};

const ArticleDisplay = ({ article, currentLanguage = 'english' }) => {
    const brandName = article?.basicInfo?.brandName || 'Our Brand';

    // Extract title and content
    const fullArticle = article.articleGeneration.englishArticle;
    const titleMatch = fullArticle.match(/^Title:\s*(.+?)(?=\s+\w)/);
    const title = titleMatch ? titleMatch[1] : brandName;
    const articlePara = fullArticle.replace(/^Title:\s*.+?(?=\s+\w)/, '').trim();

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
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

                {/* Language Navigation */}
                <div className="bg-gray-50 px-8 py-4 flex flex-wrap justify-center gap-2 border-b border-gray-200">
                    {Object.entries(LANGUAGES).map(([code, name]) => (
                        <Link
                            key={code}
                            href={`/article/${article.id}/${code}`}
                            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap no-underline transition-colors duration-200 ${currentLanguage === code
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {name}
                        </Link>
                    ))}
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