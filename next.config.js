/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    MICRO_CMS_SERVICE_DOMAIN: process.env.MICRO_CMS_SERVICE_DOMAIN,
    MICRO_CMS_API_KEY: process.env.MICRO_CMS_API_KEY,
  },
  reactStrictMode: true,
};
