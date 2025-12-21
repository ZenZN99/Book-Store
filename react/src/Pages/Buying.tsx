import { useEffect, useState } from "react";
import NavbarComponent from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../libs/useCartStore";
import { getBookById } from "../api/book/request";
import type { IBook } from "../types/book";
import toast from "react-hot-toast";
import { deleteAllCartItems } from "../api/cart/request";
import { transferBalance } from "../api/transaction/request";
import { useUserStore } from "../libs/useUserStore";
import Aos from "aos";
import "aos/dist/aos.css";
export default function BuyingPage() {
  const token = localStorage.getItem("token") as string;
  const navigate = useNavigate();
  const { items, fetchCart, removeItem, loading } = useCartStore();
  const { user, setUser } = useUserStore();
  const [books, setBooks] = useState<Record<string, IBook>>({});

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

  const handlePayment = async () => {
    if (items.length === 0) return toast.error("سلة التسوق فارغة!");
    if (!user) return toast.error("المستخدم غير موجود");

    const payments: Record<string, number> = {};

    for (const item of items) {
      const book = books[item.bookId];
      if (!book) continue;

      const amount = Number(book.price) * item.quantity;
      if (!payments[book.userId]) payments[book.userId] = 0;
      payments[book.userId] += amount;
    }

    const totalPrice = Object.values(payments).reduce(
      (acc, val) => acc + val,
      0
    );

    if (user.balance < totalPrice) return toast.error("الرصيد غير كافي!");

    try {
      for (const [receiverId, amount] of Object.entries(payments)) {
        if (!receiverId.match(/^[0-9a-fA-F]{24}$/)) {
          console.error("ownerId غير صالح:", receiverId);
          continue;
        }

        const data = await transferBalance(token, receiverId);
        if (!data?.success) {
          throw new Error(data?.message || "حدث خطأ أثناء التحويل");
        }
      }

      await deleteAllCartItems(token);
      items.forEach((item) => removeItem(item.bookId, token));

      setUser({ ...user, balance: Number(user.balance) - totalPrice });

      toast.success("تم الدفع بنجاح!");
      navigate("/");
    } catch (error: any) {
      console.error(error);
      toast.error("حدث خطأ أثناء الدفع");
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        جاري تحميل السلة...
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" data-aos="fade-up">
      <NavbarComponent />

      <div className="pt-28 px-4 max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-semibold mb-4">ملخص السلة</h2>
          {items.length === 0 ? (
            <div className="bg-white p-6 rounded-md">سلة التسوق فارغة</div>
          ) : (
            items.map((item) => {
              const book = books[item.bookId];
              if (!book) return null;

              return (
                <div
                  key={item._id}
                  className="flex bg-white p-4 rounded-md shadow"
                >
                  <img
                    src={book.image as any}
                    className="w-32 h-40 object-cover"
                  />
                  <div className="mr-8 flex-1">
                    <h3 className="font-semibold">{book.title}</h3>
                    <p>السعر: ${book.price}</p>
                    <p>الكمية: {item.quantity}</p>
                    <p>
                      الإجمالي: $
                      {(Number(book.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* نموذج الدفع */}
        <div className="w-full md:w-80 bg-white p-6 rounded-md shadow flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-center">الدفع</h2>
          <div className="text-lg font-semibold text-center">
            الإجمالي النهائي: ${totalPrice.toFixed(2)}
          </div>
          <button
            onClick={handlePayment}
            className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
          >
            تأكيد الدفع
          </button>
        </div>
      </div>
    </div>
  );
}
