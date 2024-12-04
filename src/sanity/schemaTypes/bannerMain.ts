import { defineType, defineField } from 'sanity';

export const bannerMain = defineType({
    name: 'slider',
    title: 'Слайдер на главной странице (первый по счету)',
    type: 'document',
    fields: [
        defineField({
            name: 'slides',
            title: 'Slides',
            type: 'array',
            of: [
                defineField({
                    type: 'object',
                    name: 'slide',
                    title: 'Slide',
                    fields: [
                        defineField({
                            name: 'image',
                            title: 'Фото слайда',
                            type: 'image',
                            options: { hotspot: true },
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'title',
                            title: 'Заголовок',
                            type: 'object',
                            fields: [
                                defineField({
                                    name: 'ru',
                                    title: 'Russian',
                                    type: 'string',
                                    validation: (Rule) => Rule.required().max(100),
                                }),
                                defineField({
                                    name: 'uz',
                                    title: 'Uzbek',
                                    type: 'string',
                                    validation: (Rule) => Rule.required().max(100),
                                }),
                                defineField({
                                    name: 'en',
                                    title: 'English',
                                    type: 'string',
                                    validation: (Rule) => Rule.required().max(100),
                                }),
                            ],
                        }),
                        defineField({
                            name: 'description',
                            title: 'Подзаголовок',
                            type: 'object',
                            fields: [
                                defineField({
                                    name: 'ru',
                                    title: 'Russian',
                                    type: 'text',
                                    validation: (Rule) => Rule.required().max(500),
                                }),
                                defineField({
                                    name: 'uz',
                                    title: 'Uzbek',
                                    type: 'text',
                                    validation: (Rule) => Rule.required().max(500),
                                }),
                                defineField({
                                    name: 'en',
                                    title: 'English',
                                    type: 'text',
                                    validation: (Rule) => Rule.required().max(500),
                                }),
                            ],
                        }),
                        defineField({
                            name: 'buttonText', 
                            title: 'Текст кнопки',
                            type: 'object',
                            fields: [
                                defineField({
                                    name: 'ru',
                                    title: 'Russian',
                                    type: 'string',
                                    validation: (Rule) => Rule.required().max(100),
                                }),
                                defineField({
                                    name: 'uz',
                                    title: 'Uzbek',
                                    type: 'string',
                                    validation: (Rule) => Rule.required().max(100),
                                }),
                                defineField({
                                    name: 'en',
                                    title: 'English',
                                    type: 'string',
                                    validation: (Rule) => Rule.required().max(100),
                                }),
                            ],
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title.ru',
                            media: 'image',
                        },
                    },
                }),
            ],
            validation: (Rule) => Rule.min(1).max(25),
        }),
    ],
});
