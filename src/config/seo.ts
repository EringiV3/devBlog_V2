import type { NextSeoProps } from 'next-seo';

export const seoConfig: NextSeoProps = {
  openGraph: {
    type: 'website',
    locale: 'js_jp',
    url: 'https://www.eringiv3.dev',
    site_name: 'eringiv3.dev',
  },
  twitter: {
    handle: '@Eringi_V3',
    site: '@Eringi_V3',
    cardType: 'summary_large_image',
  },
};
