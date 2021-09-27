import { isMicrocmsPost } from '../lib/microcms';
import type { PostResponse, ZennFeedItem } from '../types';

type Item = PostResponse | ZennFeedItem;

export const sortByDate = (a: Item, b: Item) => {
  if (isMicrocmsPost(a) && isMicrocmsPost(b)) {
    return (
      +new Date(b.publishedAt as string) - +new Date(a.publishedAt as string)
    );
  } else if (isMicrocmsPost(a) && !isMicrocmsPost(b)) {
    return +new Date(b.isoDate) - +new Date(a.publishedAt as string);
  } else if (!isMicrocmsPost(a) && isMicrocmsPost(b)) {
    return +new Date(b.publishedAt as string) - +new Date(a.isoDate);
  } else if (!isMicrocmsPost(a) && !isMicrocmsPost(b)) {
    return +new Date(b.isoDate) - +new Date(a.isoDate);
  } else {
    throw new Error('Invalid type.');
  }
};
