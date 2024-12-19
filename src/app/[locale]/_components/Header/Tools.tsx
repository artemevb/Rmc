'use client';
import { useState, useTransition, useEffect, useRef } from "react";
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
// import phoneIcon from "@/public/svg/tools/phone-icon.svg";
import Menu from "../Menu";
import searchIcon from "@/public/svg/tools/search-icon.svg";
import Image from "next/image";
import burgerMenu from "@/public/svg/tools/burger-menu.svg";
// import Link from "next/link";
// import heartIcon from "@/public/svg/tools/heart-icon.svg";
import { NavItem } from "./NavItem"; // Убедитесь, что путь корректен
import axios from 'axios';
import SearchModal from '../Modal/Search';

interface NavigationProps {
  navOptions: NavItem[];
  locale: string;
}

const LocalSwitcher: React.FC<NavigationProps> = ({ navOptions, locale }) => {
  const [menu, setMenu] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpenMenu = () => {
    setMenu(true);
  };

  const handlePhoneClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Предотвращаем стандартное поведение

    try {
      await axios.post('https://rmc.mrjtrade.uz/api/counter/add?button=CALL');
      window.location.href = 'tel:+998785558787';
    } catch (error) {
      console.error('API вызов не удался:', error);
      // Можно добавить логику обработки ошибок здесь, если необходимо
    }
  };

  const handleCloseMenu = () => {
    setMenu(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleLanguageSelect = (nextLocale: string) => {
    setDropdownOpen(false);
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

  // Закрытие выпадающего списка при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center gap-[12px]">
      <div className="h-full items-center flex gap-[8px] xl:gap-[12px]">
        <button
          className="px-3 py-3 rounded-full max-mdx:px-3 max-mdx:py-3"
          onClick={() => setShowSearchModal(true)}
        >
          <Image
            src={searchIcon}
            height={100}
            width={100}
            alt={`search-icon`}
            className="w-7 h-7 max-mdx:w-[20px] max-mdx:h-[20px]"
          />
        </button>
        {showSearchModal && (
          <SearchModal onClose={() => setShowSearchModal(false)} />
        )}
        {/* <Link href={'/favorites'}> */}
        {/* <button className="border border-neutral-300 px-3 py-3 rounded-full max-mdx:px-3 max-mdx:py-3 ">
          <Image
            src={heartIcon}
            height={100}
            width={100}
            alt={`Иконка избранного`}
            className="w-7 h-7 max-mdx:w-[20px] max-mdx:h-[20px]"
          />
        </button> */}
        {/* </Link> */}
        {/* <a
          href="tel:+998785558787"
          onClick={handlePhoneClick} 
          className="border bg-[#333333] border-neutral-300 px-3 py-3 rounded-full max-mdx:px-3 max-mdx:py-3 hidden xl:block"
        >
          <Image
            src={phoneIcon}
            height={100}
            width={100}
            alt={`Иконка телефона`}
            className="w-7 h-7 max-mdx:w-3 max-mdx:h-3"
          />
        </a> */}
        <a
          href="tel:+998785558787"
          onClick={handlePhoneClick}
          className=" px-3 py-3 rounded-full max-mdx:px-3 max-mdx:py-3 hidden xl:block"
        >
          <span className="text-black text-base font-medium">
            +998 78 555-87-87
          </span>
        </a>

        <div className='relative'>
          <button
            onClick={toggleDropdown}
            className='flex items-center text-[16px] font-normal bg-white focus:outline-none px-4 py-3  xl:flex hidden '
          >
            <span className='sr-only'>Сменить язык</span>
            {localActive.toUpperCase()}
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {dropdownOpen && (
            <div ref={dropdownRef} className="absolute right-4 w-[50px] bg-white shadow-lg z-10">
              <ul className="py-1">
                <li>
                  <button
                    onClick={() => handleLanguageSelect('en')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    En
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLanguageSelect('ru')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Ru
                  </button>
                </li>
                {/* <li>
                  <button
                    onClick={() => handleLanguageSelect('uz')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    O`z
                  </button>
                </li> */}
              </ul>
            </div>
          )}
        </div>
        <button
          onClick={handleOpenMenu}
          className="bg-[#333333] max-mdx:px-3 max-mdx:py-3 px-4 py-4 rounded-full 2xl:hidden"
        >
          <Image
            src={burgerMenu}
            height={100}
            width={100}
            alt={`burger-menu icon`}
            className="w-6 h-6 max-mdx:w-[20px] max-mdx:h-[20px]"
          />
        </button>

        {/* Рендер компонента Menu */}
        {menu && (
          <Menu menu={menu} closeMenu={handleCloseMenu} navOptions={navOptions} locale={locale} />
        )}
      </div>
    </div>
  );
};

export default LocalSwitcher;
