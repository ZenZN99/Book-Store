import { FaUser, FaClock, FaTags } from "react-icons/fa";

export default function ArticleCard({ article, onOpen }: any) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden flex flex-col">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
        <p className="text-gray-600 mb-4 flex-1">{article.summary}</p>

        <div className="text-sm text-gray-500 space-y-1 mb-4">
          <span className="flex items-center gap-2">
            <FaUser /> {article.author}
          </span>
          <span className="flex items-center gap-2">
            <FaClock /> {article.date}
          </span>
          <span className="flex items-center gap-2">
            <FaTags /> {article.category}
          </span>
        </div>

        <button
          onClick={onOpen}
          className="mt-auto text-purple-600 font-semibold hover:underline"
        >
          اقرأ المزيد
        </button>
      </div>
    </div>
  );
}
