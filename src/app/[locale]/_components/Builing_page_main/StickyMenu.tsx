"use client";
import React, { useEffect, useState } from 'react';

const StickyMenu = () => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const handleScroll = () => {
        const sections = document.querySelectorAll('section');
        let currentSection = activeSection;

        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= window.innerHeight / 2) {
                currentSection = section.id;
            }
        });

        if (currentSection !== activeSection) {
            setActiveSection(currentSection);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Инициализация текущей секции
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [activeSection]);

    const handleScrollToSection = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, sectionId: string) => {
        event.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="sticky top-0 bg-white border-b z-50 max-w-[1440px] w-full mx-auto overflow-x-auto hide-scrollbar">
            <ul className="flex items-center justify-between gap-[30px] mdx:gap-[120px] xl:justify-around p-4 text-[16px] mdx:text-[20px] w-full whitespace-nowrap pb-[25px] mdx:pb-[30px]">
                <li className="flex-shrink-0">
                    <a
                        href="#section1"
                        className={`w-full ${activeSection === "section1" ? "text-[#E1AF93] pb-[25px] mdx:pb-[30px] border-b-2 border-[#E1AF93]" : "text-gray-700"
                            } hover:text-[#E1AF93]`}
                        onClick={(e) => handleScrollToSection(e, 'section1')}
                    >
                        О комплексе
                    </a>
                </li>
                <li className="flex-shrink-0">
                    <a
                        href="#section2"
                        className={`w-full ${activeSection === "section2" ? "text-[#E1AF93] pb-[25px] mdx:pb-[30px] border-b-2 border-[#E1AF93] " : "text-gray-700"
                            } hover:text-[#E1AF93]`}
                        onClick={(e) => handleScrollToSection(e, 'section2')}
                    >
                        Галерея
                    </a>
                </li>
                <li className="flex-shrink-0">
                    <a
                        href="#section3"
                        className={`w-full ${activeSection === "section3" ? "text-[#E1AF93] pb-[25px] mdx:pb-[30px] border-b-2 border-[#E1AF93]" : "text-gray-700"} hover:text-[#E1AF93]`}
                        onClick={(e) => handleScrollToSection(e, 'section3')}
                    >
                        Планировки
                    </a>
                </li>
                <li className="flex-shrink-0">
                    <a
                        href="#section4"
                        className={`w-full ${activeSection === "section4" ? "text-[#E1AF93] pb-[25px] mdx:pb-[30px] border-b-2 border-[#E1AF93]" : "text-gray-700"
                            } hover:text-[#E1AF93]`}
                        onClick={(e) => handleScrollToSection(e, 'section4')}
                    >
                        Условия покупки
                    </a>
                </li>
                <li className="flex-shrink-0">
                    <a
                        href="#section5"
                        className={`w-full ${activeSection === "section5" ? "text-[#E1AF93] pb-[25px] mdx:pb-[30px] border-b-2 border-[#E1AF93]" : "text-gray-700"
                            } hover:text-[#E1AF93]`}
                        onClick={(e) => handleScrollToSection(e, 'section5')}
                    >
                        Инфраструктура
                    </a>
                </li>
                <li className="flex-shrink-0">
                    <a
                        href="#section6"
                        className={`w-full ${activeSection === "section6" ? "text-[#E1AF93] pb-[25px] mdx:pb-[30px] border-b-2 border-[#E1AF93]" : "text-gray-700"
                            } hover:text-[#E1AF93]`}
                        onClick={(e) => handleScrollToSection(e, 'section6')}
                    >
                        Отзывы
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default StickyMenu;
