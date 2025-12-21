import { FaStar } from "react-icons/fa";

function Testimonial({ name }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-center mb-4 text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>
      <p className="text-gray-600 mb-4">
        تجربة رائعة، تنوع كبير وسهولة في الاستخدام.
      </p>
      <h4 className="font-semibold">{name}</h4>
    </div>
  );
}

export default function TestimonialSection() {
  return (
    <section className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-semibold mb-10 text-purple-700">
        آراء القرّاء
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <Testimonial name="سارة" />
        <Testimonial name="محمد" />
        <Testimonial name="ليلى" />
      </div>
    </section>
  );
}
