'use client'
import { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'

import { useTranslations } from 'next-intl';
import arrow from "@/public/svg/arrow-right-gold.svg"
import Modal from "../Modal/Reviews_equipment"

// Define the structure of a single review
interface Review {
    id: number;
    clientName: string;
    createdDate: string; // ISO date string
    comment: string;
}

export default function ReviewsSlider() {
    const t = useTranslations('Building_page_main.Reviews');

    // Initialize reviews with the defined type
    const [reviews] = useState<Review[]>([
        {
            id: 1,
            clientName: 'John Doe',
            createdDate: '2024-04-25T12:34:56Z',
            comment: 'This is an amazing service! Highly recommended to everyone looking for quality and reliability.',
        },
        {
            id: 2,
            clientName: 'Jane Smith',
            createdDate: '2024-05-10T09:21:45Z',
            comment: 'Exceptional experience from start to finish. The team was professional and attentive to our needs. Exceptional experience from start to finish. The team was professional and attentive to our needs. Exceptional experience from start to finish. The team was professional and attentive to our needs. Exceptional experience from start to finish. The team was professional and attentive to our needs.',
        },
        {
            id: 3,
            clientName: 'Acme Corp.',
            createdDate: '2024-06-15T14:50:30Z',
            comment: 'Their solutions have significantly improved our workflow. We are extremely satisfied with the results.',
        },
        // Add more fake reviews as needed
    ])

    // Define the type for the selected review (can be null)
    const [selectedReview, setSelectedReview] = useState<Review | null>(null)

    // Function to truncate the description
    const truncateDescription = (description: string): string => {
        return description.length > 327 ? `${description.substring(0, 337)}...` : description
    }

    // Function to open the modal with the selected review
    const openModal = (review: Review): void => {
        setSelectedReview(review)
    }

    // Function to close the modal
    const closeModal = (): void => {
        setSelectedReview(null)
    }

    // Function to format the date string
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}.${month}.${year}`
    }

    const settings = {
        arrows: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    }

    return (
        <div className='w-full max-w-[1440px] 5xl:max-w-[2000px] flex flex-col mx-auto'>
            <h2 className='mx-[10px] text-[30px] mdx:text-[45px] xl:text-[55px] font-medium mb-[20px]'>
                {t('title')}
            </h2>
            <div className='block'>
                {reviews.length > 1 ? (
                    <Slider {...settings}>
                        {reviews.map((card) => (
                            <div key={card.id} className='px-[8px] xl:px-[10px]'>
                                <div className='max-h-[465px] mdx:max-h-[487px] xl:max-h-[515px]'>
                                    <div className='bg-white p-4 mdx:p-[22px] py-[15px] xl:py-[25px] border border-gray-200 xl:p-5 h-full xl:h-[360px] flex flex-col justify-between'>
                                        <div>
                                            <div className='flex justify-start items-center gap-3 xl:items-start mb-4'>
                                                <div>
                                                    <p className='text-gray-400'>{formatDate(card.createdDate)}</p>
                                                    <h2 className='text-xl font-medium xl:text-[24px] mb-1 text-[#333]'>
                                                        {card.clientName}
                                                    </h2>
                                                </div>
                                            </div>
                                            <p className='mb-4 mdx:text-[18px]'>
                                                {truncateDescription(card.comment)}
                                            </p>
                                        </div>
                                        <button onClick={() => openModal(card)}>
                                            <span className='text-corporate font-semibold hover:underline mdx:text-[18px] flex mdx:justify-start items-center gap-[3px]'>
                                                {t('read-more')}
                                                <Image
                                                    src={arrow}
                                                    alt='Arrow'
                                                    quality={100}
                                                    className="object-cover h-[20px] w-[20px]"
                                                />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : reviews.length === 1 ? (
                    <div className='px-3 max-w-[700px]'>
                        <div className='max-h-[480px]'>
                            <div className='bg-white p-4 py-[15px] xl:py-[30px] border border-gray-200 xl:h-[340px] xl:p-5 flex flex-col justify-between '>
                                <div>
                                    <div className='flex justify-start items-center gap-3 xl:items-start mb-4'>
                                        <div>
                                            <h2 className='text-xl font-bold xl:text-[24px] mb-1'>
                                                {reviews[0].clientName}
                                            </h2>
                                            <p className='text-gray-400'>{formatDate(reviews[0].createdDate)}</p>
                                        </div>
                                    </div>
                                    <p className='mb-4 mdx:text-[18px] line-clamp-6'>
                                        {truncateDescription(reviews[0].comment)}
                                    </p>
                                </div>
                                <button onClick={() => openModal(reviews[0])}>
                                    <span className='text-corporate w-full font-semibold hover:underline mdx:text-[18px] flex mdx:justify-start '>
                                        {t('read-more')}
                                        <Image
                                            src={arrow}
                                            alt='Arrow'
                                            quality={100}
                                            className="object-cover h-[20px] w-[20px]"
                                        />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className='text-center'>{t('no-reviews')}</p>
                )}
            </div>
            {/* <div className='mt-[60px] flex items-center justify-center'>
                <Link
                    href={/${lng}/reviews}
                    className='px-12 py-3 transition-all text-[#fff] duration-200 bg-corporate hover:bg-[#EE787C] hover:text-[#ffffff]'
                >
                    {t('see-more')}
                </Link>
            </div> */}
            {selectedReview && <Modal selectedReview={selectedReview} closeModal={closeModal} />}
        </div>
    )
}
