import { defineType, defineField } from 'sanity';

// Main schema for categories (stores, transport, schools)
export const categorySchema = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'store' }, { type: 'school' }, { type: 'transport' }] }],
    }),
  ],
});

// Schema for Stores
export const storeSchema = defineType({
  name: 'store',
  title: 'Store',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Store Name',
      type: 'string',
    }),
    defineField({
      name: 'distance',
      title: 'Distance (in minutes)',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});

// Schema for Schools
export const schoolSchema = defineType({
  name: 'school',
  title: 'School',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'School Name',
      type: 'string',
    }),
    defineField({
      name: 'distance',
      title: 'Distance (in minutes)',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});

// Schema for Transport
export const transportSchema = defineType({
  name: 'transport',
  title: 'Transport',
  type: 'document',
  fields: [
    defineField({
      name: 'station',
      title: 'Station Name',
      type: 'string',
    }),
    defineField({
      name: 'distance',
      title: 'Distance (in minutes)',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});
