export default function Stat({ icon, number, label }: any) {
  return (
    <div>
      <div className="text-4xl mb-4 mx-auto">{icon}</div>
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="opacity-90">{label}</div>
    </div>
  );
}
