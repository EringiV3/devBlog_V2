import type { NextSeoProps } from 'next-seo';

export const seoConfig: NextSeoProps = {
  titleTemplate: '%s | eringiv3.dev',
  defaultTitle: 'eringiv3.dev',
  openGraph: {
    type: 'website',
    locale: 'js_jp',
    url: 'https://www.eringiv3.dev',
    site_name: 'eringiv3.dev',
    images: [
      {
        url: 'https://eringiv3.dev/default-ogp.png',
        width: 1200,
        height: 630,
        alt: 'eringive.dev',
      },
    ],
  },
  twitter: {
    handle: '@Eringi_V3',
    site: '@Eringi_V3',
    cardType: 'summary_large_image',
  },
};
