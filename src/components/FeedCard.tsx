import { Badge, Box, Heading, Link } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ZennFeedItem } from '../types';
import { formatPostContentForHeading } from '../utils/stringHelpers';

type Props = {
  feedItem: ZennFeedItem;
};
const FeedCard: React.FC<Props> = ({ feedItem }) => {
  return (
    <Box _notFirst={{ marginTop: '50px' }}>
      <Box>
        <Link
          color="blue.700"
          display="inline-block"
          href={feedItem.link}
          isExternal
        >
          <Heading size="md">{feedItem.title}</Heading>
        </Link>
      </Box>
      <Box marginRight="5">
        {dayjs(feedItem.isoDate).format('YYYY年MM月DD日')} 公開
      </Box>
      <Box>
        <Badge variant="outline" colorScheme="blue" textTransform="none">
          Zenn
        </Badge>
      </Box>
      <Box marginTop="1">
        {formatPostContentForHeading(feedItem.content)}...
      </Box>
      <Box textAlign="right">
        <Link
          color="blue.700"
          display="inline-block"
          textDecoration="underline"
          isExternal
          href=""
        >
          もっと読む
        </Link>
      </Box>
    </Box>
  );
};

export default FeedCard;
