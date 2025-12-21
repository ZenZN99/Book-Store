import { FaStar } from "react-icons/fa";

export default function AddReviewModal({
  rating,
  setRating,
  comment,
  setComment,
  onClose,
  onAdd,
}: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold mb-4">أضف مراجعتك</h3>

        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <FaStar
              key={s}
              className={`cursor-pointer ${
                rating >= s ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(s)}
            />
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="اكتب رأيك هنا..."
        />

        <div className="flex gap-3">
          <button
            onClick={onAdd}
            className="flex-1 bg-purple-600 text-white py-2 rounded-lg"
          >
            نشر
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 py-2 rounded-lg"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
