import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import GoogleAnalytics from '../components/GoogleAnalytics';
import { seoConfig } from '../config/seo';
import '../global.css';
import { existsGaId, pageview } from '../lib/gtag';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!existsGaId) {
      return;
    }

    const handleRouteChange = (path: string) => {
      pageview(path);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <ChakraProvider>
        <DefaultSeo {...seoConfig} />
        <GoogleAnalytics />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
export default MyApp;
