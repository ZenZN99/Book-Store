import { useState, useMemo, useEffect } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import SubscribeSection from "../Components/SubscribeSection";
import { FAQS } from "../data/faqs";
import ContactForm from "../Components/support/ContactForm";
import ContactInfo from "../Components/support/ContactInfo";
import FAQ from "../Components/support/FAQ";
import Aos from "aos";
import "aos/dist/aos.css";
export default function Support() {
  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  }, []);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");
  const [chatOpen, setChatOpen] = useState(false);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((f) => {
      const matchCategory = category === "الكل" || f.category === category;
      const matchSearch =
        f.q.toLowerCase().includes(search.toLowerCase()) ||
        f.a.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [search, category]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSending(true);
    setSent(false);

    await new Promise((r) => setTimeout(r, 1200));

    setSending(false);
    setSent(true);
    e.target.reset();
  };

  return (
    <main className="px-4 md:px-16 py-10 bg-gray-50 text-gray-800" data-aos="fade-up">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
          الدعم والمساعدة
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          مركز دعم متكامل للإجابة على أسئلتك بسرعة.
        </p>
      </section>

      <ContactInfo />

      <ContactForm handleSubmit={handleSubmit} sending={sending} sent={sent} />
      <FAQ
        search={search}
        category={category}
        setSearch={setSearch}
        setCategory={setCategory}
        filteredFaqs={filteredFaqs}
        faqOpen={faqOpen}
        setFaqOpen={setFaqOpen}
      />

      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition"
      >
        <FaComments />
      </button>

      {chatOpen && <ChatModal onClose={() => setChatOpen(false)} />}

      <SubscribeSection />
    </main>
  );
}

function ChatModal({ onClose }: any) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50"
      data-aos="fade-up"
    >
      <div className="bg-white w-full md:w-96 rounded-t-2xl md:rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">الدعم المباشر</h3>
          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <p className="text-gray-600 mb-4">مرحبًا 👋 كيف يمكننا مساعدتك؟</p>
        <input
          className="border rounded-lg p-2 w-full mb-3"
          placeholder="اكتب رسالتك..."
        />
        <button className="w-full bg-purple-600 text-white py-2 rounded-lg">
          إرسال
        </button>
      </div>
    </div>
  );
}
