// schemas/infrastructure.js

import { defineType, defineField } from 'sanity';

export const infrastructure = defineType({
  name: 'infrastructure',
  title: 'Инфраструктура района(внутрення страница новостройки)',
  type: 'document',
  fields: [
    defineField({
      name: 'markets',
      title: 'Магазины ',
      type: 'object',
      fields: [
        defineField({
          name: 'description',
          title: 'Описание (для поля "Магазины")',
          type: 'localeString',
        }),
        defineField({
          name: 'items',
          title: 'Название и время ',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'Подпункты для поля "Магазины" ',
              title: 'Market Item',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Название (Пример: Havas)',
                  type: 'localeString',
                }),
                defineField({
                  name: 'time',
                  title: 'время (Время до магазина)',
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
                  title: 'Название подпункта (Пример: Шахристан)',
                  type: 'localeString',
                }),
                defineField({
                  name: 'time',
                  title: 'Время до подпункта (Пример: 15минут)',
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
                  title: 'Название подпункта (Пример: 187)',
                  type: 'localeString',
                }),
                defineField({
                  name: 'time',
                  title: 'Время до подпункта (Пример: 5минут)',
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
