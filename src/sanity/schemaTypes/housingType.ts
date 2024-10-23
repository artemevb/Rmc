// schemas/housingType.ts

import { defineType, defineField } from 'sanity';

export const housingType = defineType({
  name: 'housingType',
  title: 'Тип Жилья',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Название',
      type: 'string',
    }),
    defineField({
      name: 'name_ru',
      title: 'Название (Русский)',
      type: 'string',
    }),
    defineField({
      name: 'name_uz',
      title: 'Название (Узбекский)',
      type: 'string',
    }),
    defineField({
      name: 'name_en',
      title: 'Название (Английский)',
      type: 'string',
    }),
  ],
});
