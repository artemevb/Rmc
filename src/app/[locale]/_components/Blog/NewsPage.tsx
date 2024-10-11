"use client"
import axios from 'axios'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Photo {
    url?: string;
}

interface NewsOption {
    title?: string;
    description?: string;
    photo?: Photo;
}

interface News {
    createdDate?: string;
    options?: NewsOption[];
}

interface NewsCompProps {
    locale: string;
}

export default function NewsTitle({ locale }: NewsCompProps) {

    const [news, setNews] = useState<News | null>(null)
    const { slug } = useParams()

    useEffect(() => {
        const fetchNewsWithSlug = async () => {
            try {
                const response = await axios.get(
                    `https://rmc.mrjtrade.uz/api/blog/get-by-slug/${slug}`,
                    {
                        headers: { 'Accept-Language': locale },
                    }
                )
                setNews(response.data.data)
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    console.error('Failed to fetch news:', error.message)
                } else {
                    console.error('Failed to fetch news:', error)
                }
                setNews(null) // Reset state if fetching fails
            }
        }
        fetchNewsWithSlug()
    }, [locale, slug])

    const formatTextWithNewlines = (text: string): JSX.Element[] => {
        return text.split('\n').map((line: string, index: number) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ))
    }

    if (!news) return <div>Loading...</div> // Loading state or error handling
    return (
        <div className="w-full max-w-[954px] mx-auto flex gap-6 px-4">
            {/* Main news content */}
            <div className="w-full">
                <div className="mt-4">
                    {news.createdDate && (
                        <p className="text-[#E1AF93] text-[16px] mdx:text-[18px] xl:text-[20px]">
                            {new Date(news.createdDate).toLocaleDateString(locale, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    )}
                </div>

                {/* Rendering options array */}
                {news.options?.map((item: NewsOption, index: number) => (
                    <div className="mb-[140px]" key={index}>
                        {item.title && (
                            <h3 className="text-[30px] mdx:text-[45px] xl:text-[55px] lh font-medium mb-[16px] text-[#252324]">
                                {formatTextWithNewlines(item.title)}
                            </h3>
                        )}

                        {item.photo?.url && (
                            <div className="mt-[30px] mb-[10px] flex flex-row justify-center">
                                <Image
                                    src={item.photo.url}
                                    width={1000}
                                    height={1000}
                                    quality={100}
                                    alt={`News Image`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        {item.description && (
                            <div >
                                <p className="text-[16px] mdx:text-[20px] py-[15px]">
                                    {formatTextWithNewlines(item.description)}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
