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

export type PostResponse = {
  title: string;
  slug: string;
  publishDate: string;
  content: string;
  category: any[];
};

export type PostListResponse = ListContentsResponse<PostResponse>;

export type CategoryResponse = {
  category: string;
  categorySlug: string;
};

export type CategoryListResponse = ListContentsResponse<CategoryResponse>;
