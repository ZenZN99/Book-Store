import { useEffect, useState } from "react";
import NavbarComponent from "../Components/Navbar";
import { getAllUsers, getUserById, deleteUserById } from "../api/user/request";
import { useUserStore } from "../libs/useUserStore";
import toast from "react-hot-toast";
import type { IUser } from "../types/user";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
export default function UsersPage() {
  const token = localStorage.getItem("token")!;
  const { user: currentUser } = useUserStore();

  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const navigate = useNavigate();
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

  const loadUsers = async () => {
    const data = await getAllUsers(token);
    if (data?.length) {
      const filtered = data.filter((u: IUser) => u._id !== currentUser?._id);
      setUsers(filtered);
    }
  };

  const handleSelectUser = async (id: string) => {
    const data = await getUserById(token, id);
    if (data) setSelectedUser(data);
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;
    const data = await deleteUserById(token, id);
    if (data?.success) {
      toast.success(data.success);
      loadUsers();
      if (selectedUser?._id === id) setSelectedUser(null);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100" data-aos="fade-up">
      <div className="pt-28 px-4 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        <div className="w-full md:w-64 bg-white rounded-xl shadow overflow-hidden flex-shrink-0">
          <h2 className="text-xl font-semibold p-4 border-b">المستخدمين</h2>
          <div className="flex flex-col divide-y">
            {users.map((u) => (
              <button
                key={u._id}
                onClick={() => handleSelectUser(u._id)}
                className={`flex items-center gap-3 p-3 hover:bg-gray-50 ${
                  selectedUser?._id === u._id ? "bg-gray-100" : ""
                }`}
              >
                <img
                  src={u.avatar}
                  alt={u.fullname}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 text-left">
                  <p className="font-semibold">{u.fullname}</p>
                  <p className="text-xs text-gray-500">{u.email}</p>
                </div>
                {currentUser?.role === "Admin" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteUser(u._id);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    حذف
                  </button>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full flex-1 bg-white rounded-xl shadow overflow-hidden mt-6 md:mt-0">
          {selectedUser ? (
            <>
              <div className="relative h-56 bg-gray-200">
                <img
                  src={selectedUser.cover}
                  alt="cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-6 pb-8">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-end -mt-16">
                  <img
                    src={selectedUser.avatar}
                    alt="avatar"
                    className="w-32 h-32 rounded-full border-4 border-purple-600 object-cover z-50"
                  />
                  <div className="text-center mt-20 sm:text-left">
                    <h2 className="text-2xl font-bold text-gray-600">
                      {selectedUser.fullname}
                    </h2>
                    <p className="text-gray-500">{selectedUser.email}</p>
                    <span className="inline-block mt-2 bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm">
                      {selectedUser.role}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64 md:h-full p-20 text-gray-500">
              اختر مستخدم لعرض معلوماته
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
