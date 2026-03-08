import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['sq', 'ru', 'en'],
  defaultLocale: 'sq',
  localePrefix: 'always',
});
