import { defineType, defineField } from 'sanity';

export const floorFilter = defineType({
  name: 'floorFilter',
  title: 'Фильтр Этаж',
  type: 'document',
  fields: [
    defineField({
      name: 'floor',
      title: 'Этаж',
      type: 'number',
    }),
  ],
});
