import { useEffect } from "react";
import type { FormModalProps } from "../../types/book";

export default function FormModal({
  editingBook,
  formData,
  setFormData,
  setModalOpen,
  handleSubmit,
}: FormModalProps) {
  useEffect(() => {
    window.scrollTo({ top: 1000, behavior: "smooth" });
  }, []);

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start sm:items-center z-50 px-4 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg w-full max-w-md mt-10 sm:mt-0">
        <h3 className="text-xl font-semibold mb-4">
          {editingBook ? "تعديل الكتاب" : "إنشاء كتاب جديد"}
        </h3>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="عنوان الكتاب"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="text"
            placeholder="الوصف"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="text"
            placeholder="الفئة"
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="number"
            placeholder="السعر"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: e.target.value }))
            }
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="number"
            placeholder="الكمية"
            value={formData.stock}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, stock: e.target.value }))
            }
            className="border p-2 rounded-lg w-full"
            required
          />
          {!editingBook && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  image: e.target.files ? e.target.files[0] : null,
                }))
              }
              className="border p-2 rounded-lg w-full"
              required
            />
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              {editingBook ? "تعديل" : "إنشاء"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
