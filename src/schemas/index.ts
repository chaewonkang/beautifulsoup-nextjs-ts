import { z } from 'zod';
import { schemaForType } from './utils';
import { TypedObject } from '@sanity/types';
import {
  SanityAsset,
  SanityImageCrop,
  SanityImageHotspot,
} from '@sanity/image-url/lib/types/types';

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
const sanityImageObject = z.object({
  asset: sanityAsset,
  crop: sanityImageCrop.nullable(),
  hotspot: sanityImageHotspot.nullable(),
});

export const typedObject = schemaForType<TypedObject>()(
  z
    .object({
      _type: z.string(),
      _key: z.string(),
    })
    .passthrough()
);

const imageWithAlt = z.object({
  image: sanityImageObject,
  alt: z.string().nullable(),
});

const imageWithCaption = z.object({
  image: sanityImageObject,
  alt: z.string().nullable(),
  caption: z.string().nullable(),
});

const contentSection = z.object({
  images: z.array(imageWithCaption).nullable(),
  text: z.array(typedObject),
});

const file = z.object({
  url: z.string(),
  mimeType: z.string(),
  size: z.number(),
});

const attachment = z.object({
  title: z.string(),
  file,
});

const tag = z.object({
  slug: z.string(),
  title: z.string(),
});

const category = z.object({
  slug: z.string(),
  title: z.string(),
});

const curator = z.object({
  _id: z.string(),
  slug: z.string(),
  name: z.string(),
  residence: z.string().nullable(),
  nationality: z.string().nullable(),
});

const curatorWithIntro = curator.extend({
  intro: z.array(typedObject).nullable(),
});

const workCommon = z.object({
  _id: z.string(),
  slug: z.string(),
  title: z.string(),
  artistName: z.string(),
  color: z.string(),
});

const workPreview = workCommon.extend({});

const workDetail = workCommon.extend({
  content: z
    .array(
      z.discriminatedUnion('_type', [
        z.object({ _type: z.literal('workContentSection') }).merge(contentSection),
        z.object({ _type: z.literal('workContentIframe'), url: z.string() }),
        z.object({ _type: z.literal('workContentSlot'), id: z.string() }),
      ])
    )
    .nullable(),
  note: z.array(typedObject).nullable(),
  bio: z.array(typedObject).nullable(),
  attachments: z.array(attachment).nullable(),
  curator,
  projectSlug: z.string(),
  otherWorks: z.array(workPreview).nullable(),
});

const projectCommon = z.object({
  _id: z.string(),
  postedAt: z.string(),
  slug: z.string(),
  title: z.string(),
  intro: z.array(typedObject).nullable(),
  tags: z.array(tag),
  categories: z.array(category),
});

const projectPreview = projectCommon.extend({
  thumbnail: imageWithAlt,
  curator,
  contentExcerpt: z.string().nullable(),
});

const projectDetail = projectCommon.extend({
  curator,
  content: z.array(contentSection).nullable(),
  note: z.array(typedObject).nullable(),
  bio: z.array(typedObject).nullable(),
  attachments: z.array(attachment).nullable(),
  works: z.array(workPreview).nullable(),
});

const programPreview = z.object({
  _id: z.string(),
  postedAt: z.string(),
  slug: z.string(),
  thumbnail: imageWithAlt,
  title: z.string(),
  intro: z.array(typedObject).nullable(),
  contentExcerpt: z.string().nullable(),
});

const articleCommon = z.object({
  _id: z.string(),
  postedAt: z.string(),
  slug: z.string(),
  title: z.string(),
});

const articlePreview = articleCommon.extend({
  thumbnail: imageWithAlt,
  contentExcerpt: z.string().nullable(),
});

const articleDetail = articleCommon.extend({
  content: z.array(contentSection).nullable(),
  attachments: z.array(attachment).nullable(),
});

export const landingPageData = z.object({
  landingPageConfig: z.object({
    projectsSectionTitle: z.string(), //.nullable(),
    projects: z.array(projectPreview).nullable(),
    programsSectionTitle: z.string().nullable(),
    programs: z.array(programPreview).nullable(),
  }),
});

export const curatorialPracticePageData = z.object({
  tags: z.array(tag),
  categories: z.array(category),
  projects: z.array(projectPreview),
});

export const newsPageData = z.object({
  articles: z.array(articlePreview),
});

export const aboutPageData = z.object({
  aboutPageConfig: z.object({
    content: z.array(contentSection).nullable(),
  }),
});

// `/index` not `/`
export const indexPageData = z.object({
  curators: z.array(curatorWithIntro),
});

export const projectPageData = z.object({
  project: projectDetail,
});
export const projectPageDataNullable = z.object({
  project: projectDetail.nullable(),
});

export const workPageData = z.object({
  work: workDetail,
});
export const workPageDataNullable = z.object({
  work: workDetail.nullable(),
});

export const articlePageData = z.object({
  article: articleDetail,
});
export const articlePageDataNullable = z.object({
  article: articleDetail.nullable(),
});

export const workPageUrlData = z.object({
  projectSlug: z.string(),
  workSlug: z.string(),
});

export const projectPageUrlData = z.object({
  projectSlug: z.string(),
});

export const articlePageUrlData = z.object({
  articleSlug: z.string(),
});

export type TLandingPageData = z.infer<typeof landingPageData>;
export type TCuratorialPracticePageData = z.infer<typeof curatorialPracticePageData>;
export type TNewsPageData = z.infer<typeof newsPageData>;
export type TAboutPageData = z.infer<typeof aboutPageData>;
export type TIndexPageData = z.infer<typeof indexPageData>;
export type TProjectPageData = z.infer<typeof projectPageData>;
export type TArticlePageData = z.infer<typeof articlePageData>;
export type TWorkPageData = z.infer<typeof workPageData>;
export type TContentSection = z.infer<typeof contentSection>;
