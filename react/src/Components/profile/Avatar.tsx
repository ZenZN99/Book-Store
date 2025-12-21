import { FaPencilAlt } from "react-icons/fa";

interface AvatarProps {
  avatarPreview: string | null;
  userAvatar: string;
  setAvatar: (file: File | null) => void;
}

export default function Avatar({
  avatarPreview,
  userAvatar,
  setAvatar,
}: AvatarProps) {
  return (
    <div className="relative">
      <img
        src={avatarPreview || userAvatar}
        alt="avatar"
        className="w-32 h-32 rounded-full border-4 border-purple-600 object-cover"
      />
      <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer">
        <FaPencilAlt />
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
        />
      </label>
    </div>
  );
}
