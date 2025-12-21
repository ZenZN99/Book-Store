import { FaCheckCircle } from "react-icons/fa";
import type { PricingProps } from "../../types/pricing";

export default function Pricing({ activePlan, setActivePlan }: PricingProps) {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16 text-purple-700">
        باقاتنا
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        <PricingCard
          title="Basic"
          active={activePlan === "Basic"}
          onSelect={() => setActivePlan("Basic")}
          features={["تصفح الكتب", "شراء فردي"]}
        />

        <PricingCard
          title="Pro"
          active={activePlan === "Pro"}
          highlight
          onSelect={() => setActivePlan("Pro")}
          features={["خصومات حصرية", "مكتبة سحابية", "دعم كامل"]}
        />

        <PricingCard
          title="Enterprise"
          active={activePlan === "Enterprise"}
          onSelect={() => setActivePlan("Enterprise")}
          features={["حلول مخصصة", "إدارة فرق", "تقارير"]}
        />
      </div>
    </section>
  );
}

function PricingCard({ title, features, active, highlight, onSelect }: any) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer p-10 rounded-2xl shadow-lg text-center transition ${
        highlight
          ? "bg-purple-600 text-white scale-105"
          : active
          ? "border-2 border-purple-600 bg-white"
          : "bg-white"
      }`}
    >
      <h3 className="text-2xl font-bold mb-6">{title}</h3>

      <ul className="space-y-3 mb-8">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-center justify-center gap-2">
            <FaCheckCircle /> {f}
          </li>
        ))}
      </ul>

      <button
        className={`px-8 py-3 rounded-full font-semibold ${
          highlight ? "bg-white text-purple-600" : "bg-purple-600 text-white"
        }`}
      >
        اختر الباقة
      </button>
    </div>
  );
}
