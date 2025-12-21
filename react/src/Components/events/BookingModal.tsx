import toast from "react-hot-toast";

export default function BookingModal({ event, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md animate-fadeIn">
        <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
        <p className="text-gray-600 mb-2">📍 {event.location}</p>
        <p className="text-gray-600 mb-2">📅 {event.date}</p>
        <p className="text-gray-600 mb-6">
          💳 {event.price === 0 ? "مجاني" : `$${event.price}`}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => {
              toast.success("تم الحجز بنجاح 🎉");
              onClose();
            }}
            className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
          >
            تأكيد الحجز
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
