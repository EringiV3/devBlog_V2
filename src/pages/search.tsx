import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useState } from 'react';
import Layout from '../components/Layout';

const Search: NextPage = () => {
  const [value, setValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  console.log({ value });
  return (
    <Layout>
      <InputGroup>
        <Input
          placeholder="タイトルを検索"
          value={value}
          onChange={handleChange}
        />
        <InputRightElement>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
    </Layout>
  );
};

export default Search;
