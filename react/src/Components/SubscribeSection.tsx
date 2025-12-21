export default function SubscribeSection() {
  return (
    <section className="bg-purple-600 text-white py-12 rounded-xl max-w-6xl mx-auto text-center px-6">
      <h2 className="text-3xl font-semibold mb-4">اشترك في نشرتنا البريدية</h2>
      <p className="mb-6">
        كن أول من يعرف بأحدث المقالات والعروض الخاصة بالكتب.
      </p>
      <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <input
          type="email"
          placeholder="أدخل بريدك الإلكتروني"
          className="px-4 py-2 rounded-lg text-gray-800 w-full sm:w-auto flex-1"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition"
        >
          اشترك
        </button>
      </form>
    </section>
  );
}
