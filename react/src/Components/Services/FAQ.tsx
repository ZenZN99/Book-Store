import { FaChevronDown } from "react-icons/fa6";
import type { FAQSectionProps } from "../../types/faq";

export default function FAQSection({
  faqs,
  openFaq,
  setOpenFaq,
}: FAQSectionProps) {
  return (
    <section className="bg-white py-24 px-6">
      <h2 className="text-4xl font-bold text-center mb-16 text-purple-700">
        الأسئلة الشائعة
      </h2>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((f, i) => (
          <FAQItem
            key={i}
            q={f.q}
            a={f.a}
            open={openFaq === i}
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}

function FAQItem({
  q,
  a,
  open,
  onClick,
}: {
  q: string;
  a: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div onClick={onClick} className="cursor-pointer border p-6 rounded-xl">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">{q}</h4>
        <FaChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
      </div>

      {open && <p className="text-gray-600 mt-3">{a}</p>}
    </div>
  );
}
