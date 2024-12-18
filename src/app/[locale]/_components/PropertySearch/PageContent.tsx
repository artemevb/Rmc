"use client";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { useLocale } from 'next-intl';

import photo1 from "@/public/images/Calculator/table_mobile.png";
import photo2 from "@/public/images/Calculator/Full.png";
import arrowRightWhite from "@/public/svg/arrow-right-white.svg";

import BuyForm from "@/src/app/[locale]/_components/PropertySearch/BuyForm";
import Sell from "@/src/app/[locale]/_components/PropertySearch/SellForm";
import ToRentOut from "@/src/app/[locale]/_components/PropertySearch/ToRentOutForm";

import BlockCardsBuy from "@/src/app/[locale]/_components/PropertySearch/BuyFormComponents/BlockCardsBuy";
import InfoReviewsBuy from "@/src/app/[locale]/_components/PropertySearch/BuyFormComponents/InfoReviewsBuy";
import ListBuildings from "@/src/app/[locale]/_components/PropertySearch/ListBuildings";
import ShemeBuy from "@/src/app/[locale]/_components/PropertySearch/BuyFormComponents/ShemeBuy";
import BuyDock from "@/src/app/[locale]/_components/PropertySearch/BuyFormComponents/ByDocBlock";
import PopularRewiewsBuy from "@/src/app/[locale]/_components/PropertySearch/BuyFormComponents/PopularRewiewsBuy";

import BlockCardsSell from "@/src/app/[locale]/_components/PropertySearch/SellFormComponents/BlockCardsSell";
import InfoReviewsSell from "@/src/app/[locale]/_components/PropertySearch/SellFormComponents/InfoReviewsSell";
import PopularRewiewsSell from "@/src/app/[locale]/_components/PropertySearch/SellFormComponents/PopularRewiewsSell";
import SellForm from "@/src/app/[locale]/_components/PropertySearch/SellFormComponents/SellForm";
import ShemeSell from "@/src/app/[locale]/_components/PropertySearch/SellFormComponents/ShemeSell";
import SellDock from "@/src/app/[locale]/_components/PropertySearch/SellFormComponents/SellDocBlock";

import PopularRewiewsRent from "@/src/app/[locale]/_components/PropertySearch/ToRentOutFormComponents/PopularRewiewsRent";
import InfoReviewsRent from "@/src/app/[locale]/_components/PropertySearch/ToRentOutFormComponents/InfoReviewsRent";
import Form from "@/src/app/[locale]/_components/Main/Form";
import Contacts from "@/src/app/[locale]/_components/PropertySearch/BuyFormComponents/Contacts";
import RentForm from "@/src/app/[locale]/_components/PropertySearch/ToRentOutFormComponents/RentForm";
import ShemeRent from "@/src/app/[locale]/_components/PropertySearch/ToRentOutFormComponents/ShemeRent";
import RentDock from "@/src/app/[locale]/_components/PropertySearch/ToRentOutFormComponents/RentDocBlock";
import BlockCardsRent from "@/src/app/[locale]/_components/PropertySearch/ToRentOutFormComponents/BlockCardsRent";
import { useTranslations } from "next-intl";

import BuyFormMobile from "@/src/app/[locale]/_components/PropertySearch/BuyFormMobile";
import SellFormMobile from "@/src/app/[locale]/_components/PropertySearch/SellFormMobile";
import RentFormMobile from "@/src/app/[locale]/_components/PropertySearch/RentFormMobile";

type ButtonLabels = "buy" | "sell" | "rent";

interface ComplexType {
    name_ru: string;
    name_uz: string;
    name_en: string;
}

interface Complex {
    _id: string;
    mainImage: {
        asset: { url: string };
    };
    alt: { ru: string; uz: string; en: string };
    seller?: string;
    subtitle: { ru: string; uz: string; en: string };
    price?: string;
    priceValue?: number;
    district?: {
        name_ru: string;
        name_uz: string;
        name_en: string;
    };
    type?: ComplexType; 
    rooms?: {
        number_ru?: string;
        number_uz?: string;
        number_en?: string;
    };
    slug?: {
        current: string;
    };
}


interface Layout {
    _id: string;
    title: { ru: string; uz: string; en: string };
    area?: string;
    price?: string;
    rooms?: {
        rooms?: number;
    };
    residentialComplex?: {
        _id: string;
    };
}
type Locale = 'ru' | 'uz' | 'en';

interface PageContentProps {
    complexes: Complex[];
    layouts: Layout[];
    locale: Locale;
}
// export default function PageContent({ complexes, layouts, locale }: PageContentProps) {
    export default function PageContent({ complexes, layouts }: PageContentProps) {
        const t = useTranslations("PageContent");
        const [activeButton, setActiveButton] = useState<ButtonLabels>("buy");
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [isSmallScreen, setIsSmallScreen] = useState(true);
        const loc: Locale = useLocale() as Locale;

    // Фильтрация - состояния
    const [filterRooms, setFilterRooms] = useState<string[]>([]);
    const [filterType, setFilterType] = useState<string>("");
    const [filterSeller, setFilterSeller] = useState<string>("");
    const [filterAddress, setFilterAddress] = useState<string>("");
    const [filterPriceFrom, setFilterPriceFrom] = useState<number | undefined>();
    const [filterPriceTo, setFilterPriceTo] = useState<number | undefined>();
    const [filterAreaFrom, setFilterAreaFrom] = useState<number | undefined>();
    const [filterAreaTo, setFilterAreaTo] = useState<number | undefined>();

    const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);

    // Определение mobile/desktop
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1023px)");
        const handler = () => setIsSmallScreen(mediaQuery.matches);
        handler();
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    const buttonLabels: ButtonLabels[] = ["buy", "sell", "rent"];

    const handleButtonClick = (label: ButtonLabels) => {
        setActiveButton(label);
        if (isSmallScreen) {
            setIsModalOpen(true);
        }
    };
    const enrichedComplexes = useMemo(() => {
        return complexes.map(complex => {
            const relatedLayouts = layouts.filter(l => l.residentialComplex?._id === complex._id);
            let maxArea = 0;

            // Допустим, берём максимальную площадь
            relatedLayouts.forEach(l => {
                const areaValue = parseFloat(l.area || '0');
                if (areaValue > maxArea) {
                    maxArea = areaValue;
                }
            });

            return {
                ...complex,
                area: maxArea // Добавляем поле area, теперь complex.area будет числовым
            };
        });
    }, [complexes, layouts]);
    const filteredComplexes = useMemo(() => {
        let result = [...enrichedComplexes];

        if (filterType) {
            result = result.filter(c => {
                const names = [c.type?.name_ru, c.type?.name_uz, c.type?.name_en]
                    .filter(Boolean)
                    .map(n => n!.toLowerCase());
                return names.some(n => n.includes(filterType.toLowerCase()));
            });
        }

        if (filterSeller) {
            result = result.filter(c => c.seller?.toLowerCase().includes(filterSeller.toLowerCase()));
        }

        // Можно добавить district фильтр, если потребуется
        // if (filterDistrict) {...}

        if (filterAddress) {
            result = result.filter(c => {
                const names = [c.district?.name_ru, c.district?.name_uz, c.district?.name_en]
                    .filter(Boolean)
                    .map(n => n!.toLowerCase());
                return names.some(n => n.includes(filterAddress.toLowerCase()));
            });
        }

        if (filterPriceFrom !== undefined) {
            result = result.filter(c => (c.priceValue ?? 0) >= filterPriceFrom);
        }
        if (filterPriceTo !== undefined) {
            result = result.filter(c => (c.priceValue ?? Infinity) <= filterPriceTo);
        }

        if (filterRooms.length > 0 || filterAreaFrom !== undefined || filterAreaTo !== undefined) {
            let layoutsFiltered = [...layouts];

            if (filterAreaFrom !== undefined) {
                layoutsFiltered = layoutsFiltered.filter(l => {
                    const areaNum = l.area ? Number(l.area) : 0;
                    return areaNum >= filterAreaFrom;
                });
            }

            if (filterAreaTo !== undefined) {
                layoutsFiltered = layoutsFiltered.filter(l => {
                    const areaNum = l.area ? Number(l.area) : 0;
                    return areaNum <= filterAreaTo;
                });
            }

            if (filterRooms.length > 0) {
                layoutsFiltered = layoutsFiltered.filter(l => {
                    return filterRooms.some(selectedRoom => {
                        if (selectedRoom === "Студия") {
                            return l.title?.ru?.toLowerCase() === "студия";
                        } else if (selectedRoom === "4+") {
                            return (l.rooms?.rooms ?? 0) >= 4;
                        } else {
                            const r = parseInt(selectedRoom, 10);
                            return l.rooms?.rooms === r;
                        }
                    });
                });
            }

            const complexIdsFromLayouts = new Set(layoutsFiltered.map(l => l.residentialComplex?._id).filter(Boolean));
            result = result.filter(c => complexIdsFromLayouts.has(c._id));
        }

        return result;
    }, [
        enrichedComplexes,
        layouts,
        filterType,
        filterSeller,
        filterAddress,
        filterPriceFrom,
        filterPriceTo,
        filterAreaFrom,
        filterAreaTo,
        filterRooms
    ]);

    const resultsCount = filteredComplexes.length;

    const filteredSellers = useMemo(() => {
        const setOfSellers = new Set<string>();
        filteredComplexes.forEach(c => {
            if (c.seller) setOfSellers.add(c.seller);
        });
        return Array.from(setOfSellers);
    }, [filteredComplexes]);

    const filteredPropertyTypes = useMemo(() => {
        const setOfTypes = new Set<string>();
        filteredComplexes.forEach(c => {
            const typeName = c.type?.[`name_${loc}` as keyof ComplexType];
            if (typeName) setOfTypes.add(typeName);
        });
        return Array.from(setOfTypes);
    }, [filteredComplexes, loc]);
    


    const handleShowResults = () => {
        setIsModalOpen(false);
        const element = document.getElementById("list-buildings");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleRoomsChange = (newRooms: string[]) => {
        setFilterRooms(newRooms);
    };

    const allAddresses = useMemo(() => {
        const addrSet = new Set<string>();
        complexes.forEach(c => {
            if (c.district?.name_ru) addrSet.add(c.district.name_ru);
            if (c.district?.name_uz) addrSet.add(c.district.name_uz);
            if (c.district?.name_en) addrSet.add(c.district.name_en);
        });
        return Array.from(addrSet);
    }, [complexes]);

    useEffect(() => {
        if (filterAddress && filterAddress.trim().length > 0) {
            const query = filterAddress.toLowerCase();
            const suggestions = allAddresses
                .filter(addr => addr.toLowerCase().includes(query))
                .slice(0, 10);
            setAddressSuggestions(suggestions);
        } else {
            setAddressSuggestions([]);
        }
    }, [filterAddress, allAddresses]);

    const handleAddressSelect = (selected: string) => {
        setFilterAddress(selected);
        setAddressSuggestions([]);
    };

    const components: Record<ButtonLabels, JSX.Element> = {
        buy: (
            <>
                {/* Desktop */}
                <BuyForm
                    className="hidden slg:block"
                    type={filterType}
                    onTypeChange={setFilterType}
                    onShowResults={handleShowResults}
                    seller={filterSeller}
                    onSellerChange={setFilterSeller}
                    sellers={filteredSellers}
                    propertyTypes={filteredPropertyTypes}
                    address={filterAddress}
                    onAddressChange={setFilterAddress}
                    priceFrom={filterPriceFrom}
                    onPriceFromChange={setFilterPriceFrom}
                    priceTo={filterPriceTo}
                    onPriceToChange={setFilterPriceTo}
                    areaFrom={filterAreaFrom}
                    onAreaFromChange={setFilterAreaFrom}
                    areaTo={filterAreaTo}
                    onAreaToChange={setFilterAreaTo}
                    rooms={filterRooms}
                    onRoomsChange={handleRoomsChange}
                    results={resultsCount}
                    addressSuggestions={addressSuggestions}
                    onAddressSelect={handleAddressSelect}
                />
            </>
        ),
        sell: (
            <>
                {/* Desktop */}
                <Sell className="hidden slg:block" />
            </>
        ),
        rent: (
            <>
                {/* Desktop */}
                <ToRentOut className="hidden slg:block" />
            </>
        ),
    };

    const additionalComponents: Record<ButtonLabels, JSX.Element[]> = {
        buy: [
            <BlockCardsBuy key="BlockCardsBuy" />,
            <InfoReviewsBuy key="InfoReviewsBuy" />,
            <ListBuildings key="ListBuildings" locale={loc} complexes={filteredComplexes} />,
            <ShemeBuy key="ShemeBuy" />,
            <BuyDock key="BuyDock" />,
            <PopularRewiewsBuy key="PopularRewiewsBuy" />,
            <Form key="form" />,
            <Contacts key="contacts" />,
        ],
        sell: [
            <BlockCardsSell key="BlockCardsSell" />,
            <InfoReviewsSell key="InfoReviewsSell" />,
            <SellForm key="SellForm" />,
            <ShemeSell key="ShemeSell" />,
            <SellDock key="SellDock" />,
            <PopularRewiewsSell key="PopularRewiewsSell" />,
            <Form key="form" />,
            <Contacts key="contacts" />,
        ],
        rent: [
            <BlockCardsRent key="BlockCardsRent" />,
            <InfoReviewsRent key="InfoReviewsRent" />,
            <RentForm key="RentForm" />,
            <ShemeRent key="ShemeRent" />,
            <RentDock key="RentDock" />,
            <PopularRewiewsRent key="PopularRewiewsRent" />,
            <Form key="form" />,
            <Contacts key="contacts" />,
        ],
    };


    const renderMobileForm = () => {
        switch (activeButton) {
            case "buy":
                return (
                    <BuyFormMobile
                        onClose={() => setIsModalOpen(false)}
                        onShowResults={handleShowResults}
                        type={filterType}
                        onTypeChange={setFilterType}
                        seller={filterSeller}
                        onSellerChange={setFilterSeller}
                        sellers={filteredSellers}
                        propertyTypes={filteredPropertyTypes}
                        address={filterAddress}
                        onAddressChange={setFilterAddress}
                        priceFrom={filterPriceFrom}
                        onPriceFromChange={setFilterPriceFrom}
                        priceTo={filterPriceTo}
                        onPriceToChange={setFilterPriceTo}
                        areaFrom={filterAreaFrom}
                        onAreaFromChange={setFilterAreaFrom}
                        areaTo={filterAreaTo}
                        onAreaToChange={setFilterAreaTo}
                        rooms={filterRooms}
                        onRoomsChange={handleRoomsChange}
                        results={resultsCount}
                        addressSuggestions={addressSuggestions}
                        onAddressSelect={handleAddressSelect}
                    />
                );
            case "sell":
                return <SellFormMobile onClose={() => setIsModalOpen(false)} />;
            case "rent":
                return <RentFormMobile onClose={() => setIsModalOpen(false)} />;
            default:
                return null;
        }
    };

    return (
        <div className="relative w-full h-auto flex flex-col mx-auto">
            <div className="relative w-full">
                {/* Mobile Image */}
                <Image
                    src={photo1}
                    quality={100}
                    alt="Banner mobile Image"
                    layout="responsive"
                    className="w-full h-auto max-h-screen min-h-[728px] object-cover slg:hidden"
                />
                {/* Desktop Image */}
                <Image
                    src={photo2}
                    quality={100}
                    alt="Banner PC Image"
                    layout="responsive"
                    className="w-full h-full max-h-[800px] min-h-[728px] slg:min-h-[900px] 2xl:min-h-[800px] object-cover hidden slg:block"
                />

                <div className="absolute inset-0 w-full flex flex-col max-slg:justify-between items-center text-white max-w-[1440px] mx-auto slg:px-[15px] 3xl:px-0">
                    {/* Main Text */}
                    <div className="text-center max-slg:max-w-[456px] mt-[141px] mdx:mt-[75px]">
                        <h1 className="text-[30px] font-medium mdx:text-[45px] xl:text-[55px] leading-[38px] mdx:leading-[50px]">
                        {t("mainTitle")}
                        </h1>
                        <h5 className="text-[14px] mdx:text-[20px] mt-2">
                        {t("subtitle")}
                        </h5>
                    </div>

                    {/* MOBILE MENU */}
                    <div className="mt-[293px] mdx:mt-[326px] h-full w-full slg:hidden text-[20px] font-medium">
                        {buttonLabels.map((label, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center px-4 border-t border-gray-400 cursor-pointer w-full py-[17px]"
                                onClick={() => handleButtonClick(label)}
                            >
                                <span className="text-lg">{t(label)}</span>
                                <Image
                                    src={arrowRightWhite}
                                    quality={100}
                                    alt="Arrow icon"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Desktop MENU */}
                    <div className="w-full h-full max-h-[61px] hidden slg:block mt-[40px] mb-[12px]">
                        <div className="w-full h-full max-h-[61px] backdrop-blur-7.5 grid grid-cols-3 text-[20px] font-semibold gap-[10px] p-[4px] ">
                        {buttonLabels.map((label, index) => (
                                <button
                                    key={index}
                                    className={`${activeButton === label
                                        ? "bg-white text-[#333333]"
                                        : "bg-transparent text-[#fff]"
                                        } max-h-[53px] h-full w-full mx-auto hover:text-[#333333] hover:bg-white hover:bg-opacity-80 transition duration-300 ease-in-out`}
                                    onClick={() => setActiveButton(label)}
                                >
                                    {t(label)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Desktop Forms */}
                    {components[activeButton]}
                </div>

                {/* Additional Components */}
                {additionalComponents[activeButton].map((Comp, idx) => (
                    <div
                        key={idx}
                        id={Comp.key === "ListBuildings" ? "list-buildings" : undefined}
                        className="w-full mt-[120px] mdx:mt-[150px] xl:mt-[200px] mb-[120px] mdx:mb-[150px] xl:mb-[200px] mx-auto relative z-[999999]"
                    >
                        {Comp}
                    </div>
                ))}
            </div>

            {/* Modal for Mobile Forms */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black bg-opacity-50 h-screen">
                    <div className="bg-white w-full h-screen relative overflow-y-auto">
                        {renderMobileForm()}
                    </div>
                </div>
            )}
        </div>
    );
}

