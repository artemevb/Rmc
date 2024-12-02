// components/ScrollToCounter.tsx
"use client";

import { useEffect } from "react";

export default function ScrollToCounter() {
  useEffect(() => {
    if (window.location.hash === "#counter") {
      const counterElement = document.getElementById("counter");
      if (counterElement) {
        counterElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return null;
}
