import logoBig from "@/public/images/rmc-logo.svg";
import telegram from "@/public/svg/footer/telegram.svg";
import facebook from "@/public/svg/footer/facebook.svg";
import instagram from "@/public/svg/footer/instagram.svg";
import youtube from "@/public/svg/footer/whatsapp.svg";
import resultLogo from "@/public/svg/footer/result-logo.png";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import Image from "next/image";

interface LocaleProps {
  locale: string;
}

export default function Footer({ locale }: LocaleProps) {
  const t = useTranslations('Main.Footer');

  return (
    <div className="bg-[#F7F7F7] w-full px-2 pt-12">
      <div className="w-full max-w-[1440px] flex flex-col gap-12 mx-auto">
        <div className="w-full flex justify-between flex-col gap-12">
          <div className="flex  justify-between flex-row gap-5 border-b pb-[25px] xl:pb-[50px]">
            <div className="flex flex-col gap-5 ">
              <Link href="/" className="h-auto w-auto items-center flex">
                <div className="flex flex-row gap-[8px] items-center">
                  <Image
                    src={logoBig}
                    width={300}
                    height={300}
                    quality={100}
                    alt="Rmc Logo"
                    className="h-full w-[12%] mdx:h-[60px] mdx:w-auto"
                  />
                  <div className="flex flex-col">
                    <div className="text-[15px] mdx:text-[22px] uppercase">Rmc De Luxe</div>
                    <div className="text-[11.5px] mdx:text-[15px] text-[#A6A6A6] ls">
                      real estate
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex gap-3 mdx:gap-[20px]">
              <a href="https://t.me/intermedtrade" target="_blank">
                <Image
                  src={telegram}
                  width={100}
                  quality={100}
                  height={100}
                  alt="Telegram"
                  className="w-[28px] h-[28px] mdx:w-[33px] mdx:h-[33px] xl:w-[35px] xl:h-[35px]"
                />
              </a>
              <a href="https://www.facebook.com/intermed.mindray" target="_blank">
                <Image
                  src={facebook}
                  width={100}
                  height={100}
                  quality={100}
                  alt="Facebook"
                  className="w-[28px] h-[28px] mdx:w-[33px] mdx:h-[33px] xl:w-[35px] xl:h-[35px]"
                />
              </a>
              <a href="https://www.instagram.com/intermed.mindray/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D" target="_blank">
                <Image
                  src={instagram}
                  width={100}
                  height={100}
                  quality={100}
                  alt="Instagram"
                  className="w-[28px] h-[28px] mdx:w-[33px] mdx:h-[33px] xl:w-[35px] xl:h-[35px]"
                />
              </a>
              <a href="https://www.youtube.com/@intermedinnovation9644" target="_blank">
                <Image
                  src={youtube}
                  width={100}
                  height={100}
                  quality={100}
                  alt="YouTube"
                  className="w-[28px] h-[28px] mdx:w-[33px] mdx:h-[33px] xl:w-[35px] xl:h-[35px]"
                />
              </a>
            </div>
          </div>
          <div className="mdx:flex flex-row xl:gap-[138px]">
            <div className="lg:w-1/2 xl:max-w-[406px] w-full flex max-mdx:gap-5  xl:gap-[138px]">
              <div className="flex-1 flex flex-col text-[16px] mdx:text-[18px] xl:text-[20px] gap-[5px] mdx:gap-[10px] text-[#333333] lg:pr-7 xl:pr-0 xl:max-w-[110px]">
                <h2 className="text-[20px] mdx:text-[22px] xl:text-[24px] font-medium text-[#252324] ">
                  {t('services')}
                </h2>
                <Link href={`/${locale}/buy`}>{t('buy')}</Link>
                <Link href={`/${locale}/rent`}>{t('rent')}</Link>
                <Link href={`/${locale}/sell`}>{t('sell')}</Link>
                <Link href={`/${locale}/evaluation`}>{t('evaluate')}</Link>
              </div>
              <div className="flex-1 flex flex-col text-[16px] mdx:text-[18px] xl:text-[20px] gap-[5px] mdx:gap-[10px] text-[#333333] xl:max-w-[163px]">
                <h2 className="text-[20px] mdx:text-[22px] xl:text-[24px] font-medium text-[#252324] ">
                  {t('real_estate')}
                </h2>
                <Link href={`/${locale}/about`}>{t('apartments')}</Link>
                <Link href={`/${locale}/partners`}>{t('new_buildings')}</Link>
                <Link href={`/${locale}/contacts`}>{t('houses_and_land')}</Link>
                <Link href={`/${locale}/news`}>{t('commercial')}</Link>
              </div>
            </div>
            <div className="lg:w-1/2 w-full flex flex-row max-mdx:gap-5 xl:gap-[138px]">
              <div className="flex-1 flex flex-col text-[16px] mdx:text-[18px] xl:text-[20px] gap-[5px] mdx:gap-[10px] text-[#333333] lg:pr-7 xl:pr-0 xl:max-w-[108px]">
                <h2 className="text-[20px] mdx:text-[22px] xl:text-[24px] font-medium text-[#252324] ">
                  {t('company')}
                </h2>
                <Link href={`/${locale}/about`}>{t('about_us')}</Link>
                <Link href={`/${locale}/blog`}>{t('blog')}</Link>
                <Link href={`/${locale}/contacts`}>{t('contacts')}</Link>
                <Link href={`/${locale}/phone`}>{t('contact_us')}</Link>
              </div>
              <div className="flex-1 flex flex-col text-[16px] mdx:text-[18px] xl:text-[20px] gap-[5px] mdx:gap-[10px] text-[#333333] xl:max-w-[253px]">
                <h2 className="text-[20px] mdx:text-[22px] xl:text-[24px] font-medium text-[#252324] ">
                  {t('other')}
                </h2>
                <Link href={`/${locale}/about`}>{t('mortgage_calculator')}</Link>
                <Link href={`/${locale}/about`}>{t('dubai_investments')}</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full ">
          <hr />
          <div className="my-6 w-full flex justify-between items-center">
            <p className="w-full max-mdx:max-w-[150px] text-[#B3B3B3] text-[14px] xl:text-[16px]">
              {t('info')}
            </p>
            <a href="https://result-me.uz" target="_blank">
              <Image
                src={resultLogo}
                width={500}
                height={500}
                quality={100}
                alt="Result Logo"
                className="h-8 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}