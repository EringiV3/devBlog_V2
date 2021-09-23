import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Layout from '../../components/Layout';
import { getAllContents, microcmsClient } from '../../lib/microcms';
import { CategoryResponse, PostListResponse, PostResponse } from '../../types';

type StaticProps = {
  category: CategoryResponse;
  postList: PostResponse[];
};
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const CategoryDetail: NextPage<PageProps> = ({ category, postList }) => {
  console.log({ category, postList });
  return <Layout>categorydetail</Layout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const { params } = context;
  if (params === undefined) {
    throw new Error('Invalid Params');
  }
  const categoryId = params.id as string;

  const category = await microcmsClient.get<CategoryResponse>({
    endpoint: 'category',
    contentId: categoryId,
  });

  /**
   * 複数コンテンツ参照のフィールドでfilterしたいときはcontainsしか使えない
   * @see https://document.microcms.io/content-api/get-list-contents#hdebbdc8e86
   */
  const categoryAllPostList = await getAllContents<PostListResponse>(
    'post',
    `category[contains]${categoryId}`
  );
  const postList = categoryAllPostList.flatMap((postList) => postList.contents);

  return {
    props: {
      category,
      postList,
    },
    revalidate: 60,
  };
};

export default CategoryDetail;
