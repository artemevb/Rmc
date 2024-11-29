

import Image from "next/image";
import Link from "next/link";
// import logo from "@/public/images/imed-f.svg";
import logo1 from "@/public/svg/logo/rmc_last.svg";
function Logo() {
  return (
    <Link href="/" className="h-auto w-auto items-center flex  mdx:max-w-max">
      <div className="flex flex-row gap-[8px] items-center justify-between max-mdx:max-w-[180px]">
        <Image
          src={logo1}
          width={300}
          height={300}
          alt="Rmc Logo"
          className="h-full mdx:h-[75px] mdx:w-auto"
        />
        {/* <div className="flex flex-col">
          <div className="text-[15px] mdx:text-[22px] uppercase font-bold">Rmc De Luxe</div>
          <div className="text-[11.5px] mdx:text-[15px] text-[#E94B50] ls">real estate</div>
        </div> */}
      </div>
    </Link>
  );
}

export default Logo;
