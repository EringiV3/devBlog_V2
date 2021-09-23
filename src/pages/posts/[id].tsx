import { Badge, Box, Heading, Link } from '@chakra-ui/react';
import dayjs from 'dayjs';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import NextLink from 'next/link';
import Layout from '../../components/Layout';
import PostContent from '../../components/PostContent';
import { microcmsClient } from '../../lib/microcms';
import type { PostResponse } from '../../types';

type StaticProps = {
  post: PostResponse;
};
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const PostDetail: NextPage<PageProps> = ({ post }) => {
  return (
    <Layout>
      <Heading color="blue.700" as="h1">
        {post.title}
      </Heading>
      <Box marginRight="5">
        {dayjs(post.publishDate).format('YYYY年MM月DD日')} 公開
        {post.publishedAt !== post.updatedAt && (
          <> / {dayjs(post.updatedAt).format('YYYY年MM月DD日')} 更新</>
        )}
      </Box>
      <Box>
        {post.category.map((v) => (
          <NextLink href={`/categories/${v.id}`} key={v.id}>
            <Link _notFirst={{ marginLeft: '10px' }}>
              <Badge variant="solid" colorScheme="blue" textTransform="none">
                {v.category}
              </Badge>
            </Link>
          </NextLink>
        ))}
      </Box>
      <PostContent content={post.content} />
    </Layout>
  );
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

export default PostDetail;
