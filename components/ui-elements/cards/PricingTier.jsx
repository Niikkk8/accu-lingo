import { CheckCircle } from 'lucide-react';

const PricingTier = ({ name, price, features, recommended }) => (
    <div className={`p-8 rounded-xl shadow-lg transform transition-all hover:scale-105 ${recommended ? 'bg-indigo-600 text-white ring-4 ring-indigo-300' : 'bg-white'
        }`}>
        <h3 className="text-2xl font-bold">{name}</h3>
        <div className="mt-4">
            <span className="text-4xl font-bold">${price}</span>
            <span className="text-lg">/month</span>
        </div>
        <ul className="mt-6 space-y-4">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    {feature}
                </li>
            ))}
        </ul>
        <button className={`mt-8 w-full py-3 rounded-md transition-colors ${recommended
                ? 'bg-white text-indigo-600 hover:bg-gray-100'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}>
            Get Started
        </button>
    </div>
);

export default PricingTier;