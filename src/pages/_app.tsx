import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { seoConfig } from '../config/seo';
import '../global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <DefaultSeo {...seoConfig} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
