// schemas/residentialComplex.ts

import { defineType, defineField } from 'sanity';

export const residentialComplex = defineType({
  name: 'residentialComplex',
  title: 'Жилой Комплекс',
  type: 'document',
  fields: [
    defineField({
      name: 'mainImage',
      title: 'Основное Изображение',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Загрузите основное изображение комплекса',
    }),
    defineField({
      name: 'alt',
      title: 'Альтернативный Текст',
      type: 'object',
      fields: [
        defineField({ name: 'ru', title: 'Alt Text (Русский)', type: 'string' }),
        defineField({ name: 'uz', title: 'Alt Text (Узбекский)', type: 'string' }),
        defineField({ name: 'en', title: 'Alt Text (Английский)', type: 'string' }),
      ],
      description: 'Альтернативный текст для изображения на разных языках(важен для seo оптимизации)',
    }),
    defineField({
      name: 'subtitle',
      title: 'Название жилого комплекса',
      type: 'object',
      fields: [
        defineField({ name: 'ru', title: 'Подзаголовок (Русский)', type: 'string' }),
        defineField({ name: 'uz', title: 'Подзаголовок (Узбекский)', type: 'string' }),
        defineField({ name: 'en', title: 'Подзаголовок (Английский)', type: 'string' }),
      ],
      description: 'Название жилого комплекса на разных языках',
    }),
    defineField({
      name: 'price',
      title: 'Цена',
      type: 'string',
      description: 'Строка с ценой для отображения (валюта пишется здесь($ или сум и др.),(Пример: От 700 000$)',
    }),
    defineField({
      name: 'priceValue',
      title: 'Значение Цены',
      type: 'number',
      description: 'Здесь пишется только числовое значение цены(Пример:700000)',
    }),
    defineField({
      name: 'district',
      title: 'Район',
      type: 'reference',
      to: [{ type: 'district' }],
      description: 'Выберите район, где расположен комплекс',
    }),
    // остальные поля...
  ],
  preview: {
    select: {
      title: 'subtitle.ru', // Выбираем подзаголовок на русском языке (или другой язык)
      media: 'mainImage', // Используем основное изображение для превью
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: title || 'Без названия', // Если подзаголовок пустой, отображается "Без названия"
        media: media,
      };
    },
  },
});
