import { FaMapMarkerAlt } from "react-icons/fa";
import { FaEnvelope, FaPhone } from "react-icons/fa6";

export default function ContactInfo() {
    function InfoCard({ icon, title, value }: any) {
      return (
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
          <div className="text-purple-600 text-3xl mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p>{value}</p>
        </div>
      );
    }
    
  return (
    <section className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
      <InfoCard
        icon={<FaPhone />}
        title="اتصل بنا"
        value="+962 79 123 4567"
      />
      <InfoCard
        icon={<FaEnvelope />}
        title="البريد الإلكتروني"
        value="support@bookstore.com"
      />
      <InfoCard
        icon={<FaMapMarkerAlt />}
        title="العنوان"
        value="عمّان، الأردن"
      />
    </section>
  );
}
