export const GA_ID = process.env.GOOGLE_ANALYTICS_ID || '';

export const existsGaId = GA_ID !== '';

export const pageview = (path: string) => {
  window.gtag('config', GA_ID, {
    page_path: path,
  });
};
