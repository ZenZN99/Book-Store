import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/user/request";
import toast from "react-hot-toast";
import Aos from "aos";
import 'aos/dist/aos.css';
export default function SignIn() {
   useEffect(() => {
     Aos.init({
       duration: 800,
     });
   }, []);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
      const data = await login(email, password);
      if (data?.message) {
        setErrorMessage(extractMessage(data.message));
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setEmail("");
        setPassword("");
        toast.success(`مرحباً ${data.user.fullname}`);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ اثناء حاول لاحقاً");
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
    <div className="flex items-center justify-center flex-col min-h-screen bg-gradient-to-r from-gray-200 to-[#c9d6ff] font-montserrat px-4" data-aos="fade-up">
      
      <div className="relative w-full max-w-3xl min-h-[480px] bg-white rounded-[30px] shadow-lg overflow-hidden flex flex-col md:flex-row">
         <div className="w-full md:w-1/2 h-64 md:h-auto bg-gradient-to-r from-[#5c6bc0] to-purple-700 text-white flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-2">مرحبأ بك عزيزي العميل</h1>
            <p className="mb-5 text-sm">
              قم ب تسجيل دخولك لتستعيد حسابك وتنطلق في تسويق كتبك
            </p>
            <Link
              to="/signup"
              className="px-12 py-2 border border-white rounded-lg bg-transparent transition-all duration-300 hover:bg-white hover:text-purple-600"
            >
              انشاء حساب
            </Link>
          </div>
        </div>
        {/* Form Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <h1 className="text-2xl font-semibold text-center mb-4">تسجيل الدخول</h1>

            {errorMessage && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center font-medium animate-pulse">
                {errorMessage}
              </div>
            )}

            <input
              type="email"
              placeholder="البريد الالكتروني"
              className="w-full px-4 py-2 rounded-lg bg-gray-200 mb-3 outline-none border border-purple-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="كلمة المرور"
              className="w-full px-4 py-2 rounded-lg bg-gray-200 mb-3 outline-none border border-purple-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              {loading ? "جاري التسجيل..." : "تسجيل الدخول"}
            </button>

            <p className="text-xs text-center">
              ليس لديك حساب؟{" "}
              <Link to="/signup" className="font-bold text-blue-500">
                انشاء حساب
              </Link>
            </p>
          </form>
        </div>

      
      </div>
    </div>
  );
}
