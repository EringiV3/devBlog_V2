import {
  Box,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import cheerio from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import React from 'react';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { unified } from 'unified';

type Props = {
  content: string;
};
const PostContent: React.FC<Props> = ({ content }) => {
  const $ = cheerio.load(content);
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });

  const htmlAst = unified()
    .use(rehypeParse, { fragment: true })
    .parse($.html());

  // @ts-ignore
  const renderAst = new rehypeReact({
    createElement: React.createElement,
    Fragment: React.Fragment,
    components: {
      a: (props: any) => (
        <Link
          {...props}
          isExternal
          textDecoration="underline"
          color="blue.700"
        />
      ),
      h2: (props: any) => (
        <Heading
          as="h2"
          size="lg"
          paddingTop="60px"
          paddingBottom="3"
          color="blue.700"
          {...props}
        />
      ),
      h3: (props: any) => (
        <Heading
          as="h3"
          size="md"
          paddingTop="30px"
          paddingBottom="3"
          color="blue.700"
          {...props}
        />
      ),
      h4: (props: any) => (
        <Heading
          as="h4"
          size="sm"
          paddingTop="30px"
          paddingBottom="3"
          color="blue.700"
          {...props}
        />
      ),
      p: (props: any) => <Text {...props} lineHeight="1.8" />,
      ul: (props: any) => <UnorderedList {...props} paddingTop="3" />,
      li: ListItem,
    },
  }).Compiler;

  return (
    <Box className="post-content" marginTop="10" lineHeight={1.5}>
      {renderAst(htmlAst)}
    </Box>
  );
};
export default PostContent;
