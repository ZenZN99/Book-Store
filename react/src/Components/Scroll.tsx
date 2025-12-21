import { useEffect } from "react";

export default function Scroll() {
  useEffect(() => {
    window.scrollTo({ top: 1000, behavior: "smooth" });
  }, []);

  return null;
}
