import { Box, Heading, Link } from '@chakra-ui/react';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import NextLink from 'next/link';
import Layout from '../../components/Layout';
import { getAllContents } from '../../lib/microcms';
import type {
  CategoryListResponse,
  CategoryResponse,
  PostListResponse,
} from '../../types';

type StaticProps = {
  categoryInfoList: (CategoryResponse & { postCount: number })[];
};
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
const Categories: NextPage<PageProps> = ({ categoryInfoList }) => {
  return (
    <Layout>
      <Heading as="h1" color="blue.700">
        Categories
      </Heading>
      <Box marginTop="40px">
        {categoryInfoList.map((category) => (
          <Box key={category.id} _notFirst={{ marginTop: '20px' }}>
            <NextLink href={`/categories/${category.id}`}>
              <Link color="blue.700" display="inline-block">
                {/* TODO カテゴリごとの投稿件数表示するようにする */}
                <Heading size="md">{`${category.category} (${category.postCount})`}</Heading>
              </Link>
            </NextLink>
          </Box>
        ))}
      </Box>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const allCategoryList = await getAllContents<CategoryListResponse>(
    'category'
  );
  const categoryList = allCategoryList.flatMap(
    (categoryList) => categoryList.contents
  );

  const allPostList = await getAllContents<PostListResponse>('post');
  const postList = allPostList.flatMap((postList) => postList.contents);

  const categoryInfoList = categoryList.map((category) => {
    const sameCategoryPostList = postList.filter((post) => {
      const categoryIdList = post.category.map((v) => v.id);
      return categoryIdList.includes(category.id);
    });
    return {
      ...category,
      postCount: sameCategoryPostList.length,
    };
  });

  return {
    props: {
      categoryInfoList,
    },
    revalidate: 60,
  };
};

export default Categories;
