import { Box, Link } from '@chakra-ui/react';
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
      a: Link,
    },
  }).Compiler;

  return <Box marginTop="10">{renderAst(htmlAst)}</Box>;
};
export default PostContent;
