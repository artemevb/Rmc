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
      description: 'Альтернативный текст для изображения на разных языках',
    }),
    defineField({
      name: 'subtitle',
      title: 'Подзаголовок',
      type: 'object',
      fields: [
        defineField({ name: 'ru', title: 'Подзаголовок (Русский)', type: 'string' }),
        defineField({ name: 'uz', title: 'Подзаголовок (Узбекский)', type: 'string' }),
        defineField({ name: 'en', title: 'Подзаголовок (Английский)', type: 'string' }),
      ],
      description: 'Подзаголовок жилого комплекса на разных языках',
    }),
    defineField({
      name: 'price',
      title: 'Цена',
      type: 'string',
      description: 'Строка с ценой для отображения',
    }),
    defineField({
      name: 'priceValue',
      title: 'Значение Цены',
      type: 'number',
      description: 'Числовое значение цены',
    }),
    // Ссылка на район
    defineField({
      name: 'district',
      title: 'Район',
      type: 'reference',
      to: [{ type: 'district' }],
      description: 'Выберите район, где расположен комплекс',
    }),
    // Ссылка на тип жилья
    defineField({
      name: 'type',
      title: 'Тип Жилья',
      type: 'reference',
      to: [{ type: 'housingType' }],
      description: 'Выберите тип недвижимости',
    }),
    // Ссылка на количество комнат
    defineField({
      name: 'rooms',
      title: 'Количество Комнат',
      type: 'reference',
      to: [{ type: 'rooms' }],
      description: 'Выберите количество комнат',
    }),
    // Ссылка на срок завершения
    defineField({
      name: 'completionTime',
      title: 'Срок Завершения',
      type: 'reference',
      to: [{ type: 'completionTime' }],
      description: 'Выберите срок завершения проекта',
    }),
    defineField({
      name: 'slug',
      title: 'Сулугуни',
      type: 'slug',
      options: {
        source: 'subtitle',
        maxLength: 96,
      },
      description: 'Уникальный идентификатор страницы комплекса',
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
      title: 'Заголовок во внутренней странице',
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
      title: 'Описание жилого комплекса',
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
      title: "Фотогалерея и видеотуры (mp4)",
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          }
        },
        {
          type: 'file',
          options: {
            accept: 'video/*',
          }
        }
      ]
    }),
  ],
});
