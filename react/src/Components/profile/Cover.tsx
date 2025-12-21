interface CoverProps {
  coverPreview: string | null;
  userCover: string;
  setCover: (file: File | null) => void;
}

export default function Cover({
  coverPreview,
  userCover,
  setCover,
}: CoverProps) {
  return (
    <div className="relative h-56 bg-gray-200">
      <img
        src={coverPreview || userCover}
        alt="cover"
        className="w-full h-full object-cover"
      />

      <label className="absolute top-3 right-3 bg-black/60 text-white text-sm px-4 py-2 rounded cursor-pointer">
        تغيير الغلاف
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => setCover(e.target.files?.[0] || null)}
        />
      </label>
    </div>
  );
}
