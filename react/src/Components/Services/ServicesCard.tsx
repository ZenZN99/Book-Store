import { FaMobileAlt, FaShieldAlt } from "react-icons/fa";
import { FaBook, FaCloud, FaHeadset, FaTruck } from "react-icons/fa6";

export default function ServicesCard() {
  function ServiceCard({ icon, title }: any) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow hover:-translate-y-2 hover:shadow-xl transition text-center">
        <div className="text-4xl text-purple-600 mb-4 mx-auto">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-24 px-6">
      <h2 className="text-4xl font-bold text-center mb-16 text-purple-700">
        خدماتنا الأساسية
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <ServiceCard icon={<FaBook />} title="كتب رقمية وورقية" />
        <ServiceCard icon={<FaTruck />} title="توصيل سريع" />
        <ServiceCard icon={<FaShieldAlt />} title="دفع آمن" />
        <ServiceCard icon={<FaHeadset />} title="دعم 24/7" />
        <ServiceCard icon={<FaMobileAlt />} title="تجربة متعددة الأجهزة" />
        <ServiceCard icon={<FaCloud />} title="مكتبة سحابية" />
      </div>
    </section>
  );
}
