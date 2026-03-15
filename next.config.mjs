/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // تطبيق حماية الأمان على جميع مسارات الموقع
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // يمنع سرقة نقرات الموقع (Clickjacking)
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload', // يفرض اتصال HTTPS قوي (HSTS)
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin', // يعزل النطاق بشكل صحيح (COOP)
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // يمنع المتصفح من تخمين نوع الملفات
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin', // حماية إضافية للروابط
          }
        ],
      },
    ];
  },
};

module.exports = nextConfig;