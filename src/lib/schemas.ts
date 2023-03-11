import { TypedObject } from '@sanity/types';
import { z } from 'zod';

// This function takes in a type, and returns a type to Zod
const schemaForType =
  <T>() =>
  <S extends z.ZodType<T, any, any>>(arg: S) => {
    return arg;
  };

const typedObject = schemaForType<TypedObject>()(
  z
    .object({
      _type: z.string(),
      _key: z.string(),
    })
    .passthrough()
);

const tag = z.object({
  slug: z.string(),
  title: z.string(),
});

const category = z.object({
  slug: z.string(),
  title: z.string(),
});

const image = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
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
  _key: z.string(),
  slug: z.string(),
  title: z.string(),
  artistName: z.string(),
  color: z.string(),
});

const workPreview = workCommon.extend({});

const workDetail = workCommon.extend({
  content: z.array(typedObject).nullable(),
  note: z.array(typedObject).nullable(),
  bio: z.array(typedObject).nullable(),
  attachments: z.array(attachment).nullable(),
  curator,
  projectSlug: z.string(),
  works: z.array(workPreview).nullable(),
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
  thumbnail: image,
  curator,
  contentExcerpt: z.string().nullable(),
});

const projectDetail = projectCommon.extend({
  curator,
  content: z.array(typedObject).nullable(),
  note: z.array(typedObject).nullable(),
  bio: z.array(typedObject).nullable(),
  attachments: z.array(attachment).nullable(),
  works: z.array(workPreview).nullable(),
});

const programPreview = z.object({
  _id: z.string(),
  postedAt: z.string(),
  slug: z.string(),
  thumbnail: image,
  title: z.string(),
  intro: z.array(typedObject).nullable(),
  contentExcerpt: z.string().nullable(),
});

const articlePreview = z.object({
  _id: z.string(),
  postedAt: z.string(),
  slug: z.string(),
  thumbnail: image,
  title: z.string(),
  contentExcerpt: z.string().nullable(),
});

export const landingPageData = z.object({
  landingPageConfig: z.object({
    projectsSectionTitle: z.string().nullable(),
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
    content: z.array(typedObject).nullable(),
  }),
});

// `/index` not `/`
export const indexPageData = z.object({
  curators: z.array(curatorWithIntro),
});

export const projectPageData = z.object({
  project: projectDetail.nullable(),
});

export const workPageData = z.object({
  work: workDetail.nullable(),
});

export type TLandingPageData = z.infer<typeof landingPageData>;
export type TCuratorialPracticePageData = z.infer<typeof curatorialPracticePageData>;
export type TNewsPageData = z.infer<typeof newsPageData>;
export type TAboutPageData = z.infer<typeof aboutPageData>;
export type TIndexPageData = z.infer<typeof indexPageData>;
export type TProjectPageData = z.infer<typeof projectPageData>;
export type TWorkPageData = z.infer<typeof workPageData>;
