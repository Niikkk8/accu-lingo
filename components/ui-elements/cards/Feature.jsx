import { LucideIcon } from 'lucide-react';

const Feature = ({ icon: Icon, title, description }) => (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 transform transition-all hover:scale-105 hover:shadow-lg">
        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-indigo-600" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-500">{description}</p>
    </div>
);

export default Feature;