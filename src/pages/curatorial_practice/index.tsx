import React from 'react';
import { css, keyframes } from '@emotion/react';

import theme from '../../styles/theme';
import Image from 'next/image';

/* comps */
import { PageLayout } from '../../../components';
import { useRouter } from 'next/router';

/* states */
import { useRecoilState, useRecoilValue } from 'recoil';
import { headerState, headerColorState } from '../../../state/index';

import arrowDownImage from 'public/images/arrowDown.png';
import SampleImage1 from 'public/images/about_1.png';

type TKeywordArray = string[];
type TCategoryArray = string[];

const keywordArr: TKeywordArray = ['all', 'open'];

const categoryArr: TCategoryArray = [
  'all',
  'video',
  'photography',
  'chreography',
  'performance',
  'literature',
  'non-fiction',
  'sculpture',
  'painting',
  'technology',
];

const Marquee = css`
  width: 1600vw;
  position: relative;
  overflow: hidden;
  --offset: 20vw;
  --move-initial: calc(0);
  --move-final: calc(-50% + var(--offset));
  display: flex;
  align-items: center;

  & > div {
    width: fit-content;
    display: inline-block;
    position: relative;
    overflow: hidden !important;
    transform: translate3d(var(--move-initial), 0, 0);
    animation-play-state: paused;
    animation-play-state: running;
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

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

const TitleHeader = css`
  width: 100%;
  height: 100px;
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
    height: 49px;
    border-bottom: 2.5px solid #000;

    & > div:first-of-type {
      h2 {
        font-size: ${theme.fontSize.bodySans};
        line-height: ${theme.lineHeight.bodySans};
      }
    }

    & > div:last-of-type {
      ul {
        display: flex;

        li {
          font-size: ${theme.fontSize.m_smallBodySans};
          line-height: ${theme.lineHeight.m_smallBodySans};

          &:first-of-type {
            margin-right: 15px;
          }
        }
      }
    }
  }
`;

const keywordContainer = css`
  width: 100%;
  height: 72px;
  border-bottom: 4px solid #000;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    height: 40px;
    overflow: hidden;

    li {
      font-family: ${theme.fontFamily.serif}, serif;
      font-size: ${theme.fontSize.smallTitleSerif};
      line-height: 40px;
      letter-spacing: ${theme.letterSpacing.serif};
      cursor: pointer;
    }
  }

  img {
    width: 30px;
    cursor: pointer;
    :hover {
      filter: invert(100%);
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    height: 39px;

    ul {
      li {
        font-size: ${theme.fontSize.m_smallBodySerif};
        line-height: 40px;
      }
    }
  }
`;

const filterContainer = css`
  width: 100%;
  height: 72px;
  border-bottom: 4px solid #000;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    height: 40px;
    overflow: hidden;

    li {
      font-family: ${theme.fontFamily.sans}, sans-serif;
      font-size: ${theme.fontSize.smallTitleSans};
      line-height: 40px;
      letter-spacing: ${theme.letterSpacing.sans};
      cursor: pointer;
    }
  }

  img {
    width: 30px;
    cursor: pointer;
    :hover {
      filter: invert(100%);
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    height: 39px;

    ul {
      li {
        font-size: ${theme.fontSize.m_smallBodySans};
        line-height: 40px;
      }
    }
  }
`;

const ContentContainer = css`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  padding-top: 16px;
  padding-bottom: 16px;
`;

const ModuleContainer = css`
  width: 50%;

  height: auto;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:nth-of-type(2n) {
    & > div:first-of-type {
      padding-right: 0;
      padding-left: 8px;
    }

    & > div:last-of-type {
      & > div {
        padding-right: 0;
        padding-left: 8px;
      }
    }
  }

  & > div:first-of-type {
    width: 100%;
    height: 35vh;
    min-height: 400px;
    padding-right: 8px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  & > div:last-of-type {
    & > div {
      padding-right: 8px;
    }
  }

  :hover {
    img {
      opacity: 0.5;
    }

    h5 {
      text-decoration: underline;
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    width: 100%;
    padding-right: 0;

    &:nth-of-type(2n) {
      & > div:first-of-type {
        padding-right: 0;
        padding-left: 0;
      }

      & > div:last-of-type {
        & > div {
          padding-right: 0;
          padding-left: 0;
        }
      }
    }

    & > div:first-of-type {
      min-height: 230px;
      height: 30vh;
      padding-right: 0;0
    }
  }
`;

const ModuleTextWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;

  & > div:first-of-type {
    height: 70px;

    border-bottom: 2.5px dashed #000;
    width: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
    h5 {
      height: fit-content;
      overflow: hidden;
      font-family: ${theme.fontFamily.sans}, sans-serif;
      font-size: ${theme.fontSize.smallTitleSans};
      line-height: ${theme.lineHeight.smallTitleSans};

      span {
        font-family: ${theme.fontFamily.serif}, serif;
        font-size: ${theme.fontSize.smallTitleSerif};
        line-height: ${theme.lineHeight.smallTitleSerif};
      }
    }
  }

  & > div:nth-of-type(2) {
    width: 100%;
    padding-top: 16px;
    padding-bottom: 16px;
    border-bottom: 1.5px dashed #000;

    p {
      width: 100%;
      font-family: ${theme.fontFamily.sans}, sans-serif;
      font-size: ${theme.fontSize.smallBodySans};
      line-height: ${theme.lineHeight.smallBodySans};
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      padding-right: 11px;
      min-height: 48px;
    }
  }

  & > div:last-of-type {
    width: 100%;
    padding-top: 16px;
    padding-bottom: 16px;
    p {
      width: 100%;
      font-family: ${theme.fontFamily.serif}, serif;
      font-size: ${theme.fontSize.smallBodySerif};
      line-height: ${theme.lineHeight.smallBodySerif};
      letter-spacing: ${theme.letterSpacing.serif};
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    & > div:first-of-type {
      height: auto;
      border-bottom: 1.5px dashed #000;
      width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      h5 {
        height: fit-content;
        font-family: ${theme.fontFamily.sans}, sans-serif;
        font-size: ${theme.fontSize.m_bannerSans};
        line-height: ${theme.lineHeight.m_bannerSans};

        span {
          font-size: ${theme.fontSize.m_bannerSerif};
          line-height: ${theme.lineHeight.m_bannerSerif};
        }
      }
    }

    & > div:nth-of-type(2) {
      height: auto;
      padding-top: 8px;
      padding-bottom: 8px;
      border-bottom: 1.5px dashed #000;
      min-height: 0;

      p {
        -webkit-line-clamp: 4;
        font-size: ${theme.fontSize.m_smallBodySans};
        line-height: ${theme.lineHeight.m_smallBodySans};
      }
    }

    & > div:last-of-type {
      width: 100%;
      padding-top: 8px;
      padding-bottom: 8px;
      margin-bottom: 8px;
      border-bottom: 1.5px dashed #000;
      p {
        width: 100%;

        font-size: ${theme.fontSize.m_smallBodySerif};
        line-height: ${theme.lineHeight.m_smallBodySerif};
      }
    }
  }
`;

const Module = () => {
  const router = useRouter();

  const [keywordIsOpen, setKeywordIsOpen] = React.useState(false);
  const [filterisOpen, setFilterIsOpen] = React.useState(false);

  return (
    <div
      css={ModuleContainer}
      onClick={() =>
        router.push({
          pathname: '/curatorial_practice/a_new_vision_of_vision',
        })
      }
    >
      <div>
        <img src="../../static/images/curators/jolene.jpg" />
      </div>
      <div css={ModuleTextWrapper}>
        <div>
          <h5></h5>
        </div>
        <div>
          <h6></h6>
        </div>
        <div>
          <p></p>
        </div>
      </div>
    </div>
  );
};

const CuratorialPractice = (): JSX.Element => {
  const router = useRouter();
  const headerHeight = useRecoilValue(headerState);
  const [headerColor, setHeaderColor] = useRecoilState(headerColorState);

  React.useEffect(() => {
    setHeaderColor('#fff');
  }, []);
  return (
    <React.Fragment>
      <style jsx global>{`
        body {
          background: ${headerColor};
        }
      `}</style>
      <PageLayout>
        <div css={Container(headerHeight)}>
          <div css={TitleHeader}>
            <div>
              <h2>curatorial practice</h2>
            </div>
            <div>
              <ul>
                <li>recent</li>
                <li>a-z</li>
              </ul>
            </div>
          </div>
          <div css={keywordContainer}>
            <ul>
              {keywordArr &&
                keywordArr.map((el, _i) => {
                  return <li key={_i}>{el}&nbsp;/&nbsp;</li>;
                })}
            </ul>
            <Image src={arrowDownImage} alt="아래 화살표" layout="intrinsic" />
          </div>
          <div css={filterContainer}>
            <ul>
              {categoryArr &&
                categoryArr.map((el, _i) => {
                  return <li key={_i}>{el}&nbsp;/&nbsp;</li>;
                })}
            </ul>
            <Image src={arrowDownImage} alt="아래 화살표" layout="intrinsic" />
          </div>
          <div css={ContentContainer}>
            <div
              css={ModuleContainer}
              onClick={() =>
                router.push({
                  pathname: '/curatorial_practice/ong_jo_lene',
                })
              }
            >
              <div>
                <Image src={SampleImage1} alt="sample_image" />
              </div>
              <div css={ModuleTextWrapper}>
                <div>
                  <h5>
                    <div className="marquee">
                      <div className="marquee__inner" aria-hidden="true">
                        <span>open</span>
                        _slippery_tongues_sliding_horizons
                      </div>
                    </div>
                  </h5>
                </div>
                <div>
                  <p>
                    Yun Choi, Finn Maätita & Jerrold Saija, Jesse Chun, Sung Hwan Kim, Liz Ferrer
                    and Bow Ty Venture Capital, Okui Lala & Nasrikah, & PERTIMIG, Nina Djekić, Isola
                    Tong
                  </p>
                </div>
                <div>
                  <p>
                    Composed in the key of ‘open’—one of the five keywords in Five Inclusion Tactics
                    for Seven Curators: empowering, supportive, cooperative, open, fair—Slippery
                    Tongues Sliding Horizons speaks with experiences of navigating multiple
                    languages and existing between fixed categories.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </React.Fragment>
  );
};

export default CuratorialPractice;
