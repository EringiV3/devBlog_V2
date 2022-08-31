import { Badge, Box, Heading, Link } from '@chakra-ui/react';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import { PostResponse } from '../types';
import {
  formatPostContentForHeading,
  htmlToNode,
} from '../utils/stringHelpers';

type Props = {
  post: PostResponse;
};
const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <Box _notFirst={{ marginTop: '50px' }}>
      <Box>
        <NextLink href={`/posts/${post.id}`} passHref>
          <Link color="blue.700" display="inline-block">
            <Heading size="md">{post.title}</Heading>
          </Link>
        </NextLink>
      </Box>
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
      <Box marginTop="1">
        {formatPostContentForHeading(htmlToNode(post.content))}...
      </Box>
      <Box textAlign="right">
        <NextLink href={`/posts/${post.id}`} passHref>
          <Link
            color="blue.700"
            display="inline-block"
            textDecoration="underline"
          >
            もっと読む
          </Link>
        </NextLink>
      </Box>
    </Box>
  );
};

export default PostCard;
