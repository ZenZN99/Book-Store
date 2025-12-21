import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { getBookById } from "../api/book/request";
import type { IBook } from "../types/book";
import { useCartStore } from "../libs/useCartStore";
import Aos from "aos";
import "aos/dist/aos.css";
export default function CartPage() {
  const token = localStorage.getItem("token") as string;
  const navigate = useNavigate();

  const { items, fetchCart, removeItem, changeQuantity, loading } =
    useCartStore();

  const [books, setBooks] = useState<Record<string, IBook>>({});

  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }
  }, []);

  useEffect(() => {
    if (token) fetchCart(token);
  }, [token]);

  useEffect(() => {
    const loadBooks = async () => {
      const data: Record<string, IBook> = {};
      for (const item of items) {
        data[item.bookId] = await getBookById(item.bookId);
      }
      setBooks(data);
    };

    if (items.length) loadBooks();
  }, [items]);

  const totalPrice = items.reduce((acc, item) => {
    const book = books[item.bookId];
    if (!book) return acc;
    return acc + Number(book.price) * item.quantity;
  }, 0);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        جاري تحميل السلة...
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" data-aos="fade-up">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Items List */}
        <div className="flex-1 space-y-6">
          {items.length === 0 ? (
            <div className="bg-white p-6 rounded-md text-center">
              <p>سلة التسوق فارغة</p>
            </div>
          ) : (
            items.map((item) => {
              const book = books[item.bookId];
              if (!book) return null;

              return (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row bg-white p-4 rounded-md shadow gap-4 sm:gap-6"
                >
                  <img
                    src={book.image as any}
                    className="w-full sm:w-32 h-40 object-cover rounded-md"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="font-semibold text-lg">{book.title}</h2>
                      <p className="mt-1 text-gray-600">${book.price}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() =>
                          changeQuantity(item.bookId, item.quantity - 1, token)
                        }
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          changeQuantity(item.bookId, item.quantity + 1, token)
                        }
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeItem(item.bookId, token)}
                        className="text-red-500 ml-4"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar / Summary */}
        <div className="w-full lg:w-80 bg-white p-6 rounded-md shadow flex flex-col gap-4">
          <img src={logo} className="w-32 mx-auto" />
          <p className="text-lg">
            الإجمالي:
            <span className="font-bold ml-2">${totalPrice.toFixed(2)}</span>
          </p>

          {items.length > 0 && (
            <button
              onClick={() => navigate("/buying")}
              className="bg-yellow-400 py-2 rounded-full hover:bg-yellow-500 transition"
            >
              الشراء الآن
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
