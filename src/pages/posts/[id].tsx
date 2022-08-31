import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Flex,
  Heading,
  Link,
} from '@chakra-ui/react';
import base64url from 'base64url';
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
import { OgpResponse, PostResponse } from '../../types';
import {
  formatPostContentForHeading,
  htmlToNode,
} from '../../utils/stringHelpers';

type StaticProps = {
  post: PostResponse;
  draftKey: string | null;
  ogpImageUrl: string;
};
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const PostDetail: NextPage<PageProps> = ({ post, draftKey, ogpImageUrl }) => {
  const description = `${formatPostContentForHeading(
    htmlToNode(post.content)
  )}...`;
  return (
    <>
      <NextSeo
        title={post.title}
        description={description}
        openGraph={{
          type: 'website',
          url: `https://eringiv3.dev/posts/${post.id}`,
          title: post.title,
          description: description,
          images: [
            {
              url: ogpImageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
        }}
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
                  <NextLink href={`/api/exitPreview`} passHref>
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
            <NextLink href={`/categories/${v.id}`} key={v.id} passHref>
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

  const ogpResponse = await microcmsClient.get<OgpResponse>({
    endpoint: 'ogp',
  });

  /**
   * imgixでの画像操作
   * @see https://docs.imgix.com/tutorials/multiline-text-overlays-typesetting-endpoint#base-image
   */
  const ogpImageUrl = `${
    ogpResponse.image.url
  }?mark-align=center,middle&mark64=${base64url(
    `https://assets.imgix.net/~text?txtsize=48&txt-color=fff&w=${
      1200 - 80
    }&txt-align=middle&txtfont=Hiragino%20Sans%20W6&txt-track=2&txt64=${base64url(
      post.title
    )}`
  )}`;

  return {
    props: {
      post,
      draftKey,
      ogpImageUrl,
    },
    revalidate: 60,
  };
};

export default PostDetail;
