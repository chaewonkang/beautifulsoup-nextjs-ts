import { routes } from '@/lib/constants';
import { isPreviewGetReq, redirectAsPreview } from '@/lib/helpers';
import { editorClient, getPreviewSecret } from '@/sanity/editorClient';
import { projectPageUrlQuery, workPageUrlQuery } from '@/sanity/queries';
import { projectPageUrlData, workPageUrlData } from '@/schemas';
// import { isPreviewGetReq, redirectAsPreview } from '@/utils/helpers';
import type { NextApiRequest, NextApiResponse } from 'next';

const sanityEditorToken = process.env.SANITY_API_EDITOR_TOKEN;
if (!sanityEditorToken) throw new Error('Env var missing: `SANITY_API_EDITOR_TOKEN`');
const apiSecret = process.env.API_SECRET;
if (!apiSecret) throw new Error('Env var missing: `API_SECRET`');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.secret !== apiSecret) {
    return res.status(401).json({ message: 'Invalid api secret' });
  }

  if (isPreviewGetReq(req)) {
    const { previewSecret: _previewSecret, schemaType, documentId } = req.query;

    const previewSecret = await getPreviewSecret('preview.secret');

    if (_previewSecret !== previewSecret) return res.status(401).send('Invalid secret');

    if (schemaType === 'landingPageConfig') {
      return redirectAsPreview(res, sanityEditorToken, routes.landing);
    }
    if (schemaType === 'aboutPageConfig') {
      return redirectAsPreview(res, sanityEditorToken, routes.about);
    }
    if (schemaType === 'project') {
      try {
        const { projectSlug } = projectPageUrlData.parse(
          await editorClient.fetch(projectPageUrlQuery, { projectId: documentId })
        );
        return redirectAsPreview(res, sanityEditorToken, routes.project.path(projectSlug));
      } catch (err) {
        console.error('no matching slugs found');
      }
    }
    if (schemaType === 'work') {
      try {
        const { projectSlug, workSlug } = workPageUrlData.parse(
          await editorClient.fetch(workPageUrlQuery, { workId: documentId })
        );
        return redirectAsPreview(res, sanityEditorToken, routes.work.path(projectSlug, workSlug));
      } catch (err) {
        console.error('no matching slugs found');
      }
    }
    if (schemaType === 'curator') {
      return redirectAsPreview(res, sanityEditorToken, routes.index);
    }

    // Catchall
    return redirectAsPreview(res, sanityEditorToken, routes.landing);
  }

  return res.status(401).send('Invalid params');
};
export default handler;
