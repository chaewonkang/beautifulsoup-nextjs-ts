import { createClient } from 'next-sanity';
import { definePreview } from 'next-sanity/preview';
import { apiVersion, dataset, projectId } from './config';

export const publicClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});
