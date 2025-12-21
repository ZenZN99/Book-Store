import { useEffect, useState } from "react";
import { FaUsers, FaBook, FaHeart } from "react-icons/fa";
import SubscribeSection from "../Components/SubscribeSection";
import SocialCard from "../Components/followus/SocialCard";
import Stat from "../Components/followus/Stat";
import { PLATFORMS } from "../data/platforms";
import Aos from "aos";
import "aos/dist/aos.css";
export default function FollowUs() {
  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  }, []);
  const [followed, setFollowed] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);

  const handleFollow = (key: string) => {
    if (followed.includes(key)) return;
    setFollowed((prev) => [...prev, key]);
    setActive(key);
  };

  return (
    <main className="bg-gray-50 text-gray-800" data-aos="fade-up">
      <section className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-36 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          تابعنا وكن جزءًا من مجتمع القرّاء
        </h1>
        <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90">
          اختر منصتك المفضلة وابدأ رحلتك معنا.
        </p>
      </section>

      <section className="max-w-7xl mx-auto py-24 px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-purple-700">
          منصاتنا الاجتماعية
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {PLATFORMS.map((p) => (
            <SocialCard
              key={p.key}
              platform={p}
              followed={followed.includes(p.key)}
              active={active === p.key}
              onFollow={() => handleFollow(p.key)}
            />
          ))}
        </div>
      </section>

      <section className="bg-purple-700 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <Stat
            icon={<FaUsers />}
            number={`${120 + followed.length}K+`}
            label="متابع"
          />
          <Stat icon={<FaBook />} number="30K+" label="كتاب تمت مناقشته" />
          <Stat icon={<FaHeart />} number="1M+" label="تفاعل شهري" />
        </div>
      </section>

      <section className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-32 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          {followed.length > 0 ? "أنت الآن جزء من المجتمع 💜" : "لا تقرأ وحدك"}
        </h2>
        <p className="text-xl mb-10">
          {followed.length > 0
            ? "استمر بالتفاعل واكتشاف محتوى جديد"
            : "انضم الآن وكن جزءًا من أكبر مجتمع قرّاء"}
        </p>
        <button className="bg-white text-emerald-700 px-12 py-4 rounded-full font-bold text-lg hover:scale-105 transition flex items-center gap-3 mx-auto">
          استكشف المحتوى
        </button>
      </section>

      <div className="my-8">
        <SubscribeSection />
      </div>
    </main>
  );
}
