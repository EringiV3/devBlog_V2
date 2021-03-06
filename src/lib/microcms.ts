import { createClient } from 'microcms-js-sdk';
import type { ListContentPaginationInfo, PostResponse } from '../types';

export const microcmsClient = createClient({
  serviceDomain: process.env.MICRO_CMS_SERVICE_DOMAIN ?? '',
  apiKey: process.env.MICRO_CMS_API_KEY ?? '',
});

// TODO: テスト書く
export const getAllContents = async <T extends ListContentPaginationInfo>(
  endPoint: string,
  filters?: string
): Promise<T[]> => {
  const LIMIT = 10;
  const firstContent = await microcmsClient.get<T>({
    endpoint: endPoint,
    queries: {
      offset: 0,
      limit: LIMIT,
      filters,
    },
  });

  const queries: { offset: number; limit: number }[] = [];
  let index = 1;
  while (firstContent.totalCount - LIMIT * index > 0) {
    queries.push({ offset: LIMIT * index, limit: LIMIT });
    index++;
  }

  const contents = await Promise.all(
    queries.map((query) =>
      microcmsClient.get<T>({
        endpoint: endPoint,
        queries: {
          offset: query.offset,
          limit: query.limit,
          filters,
        },
      })
    )
  );

  return [firstContent, ...contents];
};

export const isMicrocmsPost = (content: any): content is PostResponse => {
  return content.slug !== undefined;
};
