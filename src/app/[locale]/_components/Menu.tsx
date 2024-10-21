'use client';
import { useState, useEffect, useRef, ChangeEvent, useTransition } from "react";
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import close from "@/public/svg/close-white.svg";
import arrow_black from "@/public/svg/arrow-down-black.svg";
import arrow_yellow from "@/public/svg/arrow-up-yellow.svg";
import { NavItem } from "./Header/NavItem";
import { useTranslations } from 'next-intl';
import axios from 'axios';

interface MenuProps {
  menu: boolean;
  closeMenu: () => void;
  navOptions: NavItem[];
  locale: string;
}

const Menu: React.FC<MenuProps> = ({ menu, closeMenu, navOptions, locale }) => {
  const t = useTranslations('Header');
  // Removed setLanguageMenu as it was not used
  const [isPending, startTransition] = useTransition();
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale();

  const menuRef = useRef<HTMLDivElement>(null);

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      const segments = pathname.split('/');
      if (['ru', 'uz', 'en'].includes(segments[1])) {
        segments[1] = nextLocale;
      } else {
        segments.splice(1, 0, nextLocale);
      }
      const newPath = segments.join('/') || '/';
      router.replace(newPath);
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // If you plan to use the menu for a language switcher, uncomment and use setLanguageMenu
        // setLanguageMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const toggleServicesMenu = () => {
    setServicesMenuOpen(!servicesMenuOpen);
  };

  const handlePhoneClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent default behavior temporarily

    try {
      // Send the API request using axios
      await axios.post('https://rmc.mrjtrade.uz/api/counter/add?button=CALL');

      // After successful API call, redirect to the phone number
      window.location.href = 'tel:+998785558787';
      console.log('Запрос успешно отправлен.');
    } catch (error) {
      console.error('API call failed:', error);
      // You can add error handling logic here if needed
    }
  };

  return (
    <div
      className={`fixed z-[9999] top-0 right-0 w-full max-w-[300px] bg-white h-full shadow-md ${menu ? "transform translate-x-0" : "transform translate-x-full"
        } transition-transform duration-300 ease-in-out`}
    >
      {/* Header with Language Switcher and Close Button */}
      <div className="border-b py-4 flex">
        <div className="w-full flex justify-end mx-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-center gap-[12px]">
              {/* Language Switcher */}
              <label className='inline-flex items-center text-[19px] font-normal bg-white focus:outline-none border border-neutral-300 px-4 py-3 rounded-full'>
                <span className='sr-only'>{t('menu.changeLanguage')}</span>
                <select
                  defaultValue={localActive}
                  className='bg-transparent appearance-none w-7'
                  onChange={onSelectChange}
                  disabled={isPending}
                >
                  <option value='en'>{t('menu.languages.en')}</option>
                  <option value='ru'>{t('menu.languages.ru')}</option>
                  <option value='O`z'>{t('menu.languages.uz')}</option>
                </select>
                <svg
                  className="w-4 h-4 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </label>

              <button onClick={closeMenu} className="bg-[#333333] px-4 py-4 rounded-full">
                <Image
                  src={close}
                  height={100}
                  width={100}
                  alt={`Tools Item CloseIcon : Close Menu`}
                  className="w-[25px] h-[25px]"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <nav className="flex flex-col font-semibold mt-2">
        <div className="pt-4" onClick={toggleServicesMenu}>
          <div className="flex justify-start mx-4 items-center cursor-pointer">
            <p
              className={`text-[20px] font-medium mdx:text-[24px] ${servicesMenuOpen ? 'text-[#E1AF93]' : ''
                }`}
            >
              {t('nav.services')}
            </p>
            <span className="ml-2">
              <Image
                src={servicesMenuOpen ? arrow_yellow : arrow_black}
                width={50}
                height={50}
                alt="arrow"
                className="h-full w-full mdx:h-[20px] mdx:w-auto"
              />
            </span>
          </div>
        </div>

        {servicesMenuOpen && (
          <div className="pl-[34px] font-normal ">
            <div
              onClick={closeMenu}
              className="pt-2"
            >
              <div className="flex flex-col justify-between text-[16px] mdx:text-[20px] gap-[12px]">
                <Link href={`/${locale}/buy`}>{t('nav.servicesOptions.buy')}</Link>
                <Link href={`/${locale}/rent`}>{t('nav.servicesOptions.rent')}</Link>
                <Link href={`/${locale}/sell`}>{t('nav.servicesOptions.sell')}</Link>
                <Link href={`/${locale}/evaluation`}>{t('nav.servicesOptions.evaluation')}</Link>
              </div>
            </div>
          </div>
        )}

        {/* Other Navigation Items */}
        {navOptions.slice(4).map((item, index) => (
          <Link
            onClick={() => {
              closeMenu(); // Закрытие модального окна
              router.push(`/${locale}/${item.slug}`); // Перенаправление по URL
            }}
            href={`/${locale}/${item.slug}`}
            key={index}
            className="pt-[32px]"
          >
            <div className="flex justify-between mx-4 text-[20px] mdx:text-[24px]">
              <p>{item.title}</p>
            </div>
          </Link>
        ))}
        <div className="flex flex-col gap-[32px] pl-[20px] font-normal mt-[32px] text-[20px] mdx:text-[24px]">
          <Link
            onClick={() => {
              closeMenu(); // Закрытие модального окна
              router.push(`/${locale}/about`); // Перенаправление по URL
            }}
            href={`/${locale}/about`}
          >
            {t('nav.about')}
          </Link>
          <Link
            onClick={() => {
              closeMenu(); // Закрытие модального окна
              router.push(`/${locale}/blog`);
            }}
            href={`/${locale}/blog`}
          >
            {t('nav.blog')}
          </Link>
          <Link
            onClick={() => {
              closeMenu(); // Закрытие модального окна
              router.push(`/${locale}/contacts`);
            }}
            href={`/${locale}/contacts`}
          >
            {t('nav.contacts')}
          </Link>
        </div>
      </nav>

      {/* Footer Button */}
      <div className="absolute bottom-0 left-0 right-0 p-[20px]">
        <a href="tel:+998785558787"
          onClick={handlePhoneClick}>
          <button className="bg-[#E1AF93] text-[17px] font-semibold text-white py-2 px-4 w-full max-w-[175px] mdx:max-w-[223px]">
            {t('menu.askQuestion')}
          </button>
        </a>
      </div>
    </div >
  );
};

export default Menu;
