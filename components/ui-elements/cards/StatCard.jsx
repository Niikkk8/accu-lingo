const StatCard = ({ number, label }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
        <div className="text-3xl font-bold text-indigo-600">{number}</div>
        <div className="text-gray-600 mt-2">{label}</div>
    </div>
);

export default StatCard;