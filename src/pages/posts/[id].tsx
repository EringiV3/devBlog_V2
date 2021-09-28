import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Flex,
  Heading,
  Link,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { NextSeo } from 'next-seo';
import NextLink from 'next/link';
import Layout from '../../components/Layout';
import PostContent from '../../components/PostContent';
import { microcmsClient } from '../../lib/microcms';
import type { PostResponse } from '../../types';
import {
  formatPostContentForHeading,
  htmlToNode,
} from '../../utils/stringHelpers';

type StaticProps = {
  post: PostResponse;
  draftKey: string | null;
};
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const PostDetail: NextPage<PageProps> = ({ post, draftKey }) => {
  return (
    <>
      <NextSeo
        title={post.title}
        description={`${formatPostContentForHeading(
          htmlToNode(post.content)
        )}...`}
      />

      <Layout>
        {draftKey && (
          <Box marginBottom="10">
            <Alert status="warning">
              <Box>
                <Flex>
                  <AlertIcon />
                  プレビュー表示がONになっています。
                </Flex>
                <Box>
                  <NextLink href={`/api/exitPreview`}>
                    <Link textDecoration="underline" color="blue.700">
                      プレビュー表示をOFFにする
                    </Link>
                  </NextLink>
                </Box>
              </Box>
            </Alert>
          </Box>
        )}
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
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const { params, previewData } = context;
  const draftKey: string | null = (previewData as any)?.draftKey
    ? (previewData as any)?.draftKey
    : null;
  if (params === undefined) {
    throw new Error('Invalid Params');
  }
  const postId = params.id as string;

  const post = await microcmsClient.get<PostResponse>({
    endpoint: 'post',
    contentId: postId,
    queries: draftKey ? { draftKey } : {},
  });

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
      draftKey,
    },
    revalidate: 60,
  };
};

export default PostDetail;
