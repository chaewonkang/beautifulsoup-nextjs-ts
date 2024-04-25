import { routes } from '@/lib/constants';
import { projectPageUrlData, workPageUrlData } from '@/schemas';
import { editorClient, getDocument } from '@/sanity/editorClient';
import { projectPageUrlQuery, workPageUrlQuery } from '@/sanity/queries';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiSecret } from '@/lib/serverEnvs';
import { isRevalidatePostReq } from '@/lib/helpers';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (isRevalidatePostReq(req, apiSecret)) {
    const { documentId, schemaType } = req.body;

    // Either redeploy or add paths to revalidate
    const paths = [];
    let redeploy = false;

    if (schemaType === 'project') {
      redeploy = true;
    }
    if (schemaType === 'work') {
      redeploy = true;
    }
    if (schemaType === 'tag') {
      redeploy = true;
    }
    if (schemaType === 'category') {
      redeploy = true;
    }
    if (schemaType === 'program') {
      redeploy = true;
    }
    if (schemaType === 'article') {
      redeploy = true;
    }
    if (schemaType === 'curator') {
      redeploy = true;
    }
    if (schemaType === 'landingPageConfig') {
      paths.push(routes.landing);
    }
    if (schemaType === 'aboutPageConfig') {
      paths.push(routes.about);
    }

    // Never
    if (redeploy) {
      await axios.post(
        'https://api.vercel.com/v1/integrations/deploy/prj_O8CcA24IntEAYKB0AceyEtOPt2CB/YWhXleAyrV'
      );
      console.log('Redeployed');
      return res.status(200).json({ message: 'success' });
    }

    if (paths.length) {
      // Wait for Sanity to sync
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 5000);
      });
      const revalidatePromises = paths.map((path) => res.revalidate(path));
      await Promise.all(revalidatePromises);
      console.log(`Revalidated: ${paths.join(', ')}`);
      return res.status(200).json({ message: 'success' });
    }
  }

  console.log('Nothing to revalidate');

  return res.status(401).send('Bad request');
};
export default handler;
