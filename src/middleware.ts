import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['ru', 'uz', 'en'],
 
  defaultLocale: 'en'
});
 
export const config = {
  matcher: ['/', '/(en|uz|ru)/:path*']
};