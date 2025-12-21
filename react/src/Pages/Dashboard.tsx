import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getBookUser,
  createBook,
  updateBook,
  deleteBook,
  getAllBooks,
} from "../api/book/request";
import type { IBook } from "../types/book";
import Sidebar from "../Components/dashboard/Sidebar";
import Header from "../Components/dashboard/Header";
import HomeTable from "../Components/dashboard/HomeTable";
import FormModal from "../Components/dashboard/FormModal";
import { useUserStore } from "../libs/useUserStore";
import type { ActiveTab } from "../types/ActiveTab";
import Aos from "aos";
import "aos/dist/aos.css";

const Dashboard = () => {
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userBooks, setUserBooks] = useState<IBook[]>([]);
  const [allBooks, setAllBooks] = useState<IBook[]>([]);
  const [editingBook, setEditingBook] = useState<IBook | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null as File | null,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/signin");
    else if (activeTab === "home" || activeTab === "mybooks") fetchUserBooks();
  }, [activeTab]);

  const fetchUserBooks = async () => {
    setLoading(true);
    try {
      const data = await getBookUser(token as string);
      if (data) setUserBooks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllBooks = async () => {
    setLoading(true);
    try {
      const data = await getAllBooks();
      setAllBooks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const openModal = (book: IBook | null = null) => {
    setEditingBook(book);
    if (book) {
      setFormData({
        title: book.title,
        description: book.description,
        price: book.price,
        stock: book.stock,
        category: book.category,
        image: null,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: null,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingBook) {
        const data = await updateBook(
          formData.title,
          formData.description,
          formData.price,
          formData.stock,
          formData.category,
          editingBook._id,
          token as string
        );
        if (data.message || data.error)
          return toast.error(data.message || data.error);
        toast.success("تم تعديل الكتاب بنجاح!");
      } else {
        if (!formData.image) return toast.error("يرجى إضافة صورة الغلاف");
        const data = await createBook(
          formData.title,
          formData.description,
          formData.price,
          formData.stock,
          formData.category,
          formData.image,
          token as string
        );
        if (data.message) return toast.error(data.message);
        toast.success("تم إنشاء الكتاب بنجاح!");
      }
      setModalOpen(false);
      setEditingBook(null);
      await fetchUserBooks();
      await fetchAllBooks();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الكتاب؟")) return;
    setLoading(true);
    try {
      const data = await deleteBook(bookId, token as string);
      if (data.message) return toast.error(data.message);
      toast.success("تم حذف الكتاب!");
      await fetchUserBooks();
      await fetchAllBooks();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const sidebar = (
    <Sidebar
      setActiveTab={setActiveTab}
      openModal={openModal}
      setSidebarOpen={setSidebarOpen}
      activeTab={activeTab}
    />
  );

  return (
    <div className="flex min-h-screen bg-gray-100" data-aos="fade-up">
      {/* Sidebar */}
      <div className="hidden md:flex">{sidebar}</div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-64 bg-white shadow-lg">{sidebar}</div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col relative">
        <Header
          setSidebarOpen={setSidebarOpen}
          setDropdownOpen={setDropdownOpen}
          dropdownOpen={dropdownOpen}
          user={user}
          handleLogout={handleLogout}
        />

        {/* Loader */}
        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
            <div className="border-4 border-purple-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
          </div>
        )}

        <HomeTable
          activeTab={activeTab}
          userBooks={userBooks}
          allBooks={allBooks}
          openModal={openModal}
          handleDelete={handleDelete}
        />
      </div>

      {modalOpen && (
        <FormModal
          editingBook={editingBook}
          formData={formData}
          setFormData={setFormData}
          setModalOpen={setModalOpen}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Dashboard;
