import { groq } from 'next-sanity';

const imageAssetFields = groq`
url,
'width': metadata.dimensions.width,
'height': metadata.dimensions.height,
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
_key,
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
'thumbnail': thumbnail.asset -> {
  ${imageAssetFields}
},
'contentExcerpt': array::join(string::split(array::join(content[]{'text': pt::text(text)}.text, " "), "")[0...300], ""),
`;

const programPreviewFields = groq`
_id,
postedAt,
'slug': slug.current,
'thumbnail': thumbnail.asset -> {
  ${imageAssetFields}
},
title,
intro,
'contentExcerpt': array::join(string::split(array::join(content[]{'text': pt::text(text)}.text, " "), "")[0...300], ""),
`;

const articlesPreviewFields = groq`
_id,
postedAt,
'slug': slug.current,
'thumbnail': thumbnail.asset -> {
  ${imageAssetFields}
},
title,
'contentExcerpt': array::join(string::split(array::join(content[]{'text': pt::text(text)}.text, " "), "")[0...300], ""),
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
  content,
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
  content,
  note,
  bio,
  attachments[] {
    ${attachmentFields}
  },
  works[] {
    ${workPreviewFields}
  },
}
`;

const workQuery = groq`
*[_type == 'project' && slug.current == $projectSlug][0]
.works[_type == 'work' && slug.current == $workSlug][0] {
  ${workCommonFields}
  content,
  note,
  bio,
  attachments[] {
    ${attachmentFields}
  },
  // Ignore syntax highlighting error
  ...(*[_type == 'project' && slug.current == $projectSlug][0]{
    curator -> {
      ${curatorFields}
    },
    'projectSlug': slug.current,
    works[] {
      ${workPreviewFields}
    },
  })
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
