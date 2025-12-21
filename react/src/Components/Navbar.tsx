import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FaCartShopping, FaBars } from "react-icons/fa6";
import { useUserStore } from "../libs/useUserStore";
import { FaTimes } from "react-icons/fa";

const NavbarComponent = () => {
  const navLinks = [
    { title: "الرئيسية", link: "/" },
    { title: "معلومات عنا", link: "/about" },
    { title: "المدونة", link: "/blog" },
    { title: "خدماتنا", link: "/services" },
    { title: "مساعدة", link: "/support" },
  ];

  const { user, loadUser, logout } = useUserStore();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center h-20">
        <Link to="/">
          <img src={logo} alt="logo" className="w-40 h-16 object-contain" />
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((nav, idx) => (
            <Link key={idx} to={nav.link} className="hover:text-purple-600">
              {nav.title}
            </Link>
          ))}

          {user && (
            <Link to="/cart" className="text-2xl text-[#ff2c5d]">
              <FaCartShopping />
            </Link>
          )}

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 cursor-pointer border-r-2 border-gray-500 pr-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={user.avatar}
                  alt={user.fullname}
                  className="w-10 h-10 object-cover rounded-full border-2 border-purple-600"
                />
                {dropdownOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
                  <Link
                    to={`/profile/${user._id}`}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-purple-100 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    الإعدادات
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-red-100 hover:text-red-400 transition-colors"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/signin"
                className="bg-purple-600 text-white py-2 px-5 rounded-lg transition-all duration-300 hover:bg-transparent hover:text-purple-600 font-semibold border-2 border-purple-600"
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/signup"
                className="bg-purple-600 text-white py-2 px-5 rounded-lg transition-all duration-300 hover:bg-transparent hover:text-purple-600 font-semibold border-2 border-purple-600"
              >
                إنشاء حساب
              </Link>
            </div>
          )}
        </div>

        <button
          className="lg:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col gap-4 px-4 py-4">
            {navLinks.map((nav, idx) => (
              <Link
                key={idx}
                to={nav.link}
                className="hover:text-purple-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {nav.title}
              </Link>
            ))}

            {user && (
              <Link to="/cart" className="text-2xl text-[#ff2c5d]">
                <FaCartShopping />
              </Link>
            )}

            {user ? (
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  to={`/profile/${user._id}`}
                  className="px-4 py-2 hover:bg-purple-100 rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  الإعدادات
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-red-100 hover:text-red-400 rounded transition-colors"
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  to="/signin"
                  className="bg-purple-600 text-white py-2 px-5 rounded-lg transition-all duration-300 hover:bg-transparent hover:text-purple-600 font-semibold border-2 border-purple-600 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/signup"
                  className="bg-purple-600 text-white py-2 px-5 rounded-lg transition-all duration-300 hover:bg-transparent hover:text-purple-600 font-semibold border-2 border-purple-600 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  إنشاء حساب
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarComponent;
