export default function Team({ images }: any) {
  return (
    <section className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-semibold mb-10 text-purple-700">فريقنا</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
        {images.map((img: string, idx: number) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow hover:-translate-y-2 transition overflow-hidden"
          >
            <img src={img} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="font-bold">عضو الفريق {idx + 1}</h3>
              <p className="text-gray-500 text-sm">مطور / مصمم</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
