import { FaUserCircle, FaHeart } from "react-icons/fa";
import Stars from "./Stars";

export default function ReviewCard({ review, onLike }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
      <div className="flex items-center gap-3 mb-4">
        <FaUserCircle className="text-4xl text-purple-600" />
        <div>
          <h4 className="font-semibold">{review.name}</h4>
          <Stars rating={review.rating} />
        </div>
      </div>

      <p className="text-gray-600 mb-6">{review.comment}</p>

      <button onClick={onLike} className="flex items-center gap-2 text-red-500">
        <FaHeart /> {review.likes}
      </button>
    </div>
  );
}
