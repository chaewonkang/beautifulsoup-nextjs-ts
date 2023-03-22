import { routes } from '@/lib/constants';
import { isPreviewGetReq, redirectAsPreview } from '@/lib/helpers';
import { sanityEditorToken } from '@/lib/serverEnvs';
import { editorClient, getPreviewSecret } from '@/sanity/editorClient';
import { articlePageUrlQuery, projectPageUrlQuery, workPageUrlQuery } from '@/sanity/queries';
import { articlePageUrlData, projectPageUrlData, workPageUrlData } from '@/schemas';
// import { isPreviewGetReq, redirectAsPreview } from '@/utils/helpers';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (isPreviewGetReq(req)) {
    const { previewSecret: _previewSecret, schemaType, documentId } = req.query;

    const previewSecret = await getPreviewSecret('preview.secret');

    if (_previewSecret !== previewSecret) return res.status(401).send('Invalid secret');

    if (schemaType === 'landingPageConfig') {
      return redirectAsPreview(res, routes.landing);
    }
    if (schemaType === 'aboutPageConfig') {
      return redirectAsPreview(res, routes.about);
    }
    if (schemaType === 'project') {
      try {
        const { projectSlug } = projectPageUrlData.parse(
          await editorClient.fetch(projectPageUrlQuery, { projectId: documentId })
        );
        return redirectAsPreview(res, routes.project.path(projectSlug));
      } catch (err) {
        console.error('no matching slugs found');
      }
    }
    if (schemaType === 'work') {
      try {
        const { projectSlug, workSlug } = workPageUrlData.parse(
          await editorClient.fetch(workPageUrlQuery, { workId: documentId })
        );
        return redirectAsPreview(res, routes.work.path(projectSlug, workSlug));
      } catch (err) {
        console.error('no matching slugs found');
      }
    }
    if (schemaType === 'article') {
      try {
        const { articleSlug } = articlePageUrlData.parse(
          await editorClient.fetch(articlePageUrlQuery, { articleId: documentId })
        );
        return redirectAsPreview(res, routes.article.path(articleSlug));
      } catch (err) {
        console.error('no matching slugs found');
      }
    }
    if (schemaType === 'curator') {
      return redirectAsPreview(res, routes.index);
    }

    // Catchall
    return redirectAsPreview(res, routes.landing);
  }

  return res.status(401).send('Invalid params');
};
export default handler;
