// schemas/conditions.js
import { defineType, defineField } from 'sanity';

export const conditions = defineType({
    name: 'conditions',
    title: 'Условия покупки(внутренняя страница новостройки)',
    type: 'document',
    fields: [

        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'section',
                    title: 'Section',
                    fields: [
                        // Локализованные поля для заголовка (Heading)
                        defineField({
                            name: 'heading_ru',
                            title: 'Heading (RU)',
                            type: 'string',
                            validation: (Rule) => Rule.required().min(1).max(100).warning('Заголовок на русском обязателен и должен содержать не более 100 символов'),
                        }),
                        defineField({
                            name: 'heading_en',
                            title: 'Heading (EN)',
                            type: 'string',
                            validation: (Rule) => Rule.required().min(1).max(100).warning('Заголовок на английском обязателен и должен содержать не более 100 символов'),
                        }),
                        defineField({
                            name: 'heading_uz',
                            title: 'Heading (UZ)',
                            type: 'string',
                            validation: (Rule) => Rule.required().min(1).max(100).warning('Заголовок на узбекском обязателен и должен содержать не более 100 символов'),
                        }),

                        // Локализованные поля для параграфов (Paragraphs)
                        defineField({
                            name: 'paragraphs_ru',
                            title: 'Paragraphs (RU)',
                            type: 'array',
                            of: [{ type: 'text' }],
                            validation: (Rule) => Rule.required().min(1).warning('Необходимо добавить хотя бы один параграф на русском'),
                        }),
                        defineField({
                            name: 'paragraphs_en',
                            title: 'Paragraphs (EN)',
                            type: 'array',
                            of: [{ type: 'text' }],
                            validation: (Rule) => Rule.required().min(1).warning('Необходимо добавить хотя бы один параграф на английском'),
                        }),
                        defineField({
                            name: 'paragraphs_uz',
                            title: 'Paragraphs (UZ)',
                            type: 'array',
                            of: [{ type: 'text' }],
                            validation: (Rule) => Rule.required().min(1).warning('Необходимо добавить хотя бы один параграф на узбекском'),
                        }),
                    ],
                },
            ],
            validation: (Rule) => Rule.required().min(1).warning('Необходимо добавить хотя бы один раздел'),
        }),
        defineField({
            name: 'residentialComplex',
            title: 'Жилой Комплекс',
            type: 'reference',
            to: [{ type: 'residentialComplex' }],
        }),
    ],
});
