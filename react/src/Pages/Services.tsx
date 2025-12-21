import { useEffect, useState } from "react";
import SubscribeSection from "../Components/SubscribeSection";
import ServicesCard from "../Components/Services/ServicesCard";
import Pricing from "../Components/Services/Pricing";
import Cta from "../Components/Services/Cta";
import FAQSection from "../Components/Services/FAQ";
import { faqs } from "../data/faqs";
import Aos from "aos";
import "aos/dist/aos.css";
export default function Services() {
  const [activePlan, setActivePlan] = useState("Pro");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  }, []);
  return (
    <main className="bg-gray-50 text-gray-800" data-aos="fade-up">
      <section className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-32 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">خدماتنا</h1>
        <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90">
          تجربة رقمية متكاملة لعشّاق الكتب، من الشراء وحتى القراءة.
        </p>
      </section>
      <ServicesCard />
      <section className="bg-white py-24 px-6">
        <h2 className="text-4xl font-bold text-center mb-20 text-purple-700">
          كيف تعمل خدماتنا؟
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
          <Step number="1" title="أنشئ حسابك" />
          <Step number="2" title="اختر الكتب" />
          <Step number="3" title="ادفع بأمان" />
          <Step number="4" title="ابدأ القراءة" />
        </div>
      </section>
      <Pricing activePlan={activePlan} setActivePlan={setActivePlan} />
      <FAQSection faqs={faqs} openFaq={openFaq} setOpenFaq={setOpenFaq} />;
      <Cta />
      <div className="my-9">
        <SubscribeSection />
      </div>
    </main>
  );
}

function Step({ number, title }: any) {
  return (
    <div>
      <div className="w-14 h-14 mx-auto rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="font-semibold">{title}</h3>
    </div>
  );
}
