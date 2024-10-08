

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/rmc-logo.svg";

function Logo() {
  return (
    <Link href="/" className="h-auto w-auto items-center flex">
      <div className="flex flex-row gap-[8px] items-center">
        <Image
          src={logo}
          width={300}
          height={300}
          alt="Rmc Logo"
          className="h-full w-[12%] mdx:h-[60px] mdx:w-auto"
        />
        <div className="flex flex-col">
          <div className="text-[15px] mdx:text-[22px] uppercase font-normal">Rmc De Luxe</div>
          <div className="text-[11.5px] mdx:text-[15px] text-[#A6A6A6] ls">real estate</div>
        </div>
      </div>
    </Link>
  );
}

export default Logo;
