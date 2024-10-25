import { defineType, defineField } from 'sanity';

export const layouts = defineType({
  name: 'layouts',
  title: 'Планировка',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название Планировки',
      type: 'object',
      fields: [
        defineField({ name: 'ru', title: 'Заголовок во внутренней странице (Русский)', type: 'string' }),
        defineField({ name: 'uz', title: 'Заголовок во внутренней странице (Узбекский)', type: 'string' }),
        defineField({ name: 'en', title: 'Заголовок во внутренней странице (Английский)', type: 'string' }),
      ],
      description: 'Заголовок во внутренней странице комплекса на разных языках',
    }),
    defineField({
      name: 'image',
      title: 'Изображение Планировки',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'floor',
      title: 'Этаж',
      type: 'reference',
      to: [{ type: 'floorFilter' }],
    }),
    defineField({
      name: 'home',
      title: 'Дом',
      type: 'string'
    }),
    defineField({
      name: 'entrance',
      title: 'Подъезд',
      type: 'string'
    }),
    defineField({
      name: 'price',
      title: 'Цена',
      type: 'string',
      description: 'Строка с ценой для отображения',
    }),
    defineField({
      name: 'rooms',
      title: 'Количество Комнат',
      type: 'reference',
      to: [{ type: 'roomsFilter' }],
    }),
    defineField({
      name: 'residentialComplex',
      title: 'Жилой Комплекс',
      type: 'reference',
      to: [{ type: 'residentialComplex' }],
    }),
  ],
});
