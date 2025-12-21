import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/user/request";
import toast from "react-hot-toast";
import Aos from "aos";
import "aos/dist/aos.css";
export default function SignUp() {
  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  }, []);
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const extractMessage = (err: any) => {
    if (typeof err.message === "string") return err.message;
    if (typeof err.message === "object") return JSON.stringify(err.message);
    return "حدث خطأ";
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    try {
      const data = await register(fullname, email, password, confirmPassword);

      if (data?.message) {
        setErrorMessage(extractMessage(data.message));
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setFullname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        toast.success(`مرحباً ${data.user.fullname}`);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء المحاولة لاحقاً");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (errorMessage) {
      const timout = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timout);
    }
  }, [errorMessage]);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-[#c9d6ff] font-montserrat px-4"
      data-aos="fade-up"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-[30px] shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-gradient-to-r from-[#5c6bc0] to-purple-700 text-white flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-2">
              مرحباً بك عزيزي العميل
            </h1>
            <p className="mb-5 text-sm">
              قم بإنشاء حسابك وانضم إلى آلاف المستخدمين يشاركونك نفس الطموح!
            </p>
            <Link
              to="/signin"
              className="px-12 py-2 border border-white rounded-lg bg-transparent transition-all duration-300 hover:bg-white hover:text-purple-600"
            >
              تسجيل الدخول
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <h1 className="text-2xl font-semibold text-center mb-6">
              إنشاء حساب
            </h1>

            {errorMessage && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center font-medium animate-pulse">
                {errorMessage}
              </div>
            )}

            <input
              type="text"
              placeholder="الاسم الكامل"
              className="w-full px-4 py-2 rounded-lg bg-gray-200 mb-3 outline-none border border-purple-600"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className="w-full px-4 py-2 rounded-lg bg-gray-200 mb-3 outline-none border border-purple-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="كلمة المرور"
              className="w-full px-4 py-2 rounded-lg bg-gray-200 mb-3 outline-none border border-purple-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="تأكيد كلمة المرور"
              className="w-full px-4 py-2 rounded-lg bg-gray-200 mb-3 outline-none border border-purple-600"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`mt-2 px-12 py-2 mb-4 font-semibold rounded-lg w-full transition-all duration-300 ${
                loading
                  ? "bg-purple-300 text-white"
                  : "bg-purple-500 text-white hover:bg-purple-600 hover:scale-105"
              }`}
            >
              {loading ? "جاري التسجيل..." : "إنشاء حساب"}
            </button>

            <p className="text-xs text-center">
              هل لديك حساب؟{" "}
              <Link to="/signin" className="text-blue-500 font-bold">
                تسجيل الدخول
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
