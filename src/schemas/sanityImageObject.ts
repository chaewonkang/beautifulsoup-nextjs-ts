import {
  SanityAsset,
  SanityImageCrop,
  SanityImageHotspot,
} from '@sanity/image-url/lib/types/types';
import { z } from 'zod';
import { schemaForType } from './utils';

// https://www.simeongriggs.dev/type-safe-groq-queries-for-sanity-data-with-zod
// https://github.com/SimeonGriggs/simeonGriggs/blob/main/app/types/image.ts

const sanityImageCrop = schemaForType<SanityImageCrop>()(
  z.object({
    _type: z.literal('sanity.imageCrop'),
    left: z.number(),
    bottom: z.number(),
    right: z.number(),
    top: z.number(),
  })
);

const sanityImageHotspot = schemaForType<SanityImageHotspot>()(
  z.object({
    _type: z.literal('sanity.imageHotspot'),
    width: z.number(),
    height: z.number(),
    x: z.number(),
    y: z.number(),
  })
);

const sanityAsset = schemaForType<SanityAsset>()(
  z.object({
    _id: z.string(),
    metadata: z
      .object({
        lqip: z.string(),
        isOpaque: z.boolean(),
        dimensions: z.object({
          width: z.number(),
          height: z.number(),
        }),
      })
      .nullable(),
  })
);

export const sanityImageObject = z.object({
  asset: sanityAsset,
  crop: sanityImageCrop.nullable(),
  hotspot: sanityImageHotspot.nullable(),
  // crop: sanityImageCrop.nullable().transform((v) => v ?? undefined),
  // hotspot: sanityImageHotspot.nullable().transform((v) => v ?? undefined),
});
