export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: any) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-16">
      {categories.map((c: string) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={`px-5 py-2 rounded-full transition
            ${
              selected === c
                ? "bg-purple-600 text-white"
                : "bg-white shadow hover:bg-gray-100"
            }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
