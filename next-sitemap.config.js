/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://californiataxcalculators.com',
  generateRobotsTxt: true, // سيقوم بتوليد ملف robots.txt تلقائياً
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/', // السماح لعناكب البحث بالوصول لكل الموقع
      },
    ],
    // إضافة مسار خريطة الموقع داخل robots.txt
    additionalSitemaps: [
      'https://californiataxcalculators.com/sitemap.xml',
    ],
  },
  exclude: ['/404'], // استبعاد صفحات الأخطاء من خريطة الموقع
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
}