// schemas/completionTime.ts

import { defineType, defineField } from 'sanity';

export const completionTime = defineType({
  name: 'completionTime',
  title: 'Срок Завершения',
  type: 'document',
  fields: [
    defineField({
      name: 'term',
      title: 'Срок',
      type: 'string',
    }),
    defineField({
      name: 'term_ru',
      title: 'Срок (Русский)',
      type: 'string',
    }),
    defineField({
      name: 'term_uz',
      title: 'Срок (Узбекский)',
      type: 'string',
    }),
    defineField({
      name: 'term_en',
      title: 'Срок (Английский)',
      type: 'string',
    }),
  ],
});
