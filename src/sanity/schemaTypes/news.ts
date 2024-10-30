import { defineField, defineType } from 'sanity';

export const newsType = defineType({
  name: 'news',
  title: 'Новости',
  type: 'document',
  fields: [
    // Поле для слага
    defineField({
      name: 'slug',
      title: 'Ссылка на страницу (url адрес страницы)',
      type: 'slug',
      options: {
        source: 'title.ru', // Используем русскую версию заголовка для генерации слага
        maxLength: 96,
      },
    }),
    // Поле для заголовка на трех языках
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'object',
      fields: [
        defineField({
          name: 'ru',
          title: 'Русский',
          type: 'string',
          validation: Rule => Rule.required().error('Русский заголовок обязателен'),
        }),
        defineField({
          name: 'uz',
          title: 'Узбекский',
          type: 'string',
          validation: Rule => Rule.required().error('Узбекский заголовок обязателен'),
        }),
        defineField({
          name: 'en',
          title: 'Английский',
          type: 'string',
          validation: Rule => Rule.required().error('Английский заголовок обязателен'),
        }),
      ],
    }),
    // Поле для даты публикации
    defineField({
      name: 'date',
      title: 'Дата публикации',
      type: 'datetime',
    }),
    // Поле для счётчика просмотров
    defineField({
      name: 'viewCounter',
      title: 'Просмотры',
      type: 'number',
      initialValue: 0,
    }),
    // Поле для основного изображения
    defineField({
      name: 'mainImage',
      title: 'Основное изображение',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    // Поле для контента на внутренней странице
    defineField({
      name: 'content',
      title: 'Контент (Все что здесь, будет отображаться внутри страницы)',
      type: 'array',
      of: [
        // Текстовый блок с поддержкой трех языков
        defineField({
          name: 'textBlock',
          title: 'Текстовый блок',
          type: 'object',
          fields: [
            // Подзаголовок на трех языках
            defineField({
              name: 'subtitle',
              title: 'Подзаголовок',
              type: 'object',
              fields: [
                defineField({
                  name: 'ru',
                  title: 'Русский',
                  type: 'string',
                }),
                defineField({
                  name: 'uz',
                  title: 'Узбекский',
                  type: 'string',
                }),
                defineField({
                  name: 'en',
                  title: 'Английский',
                  type: 'string',
                }),
              ],
            }),
            // Описание на трех языках
            defineField({
              name: 'description',
              title: 'Описание',
              type: 'object',
              fields: [
                defineField({
                  name: 'ru',
                  title: 'Русский',
                  type: 'text',
                }),
                defineField({
                  name: 'uz',
                  title: 'Узбекский',
                  type: 'text',
                }),
                defineField({
                  name: 'en',
                  title: 'Английский',
                  type: 'text',
                }),
              ],
            }),
          ],
        }),
        // Изображение
        defineField({
          name: 'image',
          title: 'Изображение',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        // Если в будущем потребуется добавить другие типы контента, их можно добавить здесь
      ],
    }),
  ],
});
