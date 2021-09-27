import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import FeedCard from '../components/FeedCard';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { getAllContents, isMicrocmsPost } from '../lib/microcms';
import { getZennFeedItems } from '../lib/zenn';
import type { PostListResponse, PostResponse, ZennFeedItem } from '../types';
import { sortByDate } from '../utils/arrayHelpers';

type StaticProps = {
  postOrFeedList: (PostResponse | ZennFeedItem)[];
};
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<PageProps> = ({ postOrFeedList }) => {
  return (
    <Layout>
      {postOrFeedList.map((postOrFeed, i) =>
        isMicrocmsPost(postOrFeed) ? (
          <PostCard key={postOrFeed.id} post={postOrFeed} />
        ) : (
          <FeedCard key={i} feedItem={postOrFeed} />
        )
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const allPostList = await getAllContents<PostListResponse>('post');
  const postList = allPostList.flatMap((postList) => postList.contents);
  const zennFeed = await getZennFeedItems();
  const postOrFeedList = [...postList, ...zennFeed];
  postOrFeedList.sort(sortByDate);

  return {
    props: {
      postOrFeedList,
    },
    revalidate: 60,
  };
};

export default Home;
