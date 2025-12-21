import { useEffect, useState } from "react";
import { FaCalendarAlt, FaUsers, FaMicrophone, FaVideo } from "react-icons/fa";
import EventType from "../Components/events/EventType";
import { EVENTS } from "../data/events";
import EventCard from "../Components/events/EventCard";
import BookingModal from "../Components/events/BookingModal";
import Aos from "aos";
import "aos/dist/aos.css";
export default function Events() {
  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  }, []);
  const [filter, setFilter] = useState<"all" | "online" | "free">("all");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const filteredEvents = EVENTS.filter((event) => {
    if (filter === "online") return event.type === "online";
    if (filter === "free") return event.price === 0;
    return true;
  });

  return (
    <main className="bg-gray-50 text-gray-800" data-aos="fade-up">
      <section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-36 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          الفعاليات والأنشطة
        </h1>
        <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90">
          مؤتمرات، لقاءات كتّاب، ورش قراءة وبث مباشر لعشّاق الكتب.
        </p>
      </section>

      <section className="max-w-7xl mx-auto py-24 px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-purple-700">
          أنواع الفعاليات
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <EventType icon={<FaMicrophone />} title="لقاءات كتّاب" />
          <EventType icon={<FaVideo />} title="بث مباشر" />
          <EventType icon={<FaUsers />} title="ورش قراءة" />
          <EventType icon={<FaCalendarAlt />} title="مؤتمرات كتب" />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 flex justify-center gap-4 mb-16">
        {[
          { key: "all", label: "الكل" },
          { key: "online", label: "أونلاين" },
          { key: "free", label: "مجاني" },
        ].map((btn) => (
          <button
            key={btn.key}
            onClick={() => setFilter(btn.key as any)}
            className={`px-6 py-2 rounded-full font-medium transition
              ${
                filter === btn.key
                  ? "bg-purple-600 text-white"
                  : "bg-white shadow hover:bg-gray-100"
              }`}
          >
            {btn.label}
          </button>
        ))}
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onSelect={setSelectedEvent}
            />
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-32 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          لا تفوّت التجربة
        </h2>
        <p className="text-xl mb-10">احجز مقعدك وكن جزءًا من مجتمع القرّاء</p>
        <button className="bg-white text-emerald-700 px-12 py-4 rounded-full font-bold text-lg hover:scale-105 transition">
          استكشف الفعاليات
        </button>
      </section>

      {selectedEvent && (
        <BookingModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </main>
  );
}
