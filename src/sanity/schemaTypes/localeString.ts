// schemas/localeString.js

import { defineType, defineField } from 'sanity';

const localeString = defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({ name: 'ru', type: 'string', title: 'Russian' }),
    defineField({ name: 'uz', type: 'string', title: 'Uzbek' }),
    defineField({ name: 'en', type: 'string', title: 'English' }),
  ],
});

export default localeString;


