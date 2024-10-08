"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import close from "@/public/svg/close-white.svg";
import arrow_black from "@/public/svg/arrow-down-black.svg";
import arrow_yellow from "@/public/svg/arrow-up-yellow.svg";

const servicesOptions = [
  { title: 'Купить', slug: 'buy' },
  { title: 'Арендовать', slug: 'rent' },
  { title: 'Продать', slug: 'sell' },
  { title: 'Оценка недвижимости', slug: 'evaluation' },
  { title: 'О нас', slug: 'about' },
  { title: 'Блог', slug: 'blog' },
  { title: 'Контакты', slug: 'contacts' }
];

const Menu = ({ menu, closeMenu }) => {
  const [languageMenu, setLanguageMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("RU");
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);

  const menuRef = useRef(null);

  const toggleLanguageMenu = () => {
    setLanguageMenu(!languageMenu);
  };

  const changeLanguage = (lang) => {
    setSelectedLanguage(lang);
    setLanguageMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setLanguageMenu(false);
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

  return (
    <div
      className={`fixed z-[9999] top-0 right-0 w-full max-w-[300px] bg-white h-full shadow-md ${menu ? "transform translate-x-0" : "transform translate-x-full"
        }`}
    >
      <div className="border-b py-4 flex">
        <div className="w-full flex justify-end mx-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-center gap-[12px]">
              <div ref={menuRef} className="mdx:relative xl:flex xl:items-center xl:text-left z-40">
                <button
                  id="dropdownButton"
                  className="inline-flex items-center text-[19px] font-medium bg-white focus:outline-none border border-neutral-300 px-4 py-3 rounded-full"
                  onClick={toggleLanguageMenu}
                >
                  {selectedLanguage}
                  <svg
                    className="w-5 h-5 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {languageMenu && (
                  <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <ul className="py-1">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => changeLanguage("RU")}
                      >
                        Русский
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => changeLanguage("UZ")}
                      >
                        <p>O&apos;zbekcha</p>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <button onClick={closeMenu} className="bg-[#333333] max-mdx:px-3 max-mdx:py-3 px-4 py-4 rounded-full">
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
          <div className="flex justify-start mx-4 items-center">
            <p
              className={`text-[20px] mdx:text-[24px] ${servicesMenuOpen ? 'text-[#E1AF93]' : ''}`}
            >
              Услуги
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
          <div className="pl-[34px]">
            {servicesOptions.slice(0, 4).map((item, index) => (
              <Link
                onClick={closeMenu}
                href={`/${item.slug}`}
                key={index}
                className="py-2"
              >
                <div className="flex justify-between my-[12px] text-[16px] mdx:text-[20px]">
                  <p>{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        {servicesOptions.slice(4).map((item, index) => (
          <Link
            onClick={closeMenu}
            href={`/${item.slug}`}
            key={index}
            className="pt-[32px]"
          >
            <div className="flex justify-between mx-4 text-[20px] mdx:text-[24px]">
              <p>{item.title}</p>
            </div>
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-[20px]">
        <button className="bg-[#E1AF93] text-[17px] font-semibold text-white py-2 px-4 w-full max-w-[175px] mdx:max-w-[223px]">Задать вопрос</button>
      </div>
    </div>
  );
};

export default Menu;
