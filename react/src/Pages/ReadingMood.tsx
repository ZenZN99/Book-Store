import { useEffect, useState } from "react";
import { MOODS } from "../data/mods";
import Aos from "aos";
import "aos/dist/aos.css";
export default function ReadingMood() {
  const [selectedMood, setSelectedMood] = useState<any>(null);
  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  }, []);
  return (
    <main className="bg-gray-50 text-gray-800" data-aos="fade-up">
      <section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-36 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          اختر مزاجك القرائي
        </h1>
        <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90">
          اختر شعورك، ودعنا نرشّح لك ما يناسبك الآن.
        </p>
      </section>

      {selectedMood && (
        <section className="pt-24 px-6 max-w-4xl mx-auto text-center animate-fadeIn">
          <h2 className="text-4xl font-bold mb-6 text-purple-700">
            اقتراحات لمزاج: {selectedMood.title}
          </h2>

          <ul className="space-y-3 mb-10">
            {selectedMood.books.map((book: string, i: number) => (
              <li key={i} className="bg-white shadow rounded-lg py-3 px-4">
                📘 {book}
              </li>
            ))}
          </ul>

          <button
            onClick={() => setSelectedMood(null)}
            className="text-purple-600 font-semibold hover:underline"
          >
            تغيير المزاج
          </button>
        </section>
      )}

      <section className="max-w-7xl mx-auto py-24 px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-purple-700">
          كيف تشعر اليوم؟
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {MOODS.map((mood) => (
            <MoodCard
              key={mood.key}
              mood={mood}
              active={selectedMood?.key === mood.key}
              onClick={() => setSelectedMood(mood)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function MoodCard({ mood, active, onClick }: any) {
  const colorMap: any = {
    emerald: "border-emerald-500 text-emerald-500",
    blue: "border-blue-500 text-blue-500",
    red: "border-red-500 text-red-500",
    purple: "border-purple-500 text-purple-500",
    pink: "border-pink-500 text-pink-500",
    indigo: "border-indigo-500 text-indigo-500",
    yellow: "border-yellow-500 text-yellow-500",
    teal: "border-teal-500 text-teal-500",
  };

  return (
    <button
      onClick={onClick}
      className={`bg-white p-8 rounded-2xl shadow transition text-center border-t-4
        ${colorMap[mood.color]}
        ${active ? "scale-105 shadow-xl" : "hover:shadow-lg"}
      `}
    >
      <div className={`text-4xl mb-4 mx-auto ${colorMap[mood.color]}`}>
        {mood.icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{mood.title}</h3>
      <p className="text-gray-600 text-sm">{mood.desc}</p>
    </button>
  );
}
