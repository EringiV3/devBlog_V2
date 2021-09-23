import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { getAllContents } from '../lib/microcms';
import type { PostListResponse, PostResponse } from '../types';

type StaticProps = {
  postList: PostResponse[];
};
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<PageProps> = ({ postList }) => {
  return (
    <Layout>
      {postList.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Layout>
  );
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
