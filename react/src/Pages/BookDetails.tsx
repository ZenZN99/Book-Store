import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { IBook } from "../types/book";
import { getBookById } from "../api/book/request";
import NavbarComponent from "../Components/Navbar";
import { FaShoppingCart } from "react-icons/fa";
import { useUserStore } from "../libs/useUserStore";
import { useCartStore } from "../libs/useCartStore";
import Aos from "aos";
import "aos/dist/aos.css";
export default function BookDetails() {
  const { bookId } = useParams();
  const { user } = useUserStore();
  const { items, addToCart } = useCartStore();
  const cartIds = items.map((item) => item.bookId);
  const [book, setBook] = useState<IBook | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }
  }, []);

  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  }, []);

  useEffect(() => {
    const fetchBookById = async () => {
      try {
        setLoading(true);
        const data = await getBookById(bookId as string);
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    if (bookId) fetchBookById();
  }, [bookId]);

  const handleAddToCart = async () => {
    if (!token || !book) return;
    addToCart(book._id, token);
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">جاري تحميل الكتاب...</p>
      </section>
    );
  }

  if (!book) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-lg">الكتاب غير موجود</p>
      </section>
    );
  }

  const isOwner = user?._id === book.userId;

  return (
    <div className="min-h-screen bg-gray-50" data-aos="fade-up">
      <NavbarComponent />

      <div className="pt-28 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-gray-100 h-[420px] lg:h-[620px] flex items-center justify-center">
              <img
                src={book.image as any}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-10 flex flex-col justify-between">
              <div className="space-y-5">
                <span className="inline-block bg-emerald-100 text-emerald-600 px-4 py-1 rounded-full text-sm font-medium">
                  {book.category}
                </span>

                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  {book.title}
                </h1>

                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {book.description}
                </p>
              </div>

              <div className="mt-8 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-emerald-600">
                    ${book.price}
                  </span>

                  <span className="text-sm text-gray-500">
                    المخزون: {book.stock}
                  </span>
                </div>

                {!isOwner && (
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition 
    ${
      cartIds.includes(book._id)
        ? "bg-gray-400 text-white cursor-not-allowed pointer-events-none"
        : "bg-emerald-600 hover:bg-emerald-700 text-white"
    }`}
                  >
                    <FaShoppingCart />
                    {cartIds.includes(book._id)
                      ? "تم الإضافة"
                      : "إضافة إلى السلة"}
                  </button>
                )}

                {isOwner && (
                  <p className="text-sm text-gray-400 text-center sm:text-left">
                    هذا الكتاب من إنشائك
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
