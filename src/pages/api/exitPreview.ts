import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  res.clearPreviewData();
  res.writeHead(307, { Location: `/` });
  res.end('Preview mode disabled');
};

export default handler;
