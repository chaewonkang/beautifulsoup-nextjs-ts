import { createClient, groq } from 'next-sanity';
import { apiVersion, dataset, projectId } from './config';

const token = process.env.SANITY_API_EDITOR_TOKEN;
if (!token) throw new Error('Env var missing: `SANITY_API_EDITOR_TOKEN`');

export const editorClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

// Some convenient functions

export async function getPreviewSecret(previewSecretId: string): Promise<string | null> {
  const secret = await editorClient.fetch<string | null>(
    `*[_id == $id && dateTime(_updatedAt) > dateTime(now()) - ${60 * 30}][0].secret`,
    { id: previewSecretId }
  );
  if (!secret) {
    const newSecret = Math.random().toString(36).slice(2);
    try {
      const patch = editorClient.patch(previewSecretId).set({ secret: newSecret });
      await editorClient
        .transaction()
        .createIfNotExists({ _id: previewSecretId, _type: previewSecretId })
        .patch(patch)
        .commit({ tag: previewSecretId });
      return newSecret;
    } catch (err) {
      console.error(
        'Failed to create a new preview secret. Ensure the `client` has a `token` specified that has `write` permissions.',
        err
      );
    }
  }
  return secret;
}

export const getDocument = async (id: string) => {
  const document = await editorClient.fetch(groq`*[_id == $id][0]`, { id });
  return document;
};
