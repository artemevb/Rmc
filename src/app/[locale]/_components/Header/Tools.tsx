'use client';
import { useState, ChangeEvent, useTransition } from "react";
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Menu from "../Menu";
import searchIcon from "@/public/svg/tools/search-icon.svg";
import Image from "next/image";
import burgerMenu from "@/public/svg/tools/burger-menu.svg";
import Link from "next/link";
import heartIcon from "@/public/svg/tools/heart-icon.svg";
import { NavItem } from "./NavItem"; // Adjust the path as needed

interface NavigationProps {
  navOptions: NavItem[];
}

const LocalSwitcher: React.FC<NavigationProps> = ({ navOptions }) => {
  const [menu, setMenu] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const handleOpenMenu = () => {
    setMenu(true);
  };

  const handleCloseMenu = () => {
    setMenu(false);
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };

  return (
    <div>
      {/* Language Switcher */}
      <label className='border-2 rounded flex items-center p-1 xl:block hidden'>
        <span className='sr-only'>Change language</span>
        <select
          defaultValue={localActive}
          className='bg-transparent py-2 px-3 appearance-none'
          onChange={onSelectChange}
          disabled={isPending}
        >
          <option value='en'>English</option>
          <option value='ru'>Русский</option>
          <option value='uz'>O`zbekcha</option>
        </select>
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </label>

      {/* Menu Buttons */}
      <div className="h-full items-center flex gap-[8px] xl:gap-[12px]">
        <button className="border border-neutral-300 px-3 py-3 rounded-full max-mdx:px-3 max-mdx:py-3">
          <Image
            src={searchIcon}
            height={100}
            width={100}
            alt={`Tools Item SearchIcon`}
            className="w-7 h-7 max-mdx:w-[20px] max-mdx:h-[20px]"
          />
        </button>
        <Link href={'/favorites'}>
          <button className="border border-neutral-300 px-3 py-3 rounded-full max-mdx:px-3 max-mdx:py-3">
            <Image
              src={heartIcon}
              height={100}
              width={100}
              alt={`Tools Item HeartIcon : Favorites`}
              className="w-7 h-7 max-mdx:w-[20px] max-mdx:h-[20px]}"
            />
          </button>
        </Link>

        <button
          onClick={handleOpenMenu}
          className="bg-[#333333] max-mdx:px-3 max-mdx:py-3 px-4 py-4 rounded-full 2xl:hidden"
        >
          <Image
            src={burgerMenu}
            height={100}
            width={100}
            alt={`Tools Item Burger Menu`}
            className="w-6 h-6 max-mdx:w-[20px] max-mdx:h-[20px]}"
          />
        </button>

        {/* Render Menu Component */}
        {menu && (
          <Menu menu={menu} closeMenu={handleCloseMenu} navOptions={navOptions} />
        )}
      </div>
    </div>
  );
};

export default LocalSwitcher;
