'use client'

import { useState, useEffect } from 'react';
import { Globe2 } from 'lucide-react';
import { scrollToElement } from '@/lib/smoothScroll';
import Link from 'next/link';

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, id) => {
        e.preventDefault();
        scrollToElement(id);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Globe2 className="h-8 w-8 text-indigo-600 transform transition-transform hover:rotate-180 duration-1000" />
                        <span className="ml-2 text-2xl font-bold text-gray-900">AccuLingo</span>
                    </div>
                    <div className="flex items-center space-x-8">
                        <button
                            onClick={(e) => handleNavClick(e, 'features')}
                            className="text-gray-700 hover:text-indigo-600 transition-colors"
                        >
                            Features
                        </button>
                        <button
                            onClick={(e) => handleNavClick(e, 'languages')}
                            className="text-gray-700 hover:text-indigo-600 transition-colors"
                        >
                            Languages
                        </button>
                        <button
                            onClick={(e) => handleNavClick(e, 'pricing')}
                            className="text-gray-700 hover:text-indigo-600 transition-colors"
                        >
                            Pricing
                        </button>
                        <Link
                            href="/media"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105"
                        >
                            Media Insights
                        </Link>
                        <Link
                            href="/translate"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transform transition-transform hover:scale-105"
                        >
                            Generate Articles
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;