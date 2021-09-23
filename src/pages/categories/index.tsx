import { Box, Heading, Link } from '@chakra-ui/react';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import NextLink from 'next/link';
import Layout from '../../components/Layout';
import { getAllContents } from '../../lib/microcms';
import type { CategoryListResponse, CategoryResponse } from '../../types';

type StaticProps = {
  categoryList: CategoryResponse[];
};
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
const Categories: NextPage<PageProps> = ({ categoryList }) => {
  console.log({ categoryList });
  return (
    <Layout>
      <Heading as="h1" color="blue.700">
        Categories
      </Heading>
      <Box marginTop="40px">
        {categoryList.map((category) => (
          <Box key={category.id} _notFirst={{ marginTop: '20px' }}>
            <NextLink href={`/categories/${category.id}`}>
              <Link color="blue.700" display="inline-block">
                {/* TODO カテゴリごとの投稿件数表示するようにする */}
                <Heading size="md">{`${category.category}`}</Heading>
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

  return {
    props: {
      categoryList,
    },
    revalidate: 60,
  };
};

export default Categories;
