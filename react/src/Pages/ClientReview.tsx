import { useEffect, useState } from "react";
import { reviewsData } from "../data/reviews";
import Stars from "../Components/reviews/Stars";
import ReviewFilter from "../Components/reviews/ReviewFilter";
import ReviewCard from "../Components/reviews/ReviewCard";
import AddReviewModal from "../Components/reviews/AddReviewModal";
import Aos from "aos";
import "aos/dist/aos.css";
export default function ClientReview() {
  useEffect(() => {
    Aos.init({
      duration: 800,
    });
  }, []);
  const [reviews, setReviews] = useState(reviewsData);
  const [filter, setFilter] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const filteredReviews = filter
    ? reviews.filter((r) => r.rating === filter)
    : reviews;

  const avgRating = reviews.reduce((a, b) => a + b.rating, 0) / reviews.length;

  const addReview = () => {
    if (!comment) return;
    setReviews([
      { id: Date.now(), name: "مستخدم جديد", rating, comment, likes: 0 },
      ...reviews,
    ]);
    setOpen(false);
    setComment("");
    setRating(5);
  };

  return (
    <main className="bg-gray-50 text-gray-800" data-aos="fade-up">
      <section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-36 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">آراء عملائنا</h1>
        <p className="text-xl max-w-4xl mx-auto opacity-90">
          ثقة قرّائنا هي أهم إنجاز لنا
        </p>

        <div className="mt-10 flex justify-center items-center gap-3 text-2xl">
          <span className="font-bold">{avgRating.toFixed(1)}</span>
          <Stars rating={Math.round(avgRating)} />
          <span className="text-lg opacity-90">({reviews.length} تقييم)</span>
        </div>
      </section>

      <ReviewFilter
        filter={filter}
        setFilter={setFilter}
        openModal={() => setOpen(true)}
      />

      <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredReviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onLike={() =>
              setReviews((prev) =>
                prev.map((r) =>
                  r.id === review.id ? { ...r, likes: r.likes + 1 } : r
                )
              )
            }
          />
        ))}
      </section>

      {open && (
        <AddReviewModal
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          onClose={() => setOpen(false)}
          onAdd={addReview}
        />
      )}
    </main>
  );
}
