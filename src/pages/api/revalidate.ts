import { routes } from '@/lib/constants';
import { projectPageUrlData, workPageUrlData } from '@/schemas';
import { editorClient, getDocument } from '@/sanity/editorClient';
import { projectPageUrlQuery, workPageUrlQuery } from '@/sanity/queries';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import type { NextApiRequest, NextApiResponse } from 'next';

const apiSecret = process.env.API_SECRET;
if (!apiSecret) throw new Error('Env var missing: `API_SECRET`');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(401).send('Bad request');

  // Check secret
  const signature = req.headers[SIGNATURE_HEADER_NAME] as string;
  const bodyStr = await readBody(req);
  if (!isValidSignature(bodyStr, signature, apiSecret)) {
    return res.status(401).send('Invalid signature');
  }

  const body = JSON.parse(bodyStr);
  const { schemaType, documentId } = body;

  // Wait for Sanity to sync?
  // Seems to fix revalidating page with old data issue
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });

  if (schemaType === 'landingPageConfig') {
    await res.revalidate(routes.landing);
    return res.json({ success: true });
  }
  if (schemaType === 'aboutPageConfig') {
    await res.revalidate(routes.about);
    return res.json({ success: true });
  }
  if (schemaType === 'project') {
    const { projectSlug } = projectPageUrlData.parse(
      await editorClient.fetch(projectPageUrlQuery, { projectId: documentId })
    );
    await res.revalidate(routes.project.path(projectSlug));
    return res.json({ success: true });
  }
  if (schemaType === 'work') {
    const { projectSlug, workSlug } = workPageUrlData.parse(
      await editorClient.fetch(workPageUrlQuery, { workId: documentId })
    );
    await res.revalidate(routes.work.path(projectSlug, workSlug));
    return res.json({ success: true });
  }
  return res.status(401).send('Bad request');
};
export default handler;

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false,
  },
};

async function readBody(readable: any) {
  const chunks = [];
  // eslint-disable-next-line no-restricted-syntax
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}
