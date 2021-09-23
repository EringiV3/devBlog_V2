import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Layout from '../../components/Layout';
import { getAllContents } from '../../lib/microcms';
import type { CategoryListResponse, CategoryResponse } from '../../types';

type StaticProps = {
  categoryList: CategoryResponse[];
};
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
const Categories: NextPage<PageProps> = ({ categoryList }) => {
  console.log({ categoryList });
  return <Layout>category</Layout>;
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
