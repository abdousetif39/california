/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.californiataxcalculators.com',
  generateRobotsTxt: true,
  exclude: ['/404'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://www.californiataxcalculators.com/sitemap.xml',
    ],
  },
}