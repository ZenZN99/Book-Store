import { FaCheck } from "react-icons/fa";

export default function SocialCard({
  platform,
  followed,
  active,
  onFollow,
}: any) {
  const colorMap: any = {
    pink: "text-pink-500",
    blue: "text-blue-600",
    sky: "text-sky-500",
    red: "text-red-600",
    emerald: "text-emerald-600",
    indigo: "text-indigo-600",
  };

  return (
    <div
      className={`bg-white p-8 rounded-2xl shadow transition text-center
        ${active ? "ring-4 ring-purple-500 scale-105" : "hover:shadow-xl"}`}
    >
      <div className={`text-4xl mb-4 mx-auto ${colorMap[platform.color]}`}>
        {platform.icon}
      </div>

      <h3 className="text-xl font-semibold mb-1">{platform.title}</h3>
      <p className="text-sm text-gray-500 mb-2">
        {platform.followers + (followed ? 1 : 0)} متابع
      </p>

      <p className="text-gray-600 text-sm mb-6">{platform.desc}</p>

      <button
        onClick={onFollow}
        disabled={followed}
        className={`w-full py-2 rounded-lg font-semibold transition
          ${
            followed
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
      >
        {followed ? (
          <span className="flex items-center justify-center gap-2">
            <FaCheck /> Following
          </span>
        ) : (
          "تابعنا"
        )}
      </button>
    </div>
  );
}
