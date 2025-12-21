import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";

export default function EventCard({ event, onSelect }: any) {
  return (
    <div
      onClick={() => onSelect(event)}
      className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition cursor-pointer hover:scale-[1.02]"
    >
      <h3 className="text-xl font-semibold mb-4">{event.title}</h3>

      <div className="space-y-2 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <FaCalendarAlt /> {event.date}
        </p>
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt /> {event.location}
        </p>
        <p className="flex items-center gap-2">
          <FaTicketAlt /> {event.price === 0 ? "مجاني" : `$${event.price}`}
        </p>
      </div>

      <button className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
        عرض التفاصيل
      </button>
    </div>
  );
}
