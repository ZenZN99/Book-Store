import article1 from "../assets/blog1.jpg";
import article2 from "../assets/blog2.jpg";
import article3 from "../assets/blog3.jpg";
import article4 from "../assets/blog4.avif";
import type { Article } from "../types/Article";

export const articles: Article[] = [
  {
    id: 1,
    title: "أفضل 10 كتب لتطوير الذات في 2025",
    summary:
      "اكتشف مجموعة من الكتب التي تساعدك على تحسين مهاراتك الشخصية والمهنية بشكل فعال.",
    image: article1,
    author: "أحمد علي",
    date: "20 ديسمبر 2025",
    category: "تطوير الذات",
  },
  {
    id: 2,
    title: "كيف تختار كتابك التالي",
    summary:
      "تعرف على الطرق المثلى لاختيار الكتب التي تناسب اهتماماتك وتطورك الشخصي.",
    image: article2,
    author: "سارة محمد",
    date: "18 ديسمبر 2025",
    category: "نصائح قراءة",
  },
  {
    id: 3,
    title: "أفضل الروايات العالمية",
    summary:
      "استكشف أشهر الروايات التي تركت بصمة في الأدب العالمي والتي يجب عليك قراءتها.",
    image: article3,
    author: "ليلى حسن",
    date: "15 ديسمبر 2025",
    category: "روايات",
  },
  {
    id: 4,
    title: "أفضل كتب التقنية للمبتدئين",
    summary:
      "دليل شامل لأفضل كتب تعلم البرمجة والتقنيات الحديثة بطريقة سهلة للمبتدئين.",
    image: article4,
    author: "محمد عبد الله",
    date: "10 ديسمبر 2025",
    category: "تقنية",
  },
];
