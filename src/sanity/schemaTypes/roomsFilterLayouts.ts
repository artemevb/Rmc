import { defineType, defineField } from 'sanity';

export const roomsFilterLayouts = defineType({
  name: 'roomsFilter',
  title: 'Фильтр Количество Комнат',
  type: 'document',
  fields: [
    defineField({
      name: 'rooms',
      title: 'Количество Комнат',
      type: 'number',
    }),
  ],
});
