import { FaPhoneAlt, FaEnvelope, FaGlobe } from "react-icons/fa";

function ContactItem({ icon, text }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
      <div className="text-purple-600 text-3xl mb-3">{icon}</div>
      <p>{text}</p>
    </div>
  );
}

export default function ContactSection() {
  return (
    <section className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-semibold mb-8 text-purple-700">
        تواصل معنا
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
        <ContactItem icon={<FaPhoneAlt />} text="+123 456 789" />
        <ContactItem icon={<FaEnvelope />} text="info@bookstore.com" />
        <ContactItem icon={<FaGlobe />} text="www.bookstore.com" />
      </div>
    </section>
  );
}
