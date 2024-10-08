'use client';
import { useState, ChangeEvent, useTransition } from "react";
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import phoneIcon from "@/public/svg/tools/phone-icon.svg";
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
    <div className="flex items-center gap-[12px]">
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
          <button className="border border-neutral-300 px-3 py-3 rounded-full max-mdx:px-3 max-mdx:py-3 ">
            <Image
              src={heartIcon}
              height={100}
              width={100}
              alt={`Tools Item HeartIcon : Favorites`}
              className="w-7 h-7 max-mdx:w-[20px] max-mdx:h-[20px]"
            />
          </button>
        </Link>
        <a href="tel:+998990909095" className="border bg-[#333333] border-neutral-300 px-3 py-3 rounded-full max-mdx:px-3 max-mdx:py-3 hidden xl:block">
          <Image
            src={phoneIcon}
            height={100}
            width={100}
            alt={`Tools Item HeartIcon : Favorites`}
            className="w-7 h-7 max-mdx:w-3 max-mdx:h-3"
          />
        </a>
        <label className='inline-flex items-center text-[19px] font-normal bg-white focus:outline-none border border-neutral-300 px-4 py-3 rounded-full xl:flex hidden '>
          <span className='sr-only'>Change language</span>
          <select
            defaultValue={localActive}
            className='bg-transparent appearance-none w-10'
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
        <button
          onClick={handleOpenMenu}
          className="bg-[#333333] max-mdx:px-3 max-mdx:py-3 px-4 py-4 rounded-full 2xl:hidden"
        >
          <Image
            src={burgerMenu}
            height={100}
            width={100}
            alt={`Tools Item Burger Menu`}
            className="w-6 h-6 max-mdx:w-[20px] max-mdx:h-[20px]"
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
