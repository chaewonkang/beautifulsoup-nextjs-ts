import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { NextApiRequest, NextApiResponse } from 'next';
import imageUrlBuilder from '@sanity/image-url';
import { publicClient } from '@/sanity/publicClient';

export const redirectAsPreview = (res: NextApiResponse<string | void>, Location: string): void => {
  res.setPreviewData({});
  res.writeHead(307, { Location });
  res.end();
};

// Typeguards
interface IPreviewGetReq extends NextApiRequest {
  query: {
    previewSecret: string;
    schemaType: string;
    documentId: string;
  };
}
export const isPreviewGetReq = (req: NextApiRequest): req is IPreviewGetReq => {
  return ['previewSecret', 'schemaType', 'documentId'].every(
    (param) => typeof req.query[param] === 'string'
  );
};
interface IRevalidatePostReq extends NextApiRequest {
  method: 'POST';
  body: {
    schemaType: string;
    documentId: string;
  };
}
export const isRevalidatePostReq = (
  req: NextApiRequest,
  secret: string
): req is IRevalidatePostReq => {
  return (
    req.method === 'POST' &&
    ['schemaType', 'documentId'].every((key) => typeof req.body[key] === 'string') &&
    req.query.secret === secret
  );
};

// Create url from sanity image data
export const urlFor = (source: SanityImageSource) => imageUrlBuilder(publicClient).image(source);
