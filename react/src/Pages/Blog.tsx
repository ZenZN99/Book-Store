import { useState, useMemo, useEffect } from "react";
import SubscribeSection from "../Components/SubscribeSection";
import { articles } from "../data/articles";
import type { Article } from "../types/Article";
import CategoryFilter from "../Components/blog/CategoryFilter";
import ArticleCard from "../Components/blog/ArticleCard";
import ArticleModal from "../Components/blog/ArticleModal";
import Aos from "aos";
import "aos/dist/aos.css";
const CATEGORIES = ["الكل", "تطوير الذات", "نصائح قراءة", "روايات", "تقنية"];

export default function Blog() {
  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  }, []);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchCategory = category === "الكل" || a.category === category;
      const matchSearch =
        a.title.includes(search) || a.summary.includes(search);
      return matchCategory && matchSearch;
    });
  }, [search, category]);

  return (
    <main
      className="px-4 md:px-16 py-10 bg-gray-50 text-gray-800"
      data-aos="fade-up"
    >
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
          مدونتنا
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          مقالات، نصائح، ومراجعات لعشّاق الكتب والمعرفة.
        </p>
      </section>

      <SearchBar search={search} setSearch={setSearch} />

      <CategoryFilter
        categories={CATEGORIES}
        selected={category}
        onSelect={setCategory}
      />

      <section className="max-w-6xl mx-auto mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onOpen={() => setSelectedArticle(article)}
            />
          ))}
        </div>
      </section>

      <SubscribeSection />

      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </main>
  );
}

function SearchBar({ search, setSearch }: any) {
  return (
    <div className="max-w-4xl mx-auto mb-10 bg-white p-4 rounded-xl shadow flex items-center gap-3">
      <input
        className="flex-1 outline-none"
        placeholder="ابحث عن مقال..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
