import React from 'react';
import { css } from '@emotion/react';
import theme from '../styles/theme';

/* comps */
import { PageLayout, MainBanner, PublicProgramBanner, NewsLetterSubmit } from '../../components';

/* states */
import { useRecoilValue, useRecoilState } from 'recoil';
import { headerState, headerColorState } from '../../state/index';

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

const Index = () => {
  const headerHeight = useRecoilValue(headerState);
  const [headerColor, setHeaderColor] = useRecoilState(headerColorState);

  React.useEffect(() => {
    setHeaderColor('#fff');
  });

  return (
    <React.Fragment>
      <style jsx global>{`
        body {
          background: ${headerColor};
        }
      `}</style>
      <PageLayout>
        <div css={Container(headerHeight)}>
          <MainBanner />
          <PublicProgramBanner />
        </div>
      </PageLayout>
    </React.Fragment>
  );
};

export default Index;
