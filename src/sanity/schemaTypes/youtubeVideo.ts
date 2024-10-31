// schemas/youtubeVideo.ts
import { defineType, defineField } from 'sanity';

export const youtubeVideo = defineType({
  name: 'youtubeVideo',
  title: 'YouTube Видео(ссылка)',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'URL YouTube',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https', 'http'],
          allowRelative: false,
        }).custom((url) => {
          const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;
          if (url && !youtubeRegex.test(url)) {
            return 'URL должен быть ссылкой на YouTube';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare(selection) {
      const { url } = selection;
      return {
        title: 'YouTube Видео',
        subtitle: url,
      };
    },
  },
});
