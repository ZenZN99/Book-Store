import { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import type { HomeTableProps } from "../../types/book";
import BookCardComponent from "../BookCard";
import CartPage from "../../Pages/Cart";
import { useUserStore } from "../../libs/useUserStore";
import About from "../../Pages/About";
import Blog from "../../Pages/Blog";
import Support from "../../Pages/Support";
import { rechargeBalance } from "../../api/transaction/request";
import toast from "react-hot-toast";
import type { IUser } from "../../types/user";
import Services from "../../Pages/Services";
import Events from "../../Pages/Events";
import ReadingMood from "../../Pages/ReadingMood";
import FollowUs from "../../Pages/FollowUs";
import ClientReview from "../../Pages/ClientReview";
import Scroll from "../Scroll";
import UsersPage from "../../Pages/Users";

export default function HomeTable({
  activeTab,
  userBooks,
  allBooks,
  openModal,
  handleDelete,
}: HomeTableProps) {
  const { user, setUser, loadUser } = useUserStore();
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadUser();
  }, []);

  const handleRecharge = async () => {
    if (amount <= 0) return toast.error("أدخل مبلغ صالح");

    try {
      const data = await rechargeBalance(token as string, amount);
      if (data?.success) {
        toast.success("تم شحن الرصيد بنجاح!");
        setUser({
          ...(user as IUser),
          balance: Number(user?.balance) + Number(amount),
        });
        await loadUser();

        setIsRechargeOpen(false);
        setAmount(0);
      } else {
        toast.error(data?.message || "حدث خطأ أثناء شحن الرصيد");
      }
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء شحن الرصيد");
    }
  };

  return (
    <main className="p-4 md:p-6 flex-1 overflow-y-auto">
      {activeTab === "home" && (
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold">إدارة الكتب</h2>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => openModal()}
                className="flex items-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
              >
                <IoAdd /> إنشاء كتاب
              </button>

              {/* عرض الرصيد مع تحويله دائمًا لرقم */}
              <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg font-medium shadow-md text-center min-w-[80px]">
                رصيدك: ${Number(user?.balance)}
              </div>

              <button
                onClick={() => setIsRechargeOpen(true)}
                className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
              >
                شحن رصيد <FaPlus />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <table className="min-w-[700px] w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="p-3 text-left">الغلاف</th>
                  <th className="p-3 text-left">العنوان</th>
                  <th className="p-3 text-left">الفئة</th>
                  <th className="p-3 text-left">السعر</th>
                  <th className="p-3 text-left">الكمية</th>
                  <th className="p-3 text-left">العمليات</th>
                </tr>
              </thead>

              <tbody>
                {userBooks.map((book) => (
                  <tr
                    key={book._id}
                    className="border-b last:border-b-0 hover:bg-purple-50 transition"
                  >
                    <td className="p-3">
                      <img
                        src={
                          typeof book.image === "string"
                            ? book.image
                            : "https://via.placeholder.com/60"
                        }
                        alt={book.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="p-3">{book.title}</td>
                    <td className="p-3">{book.category}</td>
                    <td className="p-3">${book.price}</td>
                    <td className="p-3">{book.stock}</td>
                    <td className="p-3 flex gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => openModal(book)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition"
                      >
                        تعديل
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(book._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isRechargeOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start sm:items-center z-50 px-4 overflow-y-auto">
              <div className="bg-white p-6 rounded-lg w-full max-w-sm mt-10 sm:mt-0">
                <Scroll />
                <h3 className="text-xl font-semibold mb-4">شحن الرصيد</h3>
                <input
                  type="number"
                  placeholder="أدخل المبلغ"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsRechargeOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleRecharge}
                    className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                  >
                    شحن
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {activeTab === "mybooks" && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {userBooks.map((book) => (
            <BookCardComponent key={book._id} book={book} />
          ))}
        </section>
      )}

      {activeTab === "books" && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allBooks.map((book) => (
            <BookCardComponent key={book._id} book={book} />
          ))}
        </section>
      )}

      {activeTab === "cart" && <CartPage />}
      {activeTab === "about" && <About />}
      {activeTab === "blog" && <Blog />}
      {activeTab === "support" && <Support />}
      {activeTab === "services" && <Services />}
      {activeTab === "events" && <Events />}
      {activeTab === "mod" && <ReadingMood />}
      {activeTab === "follow" && <FollowUs />}
      {activeTab === "reviews" && <ClientReview />}
      {activeTab === "users" && <UsersPage />}
    </main>
  );
}
