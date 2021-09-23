import { Box, Container, Flex, Heading, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

const Layout: React.FC = ({ children }) => {
  return (
    <Box backgroundColor="gray.100">
      <Container
        maxW="container.md"
        backgroundColor="white"
        minHeight="100vh"
        padding="0"
      >
        <Box backgroundColor="blue.700" padding="5">
          <NextLink href="/">
            <Link color="white" display="inline-block">
              <Heading>eringiv3.dev</Heading>
            </Link>
          </NextLink>
        </Box>
        <Flex
          alignItems="center"
          color="blue.700"
          margin="5"
          paddingBottom="2"
          borderBottom="1px"
          borderColor="gray.300"
        >
          <NextLink href="/categories">
            <Link fontWeight="bold">Category</Link>
          </NextLink>
          <Link
            fontWeight="bold"
            marginLeft="5"
            isExternal
            href="https://google.com"
          >
            Profile
          </Link>
        </Flex>
        <Box padding="5">{children}</Box>
        <Flex justifyContent="center" padding="5">
          © 2021 by eringiv3. All rights reserved.
        </Flex>
      </Container>
    </Box>
  );
};

export default Layout;
