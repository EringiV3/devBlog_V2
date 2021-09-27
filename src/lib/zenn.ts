import Parser from 'rss-parser';
import type { ZennFeedItem } from '../types';

export const getZennFeedItems = async (): Promise<ZennFeedItem[]> => {
  const parser = new Parser();
  const feed = await parser.parseURL(process.env.ZENN_FEED_URL ?? '');
  return feed.items as any as ZennFeedItem[];
};
