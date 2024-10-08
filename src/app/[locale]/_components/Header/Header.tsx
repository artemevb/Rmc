// import necessary components and images
import Logo from "@/src/app/[locale]/_components/Header/Logo";
import Navigation from "@/src/app/[locale]/_components/Header/Navigation";
import Tools from "@/src/app/[locale]/_components//Header/Tools";

// Define the structure of navOptions items
interface NavItem {
  title: string;
  slug: string;
}

const Header = () => {
  const data: NavItem[] = [
    {
      title: 'Услуги',
      slug: 'services',
    },
    {
      title: 'О нас',
      slug: 'about',
    },
    {
      title: 'Блог',
      slug: 'blog',
    },
    {
      title: 'Контакты',
      slug: 'contacts',
    },
  ];

  return (
    <header className="w-full bg-white px-2 h-[90px] max-mdx:h-[72px] xl:h-[100px] shadow-2xl">
      <div className="w-full max-w-[1440px] flex items-center justify-between gap-2 h-full mx-auto">
        <Logo />
        <Navigation navOptions={data} />
        <Tools navOptions={data}/>
      </div>
    </header>
  );
}

export default Header;
