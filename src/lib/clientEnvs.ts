export const gaTrackingId = process.env.NEXT_PUBLIC_GA_ID!;

if (gaTrackingId == null) throw new Error('Env var missing');
