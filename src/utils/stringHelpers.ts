import cheerio from 'cheerio';

export const formatPostContentForHeading = (content: string) => {
  return content.substring(0, 100);
};

export const htmlToNode = (htmlString: string) => {
  const $ = cheerio.load(htmlString);
  return $.text();
};
