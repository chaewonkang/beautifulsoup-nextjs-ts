import React from 'react';
import { css } from '@emotion/react';
import theme from '../../styles/theme';
import Image from 'next/image';

/* comps */
import { PageLayout } from '../../../components';

/* states */
import { useRecoilValue, useRecoilState } from 'recoil';
import { headerState, headerColorState } from '../../../state/index';

/* images */
import SampleImage1 from '/public/images/about_1.png';

const Container = (headerHeight: number) => css`
  width: 100%;
  height: auto;
  min-height: 100vh;
  padding-left: 22px;
  padding-right: 22px;
  padding-top: ${headerHeight}px;

  & > div:last-of-type {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    padding-left: 16px;
    padding-right: 16px;

    & > div:last-of-type {
      flex-direction: column;
    }
  }
`;

const TitleHeader = (headerHeight: number) => css`
  width: 100%;
  height: 100px;
  position: sticky;
  top: ${headerHeight}px;
  background-color: #fff;
  display: flex;
  border-bottom: 4px solid #000;
  align-items: center;
  justify-content: space-between;

  & > div:first-of-type {
    h2 {
      font-family: ${theme.fontFamily.sans}, sans-serif;
      font-size: ${theme.fontSize.category};
      line-height: ${theme.lineHeight.category};
      letter-spacing: ${theme.letterSpacing.sans};
    }
  }

  & > div:last-of-type {
    width: fit-content;
    display: flex;
    flex-direction: column;

    ul {
      li {
        font-family: ${theme.fontFamily.sans}, sans-serif;
        font-size: ${theme.fontSize.smallTitleSans};
        line-height: ${theme.lineHeight.smallTitleSans};
        letter-spacing: ${theme.letterSpacing.sans};
        cursor: pointer;

        :hover {
          text-decoration: underline;
        }
      }
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    height: auto;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 2.5px solid #000;
    & > div:first-of-type {
      h2 {
        font-size: ${theme.fontSize.m_titleSans};
        line-height: ${theme.lineHeight.m_titleSans};
      }
    }

    & > div:last-of-type {
      flex-direction: row;

      ul {
        display: flex;
        li {
          font-size: ${theme.fontSize.m_smallBodySans};
          line-height: ${theme.lineHeight.m_smallBodySans};
        }

        li:first-of-type {
          margin-right: 10px;
        }
      }
    }
  }
`;

const NewsModuleContainer = css`
  width: calc((100% / 12) * 3);
  display: flex;
  flex-direction: column;

  :nth-of-type(1),
  :nth-of-type(4n + 1) {
    & > div:first-of-type {
      padding-left: 0px !important;
    }
  }

  :nth-of-type(4),
  :nth-of-type(4n) {
    & > div:first-of-type {
      padding-right: 0px !important;
    }
  }

  & > div:first-of-type {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 2.5px dashed #000;
    padding: 16px 8px 16px 8px;
    height: calc(((100vw - 44px) / 12 * 2.2));

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  & > div:nth-of-type(2) {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 2.5px dashed #000;
    height: 60px;
    font-family: ${theme.fontFamily.serif}, serif;
    font-size: ${theme.fontSize.smallTitleSerif};
    line-height: ${theme.lineHeight.smallTitleSerif};
    letter-spacing: ${theme.letterSpacing.serif};
  }

  & > div:nth-of-type(3) {
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 2.5px dashed #000;
    font-family: ${theme.fontFamily.sans}, sans-serif;
    font-size: ${theme.fontSize.smallTitleSans};
    line-height: ${theme.lineHeight.smallTitleSans};
    letter-spacing: ${theme.letterSpacing.sans};
  }

  & > div:last-of-type {
    padding-top: 16px;
    padding-bottom: 16px;
    font-family: ${theme.fontFamily.serif}, serif;
    font-size: ${theme.fontSize.smallBodySerif};
    line-height: ${theme.lineHeight.smallBodySerif};
    letter-spacing: ${theme.letterSpacing.serif};
    padding-right: 16px;

    & > p {
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    width: 100%;

    & > div:first-of-type {
      padding-left: 0;
      padding-right: 0;
      height: auto;
    }

    & > div:nth-of-type(2) {
      width: 100%;
      border-bottom: 1.5px dashed #000;
      height: auto;
      padding: 10px 0px;
      font-size: ${theme.fontSize.m_bannerSerif};
      line-height: ${theme.lineHeight.m_bannerSerif};
    }

    & > div:nth-of-type(3) {
      height: auto;
      padding: 10px 0px;
      border-bottom: 1.5px dashed #000;
      font-size: ${theme.fontSize.m_bannerSans};
      line-height: ${theme.lineHeight.m_bannerSans};
    }

    & > div:last-of-type {
      padding: 10px 0px;
      font-size: ${theme.fontSize.m_smallBodySerif};
      line-height: ${theme.lineHeight.m_smallBodySerif};
      padding-right: 0px;
      border-bottom: 1.5px dashed #000;

      & > p {
        -webkit-line-clamp: 3;
      }
    }
  }
`;

const NewsModule = () => {
  return (
    <div css={NewsModuleContainer}>
      <div>
        <Image src={SampleImage1} alt="sample_image" />
      </div>
      <div>2022. 11. 28. </div>
      <div>A New Vision of Vision</div>
      <div>
        <p>
          Buddhism uses a similar image to describe the interconnectedness of all phenomena. It is
          called Indra’s Net. When Indra fashioned the world, he made it as a web, and at every knot
          in the web is tied a pearl. Everything that exists, or has ever existed, every idea that
          can be thought about, every datum that is true—every…
        </p>
      </div>
    </div>
  );
};

const News = (): JSX.Element => {
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
          <div css={TitleHeader(headerHeight)}>
            <div>
              <h2>news</h2>
            </div>
            <div>
              <ul>
                <li>recent</li>
                <li>a-z</li>
              </ul>
            </div>
          </div>
          <div>
            <NewsModule />
          </div>
        </div>
      </PageLayout>
    </React.Fragment>
  );
};

export default News;
