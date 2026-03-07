/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://californiataxcalculators.com',
  generateRobotsTxt: true, // ستقوم المكتبة تلقائياً بربط الخريطة داخل robots.txt
  exclude: ['/404'], // استبعاد صفحات الأخطاء
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
}