// schemas/section.js
import { defineType, defineField } from 'sanity';

export const sectionForCondition =  defineType({
  name: 'section',
  title: 'Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required().error('Heading is required'),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error('At least one content block is required'),
    }),
  ],
});
