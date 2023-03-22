import { groq } from 'next-sanity';

const imageFields = groq`
crop,
hotspot,
asset -> {
  _id,
  metadata {
    lqip,
    isOpaque,
    dimensions {
      width,
      height,
    },
  },
},
`;

const imageWithAltFields = groq`
image {
  ${imageFields}
},
alt,
`;

const imageWithCaptionFields = groq`
image {
  ${imageFields}
},
alt,
caption,
`;

const contentSectionFields = groq`
text[] {
  ...,
},
images[] {
  ${imageWithCaptionFields}
},
`;

const fileAssetFields = groq`
url,
mimeType,
size,
`;

const attachmentFields = groq`
title,
'file': file.asset -> {
  ${fileAssetFields}
},
`;

const curatorFields = groq`
_id,
'slug': slug.current,
name,
residence,
nationality,
`;

const curatorWithIntroFields = groq`
${curatorFields}
intro,
`;

// Common fields shared by preview & detail
const workCommonFields = groq`
_id,
'slug': slug.current,
title,
artistName,
'color': color.hex,
`;

const workPreviewFields = groq`
${workCommonFields}
`;

// Common fields shared by preview & detail
const projectCommonFields = groq`
_id,
postedAt,
'slug': slug.current,
title,
intro,
curator -> {
  ${curatorFields}
},
tags[] -> {
  'slug': slug.current,
  title,
},
categories[] -> {
  'slug': slug.current,
  title,
},
`;

const projectPreviewFields = groq`
${projectCommonFields}
thumbnail {
  ${imageWithAltFields}
},
'contentExcerpt': array::join(string::split(array::join(content[]{'text': pt::text(text)}.text, " "), "")[0...300], ""),
`;

const programPreviewFields = groq`
_id,
postedAt,
'slug': slug.current,
thumbnail {
  ${imageWithAltFields}
},
title,
intro,
'contentExcerpt': array::join(string::split(array::join(content[]{'text': pt::text(text)}.text, " "), "")[0...300], ""),
`;

const articleCommonFields = groq`
_id,
postedAt,
'slug': slug.current,
title,
`;

const articlesPreviewFields = groq`
${articleCommonFields}
thumbnail {
  ${imageWithAltFields}
},
'contentExcerpt': array::join(string::split(array::join(content[]{'text': pt::text(text)}.text, " "), "")[0...300], ""),
`;

const articlesDetailFields = groq`
${articleCommonFields}
content[] {
  ${contentSectionFields}
},
attachments[] {
  ${attachmentFields}
},
`;

const landingPageConfigQuery = groq`
*[_id == 'landingPageConfig'][0] {
  projectsSectionTitle,
  projects[] -> {
    ${projectPreviewFields}
  },
  programsSectionTitle,
  programs[] -> {
    ${programPreviewFields}
  },
}
`;

const tagsQuery = groq`
*[_type == 'tag'] | order(lower(title) asc) {
  'slug': slug.current,
  title,
}
`;

const categoriesQuery = groq`
*[_type == 'category'] | order(lower(title) asc) {
  'slug': slug.current,
  title,
}
`;

const projectsQuery = groq`
*[_type == 'project'] | order(postedAt desc) {
  ${projectPreviewFields}
}
`;

const articlesQuery = groq`
*[_type == 'article'] | order(postedAt desc) {
  ${articlesPreviewFields}
}
`;

const aboutPageConfigQuery = groq`
*[_id == 'aboutPageConfig'][0] {
  content[] {
    ${contentSectionFields}
  },
}
`;

const curatorsQuery = groq`
*[_type == 'curator'] | order(lower(name) asc) {
  ${curatorWithIntroFields}
}
`;

const projectQuery = groq`
*[_type == 'project' && slug.current == $projectSlug][0] {
  ${projectCommonFields}
  content[] {
    ${contentSectionFields}
  },
  note,
  bio,
  attachments[] {
    ${attachmentFields}
  },
  works[] -> {
    ${workPreviewFields}
  },
}
`;

const workQuery = groq`
*[_type == 'work' && references(*[_type == 'project' && slug.current == $projectSlug]._id) && slug.current == $workSlug][0] {
  ${workCommonFields}
  content[] {
    _type,
    _type == 'workContentSection' => {
      ${contentSectionFields}
    },
    _type == 'workContentIframe' => {
      url,
    },
    _type == 'workContentSlot' => {
      id,
    },
  },
  note,
  bio,
  attachments[] {
    ${attachmentFields}
  },
  ...(project -> {
    curator -> {
      ${curatorFields}
    },
    'projectSlug': slug.current,
    'otherWorks': *[_type == 'work' && references(*[_type == 'project' && slug.current == $projectSlug]._id) && slug.current != $workSlug] {
      ${workPreviewFields}
    },
  }),
}
`;

const articleQuery = groq`
*[_type == 'article' && slug.current == $articleSlug][0] {
  ${articleCommonFields}
  content[] {
    ${contentSectionFields}
  },
  attachments[] {
    ${attachmentFields}
  },
}
`;

export const landingPageQuery = groq`
{
  'landingPageConfig': ${landingPageConfigQuery},
}
`;

export const curatorialPracticePageQuery = groq`
{
  'tags': ${tagsQuery},
  'categories': ${categoriesQuery},
  'projects': ${projectsQuery},
}
`;

export const newsPageQuery = groq`
{
  'articles': ${articlesQuery},
}
`;

export const aboutPageQuery = groq`
{
  'aboutPageConfig': ${aboutPageConfigQuery},
}
`;

export const indexPageQuery = groq`
{
  'curators': ${curatorsQuery},
}
`;

export const projectPageQuery = groq`
{
  'project': ${projectQuery},
}
`;

export const workPageQuery = groq`
{
  'work': ${workQuery},
}
`;

export const articlePageQuery = groq`
{
  'article': ${articleQuery},
}
`;

export const workPageUrlQuery = groq`
{
  ...(coalesce(
    *[_id == 'drafts.' + $workId][0],
    *[_id == $workId][0],
  ) {
    'projectSlug': project->slug.current,
    'workSlug': slug.current,
  })
}
`;

export const projectPageUrlQuery = groq`
{
  ...(coalesce(
    *[_id == 'drafts.' + $projectId][0],
    *[_id == $projectId][0],
  ) {
    'projectSlug': slug.current,
  })
}
`;

export const articlePageUrlQuery = groq`
{
  ...(coalesce(
    *[_id == 'drafts.' + $articleId][0],
    *[_id == $articleId][0],
  ) {
    'articleSlug': slug.current,
  })
}
`;
