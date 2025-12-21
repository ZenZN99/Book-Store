export default function EventType({ icon, title }: any) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow text-center hover:shadow-xl transition">
      <div className="text-4xl text-purple-600 mb-4 mx-auto">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
  );
}
