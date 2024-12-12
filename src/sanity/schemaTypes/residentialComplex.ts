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
      description: 'Альтернативный текст для изображения на разных языках (важен для seo оптимизации)',
    }),
    defineField({
      name: 'seller',
      title: 'Продавец',
      type: 'string',
      description: 'Название продавца ',
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
      description: 'Строка с ценой для отображения (валюта пишется здесь($ или сум и др.), (Пример: От 700 000$)',
    }),
    defineField({
      name: 'priceValue',
      title: 'Значение Цены',
      type: 'number',
      description: 'Здесь пишется только числовое значение цены (Пример: 700000)',
    }),
    defineField({
      name: 'district',
      title: 'Район',
      type: 'reference',
      to: [{ type: 'district' }],
      description: 'Выберите район, где расположен комплекс',
    }),
    defineField({
      name: 'type',
      title: 'Тип Жилья',
      type: 'reference',
      to: [{ type: 'housingType' }],
      description: 'Выберите тип недвижимости',
    }),
    defineField({
      name: 'rooms',
      title: 'Количество Комнат',
      type: 'reference',
      to: [{ type: 'rooms' }],
      description: 'Выберите количество комнат',
    }),
    defineField({
      name: 'completionTime',
      title: 'Срок Завершения',
      type: 'reference',
      to: [{ type: 'completionTime' }],
      description: 'Выберите срок завершения проекта',
    }),
    defineField({
      name: 'slug',
      title: 'url ссылка для страницы',
      type: 'slug',
      options: {
        source: 'subtitle',
        maxLength: 96,
      },
      description: 'Уникальный url идентификатор страницы комплекса',
    }),
    defineField({
      name: 'gallery',
      title: "Главный слайдер-1",
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          }
        }
      ]
    }),
    defineField({
      name: 'gallery_2',
      title: "Слайдер-2",
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          }
        }
      ]
    }),
    defineField({
      name: 'subtitle_main',
      title: 'Заголовок во внутренней странице (пример: Infinity Клубный дом)',
      type: 'object',
      fields: [
        defineField({ name: 'ru', title: 'Заголовок во внутренней странице (Русский)', type: 'string' }),
        defineField({ name: 'uz', title: 'Заголовок во внутренней странице (Узбекский)', type: 'string' }),
        defineField({ name: 'en', title: 'Заголовок во внутренней странице (Английский)', type: 'string' }),
      ],
      description: 'Заголовок во внутренней странице комплекса на разных языках',
    }),
    defineField({
      name: 'desc_main',
      title: 'Описание жилого комплекса (не более 308 символов)',
      type: 'object',
      fields: [
        defineField({ name: 'ru', title: 'Описание жилого комплекса (Русский)', type: 'string' }),
        defineField({ name: 'uz', title: 'Описание жилого комплекса (Узбекский)', type: 'string' }),
        defineField({ name: 'en', title: 'Описание жилого комплекса (Английский)', type: 'string' }),
      ],
      description: 'Описание жилого комплекса на разных языках',
    }),
    defineField({
      name: 'gallery_3',
      title: "Фотогалерея и видеотуры (ссылка с ютуба)",
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          }
        },
        {
          type: 'youtubeVideo',
        },
      ]
    }),
  ],
  preview: {
    select: {
      title: 'subtitle.ru', // Показываем подзаголовок на русском языке
      media: 'mainImage', // Для превью используем основное изображение
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: title || 'Без названия', // Если подзаголовок пустой, выводим "Без названия"
        media: media, // Показываем изображение в списке
      };
    },
  },
});
