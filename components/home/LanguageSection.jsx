'use client';

const LanguageSection = () => {
    const languages = [
        { name: 'Hindi', accuracy: 92 },
        { name: 'Marathi', accuracy: 89 },
        { name: 'Gujarati', accuracy: 87 },
        { name: 'Tamil', accuracy: 90 },
        { name: 'Kannada', accuracy: 88 },
        { name: 'Telugu', accuracy: 89 },
        { name: 'Bengali', accuracy: 91 },
        { name: 'Malayalam', accuracy: 88 },
        { name: 'Punjabi', accuracy: 90 },
        { name: 'Odia', accuracy: 86 },
    ];

    return (
        <section id="languages" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Supported Languages</h2>
                    <p className="mt-4 text-gray-500">Current accuracy metrics for all supported languages</p>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
                    {languages.map((lang) => (
                        <div
                            key={lang.name}
                            className="p-4 bg-gray-50 rounded-lg transform transition-all hover:scale-105 hover:shadow-lg"
                        >
                            <h3 className="text-lg font-medium text-gray-900">{lang.name}</h3>
                            <div className="mt-2 flex items-baseline">
                                <span className="text-2xl font-semibold text-indigo-600">
                                    {lang.accuracy}%
                                </span>
                                <span className="ml-2 text-sm text-gray-500">accuracy</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LanguageSection;