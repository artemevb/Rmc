// schemas/rooms.ts

import { defineType, defineField } from 'sanity';

export const rooms = defineType({
  name: 'rooms',
  title: 'Количество Комнат',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Количество',
      type: 'string',
    }),
    defineField({
      name: 'number_ru',
      title: 'Количество (Русский)',
      type: 'string',
    }),
    defineField({
      name: 'number_uz',
      title: 'Количество (Узбекский)',
      type: 'string',
    }),
    defineField({
      name: 'number_en',
      title: 'Количество (Английский)',
      type: 'string',
    }),
  ],
});
