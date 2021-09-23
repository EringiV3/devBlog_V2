import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { microcmsClient } from '../../lib/microcms';
import type { PostResponse } from '../../types';

type StaticProps = {
  post: PostResponse;
};
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<PageProps> = ({ post }) => {
  console.log({ post });
  return <div>postdetail</div>;
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
  const postId = params.id as string;

  const post = await microcmsClient.get<PostResponse>({
    endpoint: 'post',
    contentId: postId,
  });

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export default Home;
