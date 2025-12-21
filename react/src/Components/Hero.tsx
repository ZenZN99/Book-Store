import { Link } from "react-router-dom";
import image from "../assets/hero.avif";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const HeroComponent = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  }, []);
  return (
    <div
      className="bg-[#8928e4] pt-24 px-6 sm:px-12 md:px-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16"
      data-aos="fade-up"
    >
      <div className="text-center md:text-right space-y-4 md:space-y-6 flex-1">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
          استكشف أحدث الكتب
        </h2>

        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#ddd] font-semibold">
          سجّل الآن وابدأ ببيع وشراء الكتب بسهولة
        </h3>

        <p className="text-gray-100 text-sm sm:text-base md:text-lg leading-relaxed max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto md:mx-0">
          منصة متكاملة لعشّاق القراءة، تتيح لك استكشاف الكتب، بيع كتبك
          المستعملة، والوصول إلى قرّاء من جميع أنحاء العالم.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6  justify-center md:justify-start mt-4">
          <Link
            to="/signin"
            className="px-6 sm:px-8 py-2 sm:py-3 rounded-xl bg-white text-purple-500 border-2 border-white font-bold hover:text-white hover:bg-purple-700 transition"
          >
            ابدأ الآن
          </Link>

          <Link
            to="/signin"
            className="px-6 sm:px-8 py-2 sm:py-3 rounded-xl border-2 border-white text-white font-bold hover:bg-purple-50 hover:text-purple-600 transition"
          >
            تصفح الكتب
          </Link>
        </div>
      </div>

      <div className="flex-1 flex justify-center md:justify-end">
        <img
          src={image}
          alt="img"
          className="w-3/4 sm:w-2/3 md:w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[560px] xl:max-w-[640px]"
        />
      </div>
    </div>
  );
};

export default HeroComponent;
