import { FaStar, FaPlus } from "react-icons/fa";

export default function ReviewFilter({ filter, setFilter, openModal }: any) {
  return (
    <section className="max-w-6xl mx-auto py-10 px-6 flex flex-wrap gap-4 justify-center">
      <button
        onClick={() => setFilter(null)}
        className={`px-5 py-2 rounded-full ${
          filter === null ? "bg-purple-600 text-white" : "bg-white shadow"
        }`}
      >
        الكل
      </button>

      {[5, 4, 3, 2, 1].map((r) => (
        <button
          key={r}
          onClick={() => setFilter(r)}
          className={`px-5 py-2 rounded-full flex items-center gap-2 ${
            filter === r ? "bg-purple-600 text-white" : "bg-white shadow"
          }`}
        >
          {r} <FaStar />
        </button>
      ))}

      <button
        onClick={openModal}
        className="ml-auto flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-full hover:scale-105 transition"
      >
        <FaPlus /> أضف مراجعتك
      </button>
    </section>
  );
}
