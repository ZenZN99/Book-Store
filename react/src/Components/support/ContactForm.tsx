import { FaCheckCircle } from "react-icons/fa";

interface ContactFormProps {
  handleSubmit: (e: any) => void;
  sending: boolean;
  sent: boolean;
}

export default function ContactForm({
  handleSubmit,
  sending,
  sent,
}: ContactFormProps) {
  return (
    <section className="max-w-4xl mx-auto mb-16 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-purple-700 text-center">
        أرسل لنا رسالة
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="border p-3 rounded-lg"
          placeholder="الاسم الكامل"
          required
        />
        <input
          type="email"
          className="border p-3 rounded-lg"
          placeholder="البريد الإلكتروني"
          required
        />
        <input
          className="border p-3 rounded-lg"
          placeholder="موضوع الرسالة"
          required
        />
        <textarea
          className="border p-3 rounded-lg h-40"
          placeholder="نص الرسالة"
          required
        />

        <button
          type="submit"
          disabled={sending}
          className={`px-6 py-3 rounded-lg text-white transition ${
            sending ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {sending ? "جاري الإرسال..." : "إرسال الرسالة"}
        </button>

        {sent && (
          <div className="flex items-center gap-2 text-emerald-600 font-medium">
            <FaCheckCircle /> تم إرسال رسالتك بنجاح
          </div>
        )}
      </form>
    </section>
  );
}
