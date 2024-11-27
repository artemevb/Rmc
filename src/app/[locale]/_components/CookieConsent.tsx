'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from 'next-intl';

interface local {
  locale: string;
}

const CookieConsent = ({ locale }: local) => {
  const t = useTranslations('CookieConsent');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[rgba(247,247,247,0.4)] text-gray-600 flex flex-wrap items-center justify-center px-6 py-4 shadow-lg z-50 transition-all">
      <div className="max-w-[1440px] w-full flex items-center justify-center flex-row">
        <p className="text-sm flex-1">
          {t('title')}
          {" "}
          <Link href={`/${locale}/cookie`} className="text-corporate underline hover:text-hover_corporate">

            Cookie Policy

          </Link>.
        </p>
        <button
          onClick={handleAccept}
          className="bg-corporate hover:bg-hover_corporate text-white text-sm font-medium px-4 py-2 transition"
        >
          {t('send')}
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
