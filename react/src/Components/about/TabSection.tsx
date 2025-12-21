function TabButton({ children, active, ...props }: any) {
  return (
    <button
      {...props}
      className={`px-6 py-2 rounded-full font-semibold transition ${
        active
          ? "bg-purple-600 text-white"
          : "bg-white shadow hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

export default function TabSection({ tab, setTab }: any) {
  return (
    <section className="max-w-5xl mx-auto">
      <div className="flex justify-center gap-4 mb-10">
        <TabButton active={tab === "story"} onClick={() => setTab("story")}>
          قصتنا
        </TabButton>
        <TabButton active={tab === "vision"} onClick={() => setTab("vision")}>
          رؤيتنا
        </TabButton>
        <TabButton active={tab === "values"} onClick={() => setTab("values")}>
          قيمنا
        </TabButton>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow text-center text-lg leading-relaxed">
        {tab === "story" && (
          <p>
            بدأ متجرنا بفكرة بسيطة: جعل القراءة أسهل وأكثر متعة. اليوم نخدم آلاف
            القرّاء ونبني مجتمعًا ثقافيًا متكاملاً.
          </p>
        )}
        {tab === "vision" && (
          <p>
            نطمح أن نكون المنصة الأولى عربيًا للقراءة، تجمع بين التقنية،
            الثقافة، والتجربة الإنسانية.
          </p>
        )}
        {tab === "values" && (
          <p>
            نؤمن بالجودة، الشفافية، حب المعرفة، ودعم القارئ في كل مرحلة من
            رحلته.
          </p>
        )}
      </div>
    </section>
  );
}
