import { FaBook, FaUsers, FaGlobe } from "react-icons/fa";
import Counter from "./Counter";

const ICONS: any = {
  book: <FaBook />,
  users: <FaUsers />,
  globe: <FaGlobe />,
};

export default function Stat({ icon, value, label }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <div className="text-4xl text-purple-600 mb-3 mx-auto">{ICONS[icon]}</div>
      <h2 className="text-2xl font-bold">
        <Counter value={value} />
      </h2>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}
