import { useEffect, useState } from "react";
import NavbarComponent from "../Components/Navbar";
import { profile } from "../api/user/request";
import toast from "react-hot-toast";
import { useUserStore } from "../libs/useUserStore";
import Cover from "../Components/profile/Cover";
import Avatar from "../Components/profile/Avatar";
import UserInfo from "../Components/profile/UserInfo";
import ProfileAction from "../Components/profile/ProfileAction";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
export default function Profile() {
  const { user, setUser, loadUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  }, []);

  const [avatar, setAvatar] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }
  }, []);

  useEffect(() => {
    if (avatar) setAvatarPreview(URL.createObjectURL(avatar));
    if (cover) setCoverPreview(URL.createObjectURL(cover));
  }, [avatar, cover]);

  const handleSave = async () => {
    if (!token) return;

    const data = await profile(token, avatar!, cover!);

    if (data?.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      toast.success("تم حفظ تعديلات بنجاح");
      setAvatar(null);
      setCover(null);
    }
  };

  if (!user) {
    return (
      <div className="absolute inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
        <div className="border-4 border-purple-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100" data-aos="fade-up">
      <NavbarComponent />

      <div className="pt-28 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow overflow-hidden">
          <Cover
            coverPreview={coverPreview}
            userCover={user.cover}
            setCover={setCover}
          />

          <div className="px-6 pb-8">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-end -mt-16">
              <Avatar
                avatarPreview={avatarPreview}
                userAvatar={user.avatar}
                setAvatar={setAvatar}
              />
              <UserInfo
                fullname={user.fullname}
                email={user.email}
                role={user.role}
              />
            </div>

            <ProfileAction handleSave={handleSave} show={!!avatar || !!cover} />
          </div>
        </div>
      </div>
    </div>
  );
}
