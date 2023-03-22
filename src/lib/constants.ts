export const routes = {
  landing: '/',
  about: '/about',
  curatorialPractice: '/curatorial_practice',
  project: {
    pathname: '/curatorial_practice/[curator]',
    path: (projectSlug: string) => `/curatorial_practice/${projectSlug}`,
  },
  work: {
    pathname: '/curatorial_practice/[curator]/[id]',
    path: (projectSlug: string, workSlug: string) =>
      `/curatorial_practice/${projectSlug}/${workSlug}`,
  },
  news: '/news',
  article: {
    pathname: '/news/[id]',
    path: (articleSlug: string) => `/news/${articleSlug}`,
  },
  index: '/index',
};
