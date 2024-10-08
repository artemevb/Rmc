"use client";
import { useState, useEffect, useRef, ChangeEvent, useTransition } from "react";
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import close from "@/public/svg/close-white.svg";
import arrow_black from "@/public/svg/arrow-down-black.svg";
import arrow_yellow from "@/public/svg/arrow-up-yellow.svg";
import { NavItem } from "./Header/NavItem"; // Adjust the path as needed

interface MenuProps {
  menu: boolean;
  closeMenu: () => void;
  navOptions: NavItem[];
}

const Menu: React.FC<MenuProps> = ({ menu, closeMenu, navOptions }) => {
  const [, setLanguageMenu] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const router = useRouter();
  const localActive = useLocale();

  const menuRef = useRef<HTMLDivElement>(null);


  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
        } transition-transform duration-300 ease-in-out`}
    >
      {/* Header with Language Switcher and Close Button */}
      <div className="border-b py-4 flex">
        <div className="w-full flex justify-end mx-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-center gap-[12px]">
              {/* Language Switcher */}
              {/* <div ref={menuRef} className="relative z-40">
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
              </div> */}
              <label className='inline-flex items-center text-[19px] font-normal bg-white focus:outline-none border border-neutral-300 px-4 py-3 rounded-full'>
                <span className='sr-only'>Change language</span>
                <select
                  defaultValue={localActive}
                  className='bg-transparent appearance-none'
                  onChange={onSelectChange}
                  disabled={isPending}
                >
                  <option value='en'>En</option>
                  <option value='ru'>Ru</option>
                  <option value='uz'>O`z</option>
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
          <div className="pl-[34px] font-normal ">
            <div
              onClick={closeMenu}

              className="pt-2"
            >
              <div className="flex flex-col justify-between text-[16px] mdx:text-[20px] gap-[12px]">
                <a href="/buy">Купить</a>
                <a href="/rent">Арендовать</a>
                <a href="/sell">Продать</a>
                <a href="/evaluation">Оценка недвижимости</a>
              </div>
            </div>

          </div>
        )}

        {/* Other Navigation Items */}
        {navOptions.slice(4).map((item, index) => (
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
        <div className="flex flex-col gap-[32px] pl-[20px] font-normal mt-[32px] text-[20px] mdx:text-[24px]">
          <a href="/categories/catalog/">О нас</a>
          <a href="/categories/catalog/">Блог</a>
          <a href="/categories/catalog/">Контакты</a>
        </div>
      </nav>

      {/* Footer Button */}
      <div className="absolute bottom-0 left-0 right-0 p-[20px]">
        <button className="bg-[#E1AF93] text-[17px] font-semibold text-white py-2 px-4 w-full max-w-[175px] mdx:max-w-[223px]">
          Задать вопрос
        </button>
      </div>
    </div>
  );
};

export default Menu;
