interface ProfileActionProps {
  handleSave: () => void;
  show: boolean;
}

export default function ProfileAction({
  handleSave,
  show,
}: ProfileActionProps) {
  if (!show) return null;

  return (
    <div className="mt-8 flex justify-end">
      <button
        onClick={handleSave}
        className="bg-[#ff2c5d] hover:bg-[#f21549] text-white px-6 py-2 rounded-lg font-semibold transition"
      >
        حفظ التعديلات
      </button>
    </div>
  );
}
