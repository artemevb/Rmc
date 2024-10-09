// Import necessary components and hooks
import Logo from "@/src/app/[locale]/_components/Header/Logo";
import Navigation from "@/src/app/[locale]/_components/Header/Navigation";
import Tools from "@/src/app/[locale]/_components/Header/Tools";
import { useTranslations } from 'next-intl';

// Define the structure of navOptions items
interface NavItem {
  title: string;
  slug: string;
}

interface LocaleProps {
  locale: string;
}

const Header = ({ locale }: LocaleProps) => {
  const t = useTranslations('Header');

  // Define navigation items with translated titles
  const data: NavItem[] = [
    {
      title: t('nav.services'),
      slug: 'services',
    },
    {
      title: t('nav.about'),
      slug: 'about',
    },
    {
      title: t('nav.blog'),
      slug: 'blog',
    },
    {
      title: t('nav.contacts'),
      slug: 'contacts',
    },
  ];

  return (
    <header className="w-full bg-white px-2 h-[90px] max-mdx:h-[72px] xl:h-[100px] shadow-2xl">
      <div className="w-full max-w-[1440px] flex items-center justify-between gap-2 h-full mx-auto">
        <Logo />
        <Navigation navOptions={data} locale={locale}/>
        <Tools navOptions={data} locale={locale}/>
      </div>
    </header>
  );
}

export default Header;
