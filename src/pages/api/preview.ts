import { NextApiRequest, NextApiResponse } from 'next';
import { microcmsClient } from '../../lib/microcms';
import { PostResponse } from '../../types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const postId = req.query.contentId as string | undefined;
  const draftKey = req.query.draftKey as string | undefined;
  if (!postId) {
    return res.status(404).end();
  }

  const post = await microcmsClient.get<PostResponse>({
    endpoint: 'post',
    contentId: postId,
    queries: { draftKey },
  });

  res.setPreviewData({
    id: postId,
    draftKey: draftKey,
  });
  res.writeHead(307, { Location: `/posts/${post.id}` });
  res.end('Preview mode enabled');
};

export default handler;
