import { FaFacebookF, FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";

function FooterComponent() {
  return (
    <footer className="bg-purple-700 text-white pt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">
          <div>
            <h3 className="text-2xl font-extrabold mb-4">Book Store</h3>
            <p className="text-purple-100 leading-relaxed text-sm">
              متجر إلكتروني متخصص في بيع وشراء الكتب، يربط بين القرّاء والبائعين
              في مكان واحد، ويوفّر تجربة سهلة، آمنة، وسلسة لاكتشاف الكتب وبيعها
              بكل احترافية.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-purple-100 text-sm">
              <li className="hover:text-white transition cursor-pointer">
                الرئيسية
              </li>
              <li className="hover:text-white transition cursor-pointer">
                من نحن
              </li>
              <li className="hover:text-white transition cursor-pointer">
                الكتب
              </li>
              <li className="hover:text-white transition cursor-pointer">
                تواصل معنا
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">تابعنا</h4>
            <div className="flex gap-4 text-xl">
              <a href="https://www.facebook.com/profile.php?id=61579430121762" target="_blank" className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-500 transition cursor-pointer">
                <FaFacebookF />
              </a>
              <a href="https://www.linkedin.com/in/zen-allaham-789907370/" target="_blank" className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-500 transition cursor-pointer">
                <FaLinkedin />
              </a>
              <a href="https://github.com/ZenZN99" target="_blank" className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-500 transition cursor-pointer">
                <FaGithub />
              </a>
              <a href="https://wa.me/905546726683" target="_blank" className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-500 transition cursor-pointer">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-500 py-6 text-center text-purple-200 text-sm">
          © {new Date().getFullYear()} Book Store — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
