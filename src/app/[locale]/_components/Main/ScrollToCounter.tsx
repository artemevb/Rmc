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

  return null; // Компонент не рендерит ничего, он нужен только для логики прокрутки
}
