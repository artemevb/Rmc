import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'localeText',
  type: 'object',
  fields: [
    defineField({ name: 'ru', type: 'text', title: 'Russian' }),
    defineField({ name: 'uz', type: 'text', title: 'Uzbek' }),
    defineField({ name: 'en', type: 'text', title: 'English' }),
  ],
});
