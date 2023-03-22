import React from 'react';
import { css } from '@emotion/react';
import theme from '../styles/theme';

/* comps */
import { PageLayout, MainBanner, PublicProgramBanner } from '../../components';

/* states */
import { useRecoilValue, useRecoilState } from 'recoil';
import { headerState, headerColorState } from '../../state/index';
import { GetStaticProps } from 'next';
import { IParams, IPreviewData, TPageCommonProps } from 'interfaces';
import { publicClient } from '@/sanity/publicClient';
import { landingPageQuery } from '@/sanity/queries';
import { landingPageData, TLandingPageData } from '@/schemas';
import { sanityEditorToken } from '@/lib/serverEnvs';

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

  React.useEffect(() => {
    setHeaderColor('#fff');
  }, []);

  // Test
  // console.log(landingPageConfig);

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
            projects={landingPageConfig.projects}
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

export const getStaticProps: GetStaticProps<TProps, IParams, IPreviewData> = async (ctx) => {
  const { preview } = ctx;
  const { landingPageConfig } = landingPageData.parse(await publicClient.fetch(landingPageQuery));
  return {
    props: {
      previewToken: preview ? sanityEditorToken : null,
      landingPageConfig,
    },
  };
};
