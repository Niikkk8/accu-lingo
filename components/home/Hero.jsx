'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Play } from 'lucide-react';
import { scrollToElement } from '@/lib/smoothScroll';
import StatCard from '../ui-elements/cards/StatCard';
import Link from 'next/link';

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleScrollToDemo = (e) => {
        e.preventDefault();
        scrollToElement('demo');
    };

    return (
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center transform transition-all duration-1000 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                    <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl md:text-7xl">
                        Transform Your Content Into
                        <span className="text-indigo-600 block mt-2">10 Indian Languages</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
                        Industry-leading accuracy meets lightning-fast processing. Power your global content strategy with AccuLingo's AI-driven translation platform.
                    </p>
                    <div className="mt-8 flex justify-center space-x-4">
                        {/* Option 1: For page navigation */}
                        <Link
                            href="/translate"
                            className="px-8 py-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105 flex items-center"
                        >
                            Start Translating Now
                            <ChevronRight className="ml-2" />
                        </Link>

                        <Link
                            href="https://drive.google.com/file/d/19vgDrTjB9XhkoeBpd5LLBqPVXTQ3MYfP/view?usp=drivesdk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transform transition-transform hover:scale-105 flex items-center"
                        >
                            Watch Demo
                            <Play className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
                        <StatCard number="10+" label="Languages" />
                        <StatCard number="85%" label="Min. Accuracy" />
                        <StatCard number="10s" label="Processing Time" />
                        <StatCard number="1M+" label="Translations" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;