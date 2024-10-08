// import {notFound} from 'next/navigation';
// import {getRequestConfig} from 'next-intl/server';
 
// // Can be imported from a shared config
// const locales = ['ru', 'uz', 'en'];
 
// export default getRequestConfig(async ({locale}) => {
//   // Validate that the incoming `locale` parameter is valid
//   if (!locales.includes(locale as any)) notFound();
 
//   return {
//     messages: (await import(`../messages/${locale}.json`)).default
//   };
// });

import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Define the allowed locales using 'as const' for literal types
const locales = ['ru', 'uz', 'en'] as const;

// Create a type that represents the allowed locale values
type Locale = typeof locales[number];

export default getRequestConfig(async ({ locale }) => {
  // Type guard to ensure 'locale' is one of the allowed locales
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Alternatively, using type assertion if you're certain 'locale' is a string
  // if (!locales.includes(locale as string)) {
  //   notFound();
  // }

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
