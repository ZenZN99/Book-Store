import { FaStar } from "react-icons/fa";

export default function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <FaStar
          key={s}
          className={rating >= s ? "text-yellow-400" : "text-gray-400"}
        />
      ))}
    </div>
  );
}
