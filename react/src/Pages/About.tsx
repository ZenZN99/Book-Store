import { useEffect, useState } from "react";
import team1 from "../assets/blog1.jpg";
import team2 from "../assets/blog2.jpg";
import team3 from "../assets/blog3.jpg";
import team4 from "../assets/blog4.avif";
import Stat from "../Components/followus/Stat";
import TabSection from "../Components/about/TabSection";
import Team from "../Components/about/Team";
import TestimonialSection from "../Components/about/TestimonialSection";
import ContactSection from "../Components/about/ContactSection";
import Aos from "aos";
import "aos/dist/aos.css";
export default function About() {
  const [tab, setTab] = useState<"story" | "vision" | "values">("story");

  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  }, []);
  return (
    <main
      className="flex flex-col gap-24 px-4 md:px-16 py-14 bg-gradient-to-r from-purple-50 to-purple-100 text-gray-800"
      data-aos="fade-up"
    >
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-700">
          من نحن
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          نحن أكثر من متجر كتب، نحن مجتمع يربط القارئ بالمعرفة والتجربة.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
        <Stat icon="book" value={500} label="كتاب متوفر" />
        <Stat icon="users" value={1200} label="عميل سعيد" />
        <Stat icon="globe" value={30} label="دولة شحن" />
        <Stat icon="book" value={50} label="فئة متنوعة" />
      </section>

      <TabSection tab={tab} setTab={setTab} />

      <Team images={[team1, team2, team3, team4]} />

      <TestimonialSection />

      <ContactSection />

      <footer className="text-center text-gray-500">
        &copy; {new Date().getFullYear()} متجر الكتب
      </footer>
    </main>
  );
}
