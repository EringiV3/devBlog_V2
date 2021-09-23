import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { microcmsClient } from '../lib/microcms';
import type { PostListResponse } from '../types';

type StaticProps = {
  postList: PostListResponse;
};
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<PageProps> = ({ postList }) => {
  console.log({ postList });
  return <div>hoge</div>;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const postList = await microcmsClient.get<PostListResponse>({
    endpoint: 'post',
  });

  return {
    props: {
      postList,
    },
    revalidate: 60,
  };
};

export default Home;
