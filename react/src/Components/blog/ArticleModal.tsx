import { FaTimes, FaUser, FaClock, FaTags } from "react-icons/fa";

export default function ArticleModal({ article, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white max-w-2xl w-full rounded-2xl overflow-hidden animate-fadeIn">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{article.title}</h2>
            <button onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <p className="text-gray-600 mb-4">{article.summary}</p>

          <div className="text-sm text-gray-500 flex gap-6">
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
        </div>
      </div>
    </div>
  );
}
