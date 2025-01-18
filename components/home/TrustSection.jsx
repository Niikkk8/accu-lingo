const TrustSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Trusted by Industry Leaders</h2>
                    <p className="mt-4 text-gray-500">
                        Join thousands of businesses transforming their content with AccuLingo
                    </p>
                    <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-6">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-center group"
                            >
                                <div className="h-12 w-32 bg-gray-200 rounded animate-pulse group-hover:bg-gray-300 transition-colors" />
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 max-w-3xl mx-auto">
                        <div className="bg-indigo-50 p-8 rounded-xl">
                            <blockquote className="text-lg text-gray-700 italic">
                                "AccuLingo has revolutionized our content localization process. The accuracy and speed of translations have helped us reach millions of new users across India."
                            </blockquote>
                            <div className="mt-4">
                                <p className="font-medium text-gray-900">Sarah Johnson</p>
                                <p className="text-gray-600">Content Director, TechCorp Inc.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;