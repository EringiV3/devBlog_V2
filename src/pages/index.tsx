import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Layout from '../components/Layout';
import { getAllContents } from '../lib/microcms';
import type { PostListResponse, PostResponse } from '../types';

type StaticProps = {
  postList: PostResponse[];
};
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<PageProps> = ({ postList }) => {
  console.log({ postList });
  return <Layout>hoge</Layout>;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const allPostList = await getAllContents<PostListResponse>('post');
  const postList = allPostList.flatMap((postList) => postList.contents);

  return {
    props: {
      postList,
    },
    revalidate: 60,
  };
};

export default Home;
