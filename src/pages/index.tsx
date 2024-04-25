import React from 'react';
import { css } from '@emotion/react';
import theme from '../styles/theme';

/* comps */
import { PageLayout, MainBanner, PublicProgramBanner } from '../../components';

/* states */
import { useRecoilValue, useRecoilState } from 'recoil';
import { headerState, headerColorState } from '../../state/index';
import { GetStaticProps } from 'next';
import { TPageCommonProps } from 'interfaces';
import { publicClient } from '@/sanity/publicClient';
import { landingPageQuery } from '@/sanity/queries';
import { landingPageData, TLandingPageData } from '@/schemas';
import { sanityEditorToken } from '@/lib/serverEnvs';
import { TWithPreviewProps } from '@/sanity/WithPreview';

const Container = (headerHeight: number) => css`
  width: 100%;
  height: auto;
  padding-left: 22px;
  padding-right: 22px;
  padding-top: ${headerHeight}px;
  @media only screen and (max-width: ${theme.size.mobile}) {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

type TProps = TPageCommonProps & TLandingPageData;

const Index = ({ landingPageConfig }: TProps) => {
  const headerHeight = useRecoilValue(headerState);
  const [headerColor, setHeaderColor] = useRecoilState(headerColorState);

  setHeaderColor('#fff');

  return (
    <React.Fragment>
      <style jsx global>{`
        body {
          background: ${headerColor};
        }
      `}</style>
      <PageLayout>
        <div css={Container(headerHeight)}>
          <MainBanner
            projectsSectionTitle={landingPageConfig.projectsSectionTitle}
            projects={landingPageConfig.projects?.reverse()}
          />
          <PublicProgramBanner
            programsSectionTitle={landingPageConfig.programsSectionTitle}
            programs={landingPageConfig.programs}
          />
        </div>
      </PageLayout>
    </React.Fragment>
  );
};

export default Index;

export const getStaticProps: GetStaticProps<TWithPreviewProps<TProps>> = async (ctx) => {
  const { preview } = ctx;
  try {
    const { landingPageConfig } = landingPageData.parse(
      await publicClient.fetch(landingPageQuery, undefined, {
        token: preview ? sanityEditorToken : undefined,
      })
    );
    return {
      props: {
        previewToken: preview ? sanityEditorToken : null,
        landingPageConfig,
      },
    };
  } catch (err) {
    return {
      props: { previewError: true },
    };
  }
};
