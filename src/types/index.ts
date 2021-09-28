export type ListContentPaginationInfo = {
  totalCount: number;
  offset: number;
  limit: number;
};
export type ListContentsResponse<T> = {
  contents: T[];
} & ListContentPaginationInfo;

export type ContentResponse<T> = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  revisedAt?: string;
} & T;

export type PostResponse = ContentResponse<{
  title: string;
  slug: string;
  publishDate: string;
  content: string;
  category: CategoryResponse[];
}>;

export type PostListResponse = ListContentsResponse<PostResponse>;

export type CategoryResponse = ContentResponse<{
  category: string;
  slug: string;
}>;

export type CategoryListResponse = ListContentsResponse<CategoryResponse>;

export type OgpResponse = ContentResponse<{
  image: {
    url: string;
    width: number;
    height: number;
  };
}>;

export type ZennFeedItem = {
  content: string;
  contentSnippet: string;
  creator: string;
  'dc:creator': string;
  enclosure: {
    length: string;
    type: string;
    url: string;
  };
  guid: string;
  isoDate: string;
  link: string;
  pubDate: string;
  title: string;
};
