import image from "../assets/img.webp";
import { FaBookOpen, FaLock, FaRocket, FaUsers } from "react-icons/fa";
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';
const AboutComponent = () => {
   useEffect(() => {
      Aos.init({
        duration: 800,
      });
    },[]);
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-purple-50 py-20" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <div className="text-right space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            من نحن؟
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            نحن منصة رقمية تهدف إلى ربط القرّاء والبائعين في مكان واحد، حيث
            يمكنك استكشاف أحدث الكتب، بيع كتبك بسهولة، وبناء مجتمع حقيقي يعشق
            المعرفة والقراءة.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            نؤمن بأن الكتاب هو المفتاح الأول للتعلّم والتطور، ولذلك نسعى لتقديم
            تجربة استخدام بسيطة، آمنة، وممتعة لكل مستخدم.
          </p>

          {/* نقاط القوة */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                <FaBookOpen />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">تنوّع الكتب</h4>
                <p className="text-sm text-gray-600">
                  آلاف الكتب في مختلف المجالات والتخصصات.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                <FaLock />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">أمان وثقة</h4>
                <p className="text-sm text-gray-600">
                  معاملات آمنة وحماية كاملة لبيانات المستخدمين.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                <FaRocket />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">تجربة سهلة</h4>
                <p className="text-sm text-gray-600">
                  واجهة بسيطة تتيح لك البيع والشراء بخطوات قليلة.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                <FaUsers />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">مجتمع قرّاء</h4>
                <p className="text-sm text-gray-600">
                  تواصل مع قرّاء وبائعين يشاركونك نفس الشغف.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* الصورة */}
        <div className="relative">
          <img
            src={image}
            alt="About us"
            className="w-full rounded-3xl shadow-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutComponent;
