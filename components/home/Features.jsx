import { Languages, BarChart3, Timer, Cloud, Shield, Database } from 'lucide-react';
import Feature from '../ui-elements/cards/Feature';

const Features = () => (
    <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
                <p className="mt-4 text-gray-500">Everything you need for accurate language translation</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Feature
                    icon={Languages}
                    title="10 Indian Languages"
                    description="Support for Hindi, Marathi, Gujarati, Tamil, Kannada, Telugu, Bengali, Malayalam, Punjabi, and Odia"
                />
                <Feature
                    icon={BarChart3}
                    title="High Accuracy"
                    description="≥85% translation accuracy across all languages, measured using BLEU and ROUGE scores"
                />
                <Feature
                    icon={Timer}
                    title="Fast Processing"
                    description="Lightning-fast translation processing in under 10 seconds per language"
                />
                <Feature
                    icon={Cloud}
                    title="Cloud Processing"
                    description="Scalable cloud infrastructure for handling large translation volumes"
                />
                <Feature
                    icon={Shield}
                    title="Secure & Reliable"
                    description="Enterprise-grade security with 99.9% uptime guarantee"
                />
                <Feature
                    icon={Database}
                    title="API Access"
                    description="Full API access for seamless integration with your applications"
                />
            </div>
        </div>
    </section>
);

export default Features;