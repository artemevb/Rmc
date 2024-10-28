// schemas/infrastructure.js

import { defineType, defineField } from 'sanity';

export const infrastructure = defineType({
  name: 'infrastructure',
  title: 'Инфраструктура района(внутрення страница новостройки)',
  type: 'document',
  fields: [
    defineField({
      name: 'markets',
      title: 'Магазины',
      type: 'object',
      fields: [
        defineField({
          name: 'description',
          title: 'Описание (для )',
          type: 'localeString',
        }),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'Подпункты для маркета ',
              title: 'Market Item',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Название',
                  type: 'localeString',
                }),
                defineField({
                  name: 'time',
                  title: 'время',
                  type: 'localeString',
                }),
              ],
            },
          ],
        }),
        defineField({
          name: 'images',
          title: 'Images',
          type: 'object',
          fields: [
            defineField({
              name: 'desktop',
              title: 'Image',
              type: 'image',
            }),
            // Удаляем поле для мобильного изображения
          ],
        }),
      ],
    }),
    // Повторяем аналогичные изменения для Machine и schools
    defineField({
      name: 'Machine',
      title: 'Трансопрт',
      type: 'object',
      fields: [
        defineField({
          name: 'description',
          title: 'Описание поля "Транспорт"',
          type: 'localeString',
        }),
        defineField({
          name: 'items',
          title: 'Название и время',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'machineItem',
              title: 'Transport Item',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Название подпункта',
                  type: 'localeString',
                }),
                defineField({
                  name: 'time',
                  title: 'Время до подпункта',
                  type: 'localeString',
                }),
              ],
            },
          ],
        }),
        defineField({
          name: 'images',
          title: 'Images',
          type: 'object',
          fields: [
            defineField({
              name: 'desktop',
              title: 'Image',
              type: 'image',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'schools',
      title: 'Школы',
      type: 'object',
      fields: [
        defineField({
          name: 'description',
          title: 'Описание поля "Школы"',
          type: 'localeString',
        }),
        defineField({
          name: 'items',
          title: 'Подпункты',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'schoolItem',
              title: 'School Item',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Название подпункта',
                  type: 'localeString',
                }),
                defineField({
                  name: 'time',
                  title: 'Время до подпункта',
                  type: 'localeString',
                }),
              ],
            },
          ],
        }),
        defineField({
          name: 'images',
          title: 'Images',
          type: 'object',
          fields: [
            defineField({
              name: 'desktop',
              title: 'Image',
              type: 'image',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'residentialComplex',
      title: 'Для какого комплекса (обязательно)',
      type: 'reference',
      to: [{ type: 'residentialComplex' }],
      validation: (Rule) => Rule.required().error('Это поле обязательно для заполнения'),
    }),
  ],
});
