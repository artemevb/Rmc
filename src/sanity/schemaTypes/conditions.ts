import { defineType, defineField } from 'sanity';

export const conditions = defineType({
  name: 'conditionsSection',
  title: 'Conditions Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main title of the section',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              description: 'H4 title for the section',
            }),
            defineField({
              name: 'paragraphs',
              title: 'Paragraphs',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Paragraphs under the heading',
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
        },
      ],
    }),
    // Добавляем поле-ссылку на residentialComplex
    defineField({
      name: 'to',
      title: 'Related Residential Complex',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'residentialComplex' }] }],
      description: 'Residential Complexes related to this conditions section',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
