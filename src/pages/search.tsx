import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import React, { useState } from 'react';
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
const Search: NextPage<PageProps> = ({ postOrFeedList }) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const hitList =
    value === '' ? [] : postOrFeedList.filter((v) => v.title.includes(value));

  return (
    <Layout>
      <InputGroup>
        <Input placeholder="記事タイトルを検索" onChange={handleChange} />
        <InputRightElement>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
      <Box marginTop="10">
        {hitList.length !== 0 ? (
          <Heading as="h1" color="blue.700">
            検索結果
          </Heading>
        ) : value !== '' ? (
          <Box>記事が見つかりませんでした。</Box>
        ) : null}
        <Box marginTop="5">
          {hitList.map((postOrFeed, i) =>
            isMicrocmsPost(postOrFeed) ? (
              <PostCard key={postOrFeed.id} post={postOrFeed} />
            ) : (
              <FeedCard key={i} feedItem={postOrFeed} />
            )
          )}
        </Box>
      </Box>
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

export default Search;
