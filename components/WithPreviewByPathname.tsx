import { routes } from '@/lib/constants';
import WithPreview from '@/sanity/WithPreview';
import {
  aboutPageQuery,
  curatorialPracticePageQuery,
  indexPageQuery,
  landingPageQuery,
  projectPageQuery,
  workPageQuery,
} from '@/sanity/queries';
import {
  aboutPageData,
  curatorialPracticePageData,
  indexPageData,
  landingPageData,
  projectPageData,
  workPageData,
} from '@/schemas';
import { useRouter } from 'next/router';
import { ComponentProps, ReactNode } from 'react';

interface IProps {
  previewToken: ComponentProps<typeof WithPreview>['previewToken'];
  children: ComponentProps<typeof WithPreview>['children'];
}

const WithPreviewByPathname = ({ previewToken, children }: IProps) => {
  const router = useRouter();
  const { pathname, query } = router;

  return (
    <WithPreview
      previewToken={previewToken}
      {...(pathname === routes.landing
        ? { query: landingPageQuery, schema: landingPageData }
        : pathname === routes.about
        ? { query: aboutPageQuery, schema: aboutPageData }
        : pathname === routes.curatorialPractice
        ? { query: curatorialPracticePageQuery, schema: curatorialPracticePageData }
        : pathname === routes.project.pathname
        ? {
            query: projectPageQuery,
            params: { projectSlug: query.curator },
            schema: projectPageData,
          }
        : pathname === routes.work.pathname
        ? {
            query: workPageQuery,
            params: { projectSlug: query.curator, workSlug: query.id },
            schema: workPageData,
          }
        : pathname === routes.index
        ? { query: indexPageQuery, schema: indexPageData }
        : {})}
    >
      {children}
    </WithPreview>
  );
};
export default WithPreviewByPathname;
