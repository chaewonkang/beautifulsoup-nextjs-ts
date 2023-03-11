import { createClient } from 'next-sanity';
import { definePreview } from 'next-sanity/preview';
import { apiVersion, projectId } from './config';

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
if (!dataset) throw new Error('Env var missing: `NEXT_PUBLIC_SANITY_DATASET`');

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

let alerted = false;
export const usePreview = definePreview({
  projectId,
  dataset,
  onPublicAccessOnly: () => {
    // You can opt to throw an error here instead of using `window.alert`, and customize how it displays by wrapping the component calling `usePreview` in an ErrorBoundary
    // https://reactjs.org/docs/error-boundaries.html
    if (!alerted) {
      // eslint-disable-next-line no-alert
      alert('You are not logged in. You will only see public data.');
      alerted = true;
    }
  },
  documentLimit: Infinity,
});
