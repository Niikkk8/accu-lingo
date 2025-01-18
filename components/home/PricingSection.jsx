import PricingTier from "../ui-elements/cards/PricingTier";

const PricingSection = () => {
    const pricingPlans = [
        {
            name: "Starter",
            price: 49,
            features: [
                "50,000 words per month",
                "5 languages",
                "Basic API access",
                "Email support",
                "Standard response time"
            ],
            recommended: false
        },
        {
            name: "Professional",
            price: 99,
            features: [
                "200,000 words per month",
                "All languages",
                "Full API access",
                "Priority support",
                "Custom glossaries",
                "24/7 chat support"
            ],
            recommended: true
        },
        {
            name: "Enterprise",
            price: 299,
            features: [
                "Unlimited words",
                "All languages",
                "Advanced API features",
                "24/7 support",
                "Custom integration",
                "SLA guarantee",
                "Dedicated account manager"
            ],
            recommended: false
        }
    ];

    return (
        <section id="pricing" className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
                    <p className="mt-4 text-gray-500">Choose the plan that best fits your needs</p>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {pricingPlans.map((plan) => (
                        <PricingTier
                            key={plan.name}
                            name={plan.name}
                            price={plan.price}
                            features={plan.features}
                            recommended={plan.recommended}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;