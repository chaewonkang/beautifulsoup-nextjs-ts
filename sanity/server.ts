import { createClient, groq } from 'next-sanity';
import { apiVersion, projectId } from './config';

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_EDITOR_TOKEN;
if (!dataset) throw new Error('Env var missing: `NEXT_PUBLIC_SANITY_DATASET`');
if (!token) throw new Error('Env var missing: `SANITY_API_EDITOR_TOKEN`');

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

export async function getPreviewSecret(
  previewSecretId: string,
): Promise<string | null> {
  const secret = await client.fetch<string | null>(
    `*[_id == $id && dateTime(_updatedAt) > dateTime(now()) - ${60 * 30}][0].secret`,
    { id: previewSecretId },
  );
  if (!secret) {
    const newSecret = Math.random().toString(36).slice(2);
    try {
      const patch = client.patch(previewSecretId).set({ secret: newSecret });
      await client
        .transaction()
        .createIfNotExists({ _id: previewSecretId, _type: previewSecretId })
        .patch(patch)
        .commit({ tag: previewSecretId });
      return newSecret;
    } catch (err) {
      console.error(
        'Failed to create a new preview secret. Ensure the `client` has a `token` specified that has `write` permissions.',
        err,
      );
    }
  }
  return secret;
}

export const getDocument = async (id: string) => {
  const document = await client.fetch(
    groq`*[_id == $id][0]`,
    { id },
  );
  return document;
};
