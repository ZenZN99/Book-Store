import { IoLogOut, IoMenu, IoSettings } from "react-icons/io5";
import logo from "../../assets/logo.png";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import type { HeaderProps } from "../../types/book";
import { Link } from "react-router-dom";

export default function Header({
  setSidebarOpen,
  setDropdownOpen,
  dropdownOpen,
  user,
  handleLogout,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-white px-4 py-4 shadow-md md:px-20">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-purple-600 text-2xl"
          onClick={() => setSidebarOpen(true)}
        >
          <IoMenu />
        </button>
        <Link to="/"><img src={logo} alt="logo" className="w-[150px] h-[45px]" /></Link>
      </div>

      <div className="relative">
        <div
          className="flex items-center gap-2 cursor-pointer px-2"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span className="hidden sm:block">{user?.fullname}</span>
          <img
            src={user?.avatar}
            alt={user?.fullname}
            className="w-10 h-10 rounded-full border-2 border-purple-600 object-cover"
          />
          {dropdownOpen ? (
            <IoMdArrowDropup size={20} />
          ) : (
            <IoMdArrowDropdown size={20} />
          )}
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
            <Link
              to={`/profile/${user?._id}`}
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-purple-100 transition-colors"
            >
              <IoSettings /> الإعدادات
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-red-100 hover:text-red-500 transition-colors"
            >
              <IoLogOut /> تسجيل الخروج
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
