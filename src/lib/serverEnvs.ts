export const sanityEditorToken = process.env.SANITY_API_EDITOR_TOKEN!;
export const apiSecret = process.env.API_SECRET!;

if (sanityEditorToken == null || apiSecret == null) throw new Error('Env var missing');
