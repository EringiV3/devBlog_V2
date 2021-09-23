import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { microcmsClient } from '../lib/microcms';
import type { CategoryListResponse } from '../types';

type StaticProps = {
  categoryList: CategoryListResponse;
};
type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
const Categories: NextPage<PageProps> = ({ categoryList }) => {
  console.log({ categoryList });
  return <div>category</div>;
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const categoryList = await microcmsClient.get<CategoryListResponse>({
    endpoint: 'category',
  });

  return {
    props: {
      categoryList,
    },
    revalidate: 60,
  };
};

export default Categories;
