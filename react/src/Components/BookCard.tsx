import { useNavigate } from "react-router-dom";
import type { IBookCardProps } from "../types/book";

const BookCardComponent: React.FC<IBookCardProps> = ({ book }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/book/${book._id}`)}
      key={book._id}
      className="bg-white w-[230px] cursor-pointer shadow hover:shadow-xl transition overflow-hidden group"
    >
      {/* IMAGE */}
      <div className="h-48 sm:h-56 overflow-hidden w-[230px]">
        <img
          src={book.image as any}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">
        <h3 className="font-bold text-gray-800 text-base line-clamp-2">
          {book.title}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-emerald-600 font-bold bg-emerald-100 px-3 py-1 rounded-lg text-sm">
            ${book.price}
          </span>

          <span className="text-xs text-gray-400">المتوفر: {book.stock}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCardComponent;
