/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    MICRO_CMS_SERVICE_DOMAIN: process.env.MICRO_CMS_SERVICE_DOMAIN,
    MICRO_CMS_API_KEY: process.env.MICRO_CMS_API_KEY,
    PROFILE_SITE_URL: process.env.PROFILE_SITE_URL,
    ZENN_FEED_URL: process.env.ZENN_FEED_URL,
  },
  reactStrictMode: true,
};
