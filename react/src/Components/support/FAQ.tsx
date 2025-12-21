import { FaQuestionCircle, FaSearch } from "react-icons/fa";
import type { FAQProps } from "../../types/faq";

export default function FAQ({
  search,
  category,
  filteredFaqs,
  faqOpen,
  setSearch,
  setCategory,
  setFaqOpen,
}: FAQProps) {
  const CATEGORIES = ["الكل", "الشراء", "الدفع", "العروض", "الحساب"];

  return (
    <section className="max-w-6xl mx-auto mb-16">
      <h2 className="text-3xl font-semibold mb-8 text-purple-700 text-center">
        الأسئلة المتكررة
      </h2>

      <div className="flex items-center gap-3 mb-6 bg-white p-3 rounded-lg shadow">
        <FaSearch className="text-gray-400" />
        <input
          placeholder="ابحث عن سؤال..."
          className="flex-1 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-3 flex-wrap justify-center mb-8">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full transition ${
              category === c
                ? "bg-purple-600 text-white"
                : "bg-white shadow"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 && (
          <p className="text-center text-gray-500">
            لا توجد نتائج مطابقة
          </p>
        )}

        {filteredFaqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow overflow-hidden"
          >
            <button
              className="w-full flex justify-between items-center p-4 text-right"
              onClick={() =>
                setFaqOpen(faqOpen === idx ? null : idx)
              }
            >
              <span className="font-medium">{faq.q}</span>
              <FaQuestionCircle
                className={`transition ${
                  faqOpen === idx
                    ? "text-purple-600 rotate-180"
                    : "text-gray-400"
                }`}
              />
            </button>

            {faqOpen === idx && (
              <div className="px-4 pb-4 text-gray-600 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
