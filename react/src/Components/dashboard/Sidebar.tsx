import { FaBlog, FaBook, FaCartShopping, FaLifeRing, FaPlus, FaStar, FaUser, FaUsers } from "react-icons/fa6";
import type { SidebarProps } from "../../types/book";
import { FaCalendarAlt, FaCogs, FaHome, FaInfoCircle, FaSmile } from "react-icons/fa";

export default function Sidebar({
  setActiveTab,
  openModal,
  setSidebarOpen,
  activeTab,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col h-full">
      <div className="p-6 border-b border-gray-200">
        <span className="text-xl font-semibold">لوحة التحكم</span>
      </div>
      <nav className="flex-1 p-4 space-y-3">
        {[
          "home",
          "mybooks",
          "books",
          "create",
          "about",
          "blog",
          "support",
          "cart",
          "services",
          "events",
          "mod",
          "follow",
          "reviews",
          "users",
        ].map((tab) => {
          const labels = {
           home: (
              <span className="flex items-center gap-2">
                <FaHome /> الرئيسية
              </span>
            ),
            mybooks: (
              <span className="flex items-center gap-2">
                <FaBook /> كتبي
              </span>
            ),
            books: (
              <span className="flex items-center gap-2">
                <FaBook /> كتب
              </span>
            ),
            create: (
              <span className="flex items-center gap-2">
                <FaPlus /> إنشاء كتاب
              </span>
            ),
            about: (
              <span className="flex items-center gap-2">
                <FaInfoCircle /> معلومات عنا
              </span>
            ),
            blog: (
              <span className="flex items-center gap-2">
                <FaBlog /> مدونتنا
              </span>
            ),
            support: (
              <span className="flex items-center gap-2">
                <FaLifeRing /> مساعدة
              </span>
            ),
            services: (
              <span className="flex items-center gap-2">
                <FaCogs/> خدماتنا
              </span>
            ),
            events: (
              <span className="flex items-center gap-2">
                <FaCalendarAlt /> الفعاليات والأنشطة
              </span>
            ),
            mod: (
              <span className="flex items-center gap-2">
                <FaSmile /> مزاجك القرائي
              </span>
            ),
            follow: (
              <span className="flex items-center gap-2">
                <FaUsers /> تابعنا
              </span>
            ),
            reviews: (
              <span className="flex items-center gap-2">
                <FaStar /> مراجعة عملائنا
              </span>
            ),
            users: (
              <span className="flex items-center gap-2">
                <FaUser /> المستخدمين
              </span>
            ),
            cart: (
              <span className="flex items-center gap-2">
                <FaCartShopping /> سلة التسوق
              </span>
            ),
          };
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab as any);
                if (tab === "create") openModal();
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-2 w-full rounded-lg transition ${
                activeTab === tab
                  ? "bg-purple-100 text-purple-600 font-semibold"
                  : "hover:bg-purple-50"
              }`}
            >
              {labels[tab as keyof typeof labels]}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
