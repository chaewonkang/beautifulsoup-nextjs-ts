import React from 'react';
import { css, keyframes } from '@emotion/react';
import theme from '../../styles/theme';

import Image from 'next/image';
import Link from 'next/link';

/* comps */
import { PageLayout } from 'components';
import ContentSection from 'components/ContentSection';
import contentSectionTextBlockComponents from 'components/portableText/contentSectionTextBlockComponents';

/* states */
import { useRecoilValue, useRecoilState } from 'recoil';
import { headerState, headerColorState } from '../../../state/index';

/* interfaces */
import type { TPageCommonProps } from '../../../interfaces/index';
import { GetStaticPaths, GetStaticProps } from 'next';
import { articlePageQuery } from '@/sanity/queries';
import { publicClient } from '@/sanity/publicClient';
import { articlePageDataNullable, TArticlePageData } from '@/schemas';
import { sanityEditorToken } from '@/lib/serverEnvs';

import { TWithPreviewProps } from '@/sanity/WithPreview';

/* etc */
import ArrowLeft from '../../../public/images/arrowLeft.png';
import Marquee from 'react-fast-marquee';

const Container = (headerHeight: number) => css`
  width: 100%;
  height: auto;
  padding-left: 22px;
  padding-right: 22px;
  padding-top: ${headerHeight}px;
  @media only screen and (max-width: ${theme.size.mobile}) {
    height: auto;
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

  h2 {
    font-family: ${theme.fontFamily.sans}, sans-serif;
    font-size: ${theme.fontSize.category};
    line-height: ${theme.lineHeight.category};
    letter-spacing: ${theme.letterSpacing.sans};
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    height: auto;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 2.5px solid #000;
    h2 {
      font-size: ${theme.fontSize.m_titleSans};
      line-height: ${theme.lineHeight.m_titleSans};
    }
  }
`;

const ContentContainer = (headerHeight: number) => css`
  width: 100%;
  height: auto;

  & > div:first-of-type {
    position: sticky;
    z-index: 1;
    top: ${headerHeight}px;
    background-color: #fff;
    border-bottom: 4px solid #000;
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow-x: hidden;

    & > div:first-of-type {
      width: calc((100% / 12) * 4);
      padding-right: 40px;
    }

    & > div:last-of-type {
      width: calc((100% / 12) * 8);
    }

    & > div {
      overflow-x: hidden;
      h3 {
        overflow-x: hidden;
        font-family: ${theme.fontFamily.sans}, sans-serif;
        font-size: ${theme.fontSize.titleSans};
        line-height: ${theme.lineHeight.titleSans};
        letter-spacing: ${theme.letterSpacing.sans};

        span {
          font-family: ${theme.fontFamily.serif}, serif;
          font-size: ${theme.fontSize.titleSerif};
          line-height: ${theme.lineHeight.titleSerif};
          letter-spacing: ${theme.letterSpacing.serif};
        }
      }
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    & > div:first-of-type {
      flex-direction: column;
      height: auto;

      & > div:first-of-type {
        width: 100%;
        padding: 0;
        border-bottom: 2.5px dashed #000;
      }

      & > div:last-of-type {
        width: 100%;
      }

      & > div {
        h3 {
          font-size: ${theme.fontSize.m_titleSans};
        }
      }
    }
  }
`;

const ContentWrapper = css`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;

  & > div {
    width: 100%;
    display: flex;
    padding-top: 16px;

    & > div:first-of-type {
      position: -webkit-sticky;
      position: sticky;
      height: fit-content;
      top: 276px;
      width: calc((100% / 12) * 4);
      padding-right: 16px;
      display: flex;
      flex-direction: column;

      & > img {
        width: 100%;
      }

      & > span,
      & > p {
        em {
          font-style: italic;
        }
        margin-top: 8px;
        font-family: ${theme.fontFamily.sans}, sans-serif;
        font-size: ${theme.fontSize.captionSans};
        line-height: ${theme.lineHeight.captionSans};
        letter-spacing: ${theme.letterSpacing.sans};
      }
    }

    & > div:last-of-type {
      width: calc((100% / 12) * 8);
      height: fit-content;

      center {
        font-family: ${theme.fontFamily.serif}, serif;
        font-size: ${theme.fontSize.bodySerif};
        line-height: ${theme.lineHeight.bodySerif};
        letter-spacing: ${theme.letterSpacing.serif};
      }

      p {
        width: 100%;
        margin-bottom: ${theme.lineHeight.bodySerif};
        font-family: ${theme.fontFamily.serif}, serif;
        font-size: ${theme.fontSize.bodySerif};
        line-height: ${theme.lineHeight.bodySerif};
        letter-spacing: ${theme.letterSpacing.serif};

        span {
          font-family: ${theme.fontFamily.sans}, sans-serif;
          font-size: ${theme.fontSize.bodySans};
          line-height: ${theme.lineHeight.bodySans};
          letter-spacing: ${theme.letterSpacing.sans};
        }

        em {
          font-style: italic;
        }
      }
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    padding-bottom: 16px;
    & > div {
      flex-direction: column;
      & > div:first-of-type {
        width: 100%;
        padding-right: 0;
        padding-top: 0px;
        position: unset;
      }

      & > div:last-of-type {
        padding-top: 16px;
        img {
          width: 100%;
          padding-bottom: 8px;
        }
        width: 100%;
        height: fit-content;

        center {
          font-size: ${theme.fontSize.m_bodySerif};
          line-height: ${theme.lineHeight.m_bodySerif};
        }

        p {
          width: 100%;
          margin-bottom: 0px;
          font-size: ${theme.fontSize.m_bodySerif};
          line-height: ${theme.lineHeight.m_bodySerif};

          b {
            font-style: italic;
          }

          span {
            display: block;
            font-size: ${theme.fontSize.m_bodySans};
            line-height: ${theme.lineHeight.m_bodySans};
          }
        }
        span {
          display: block;
          font-size: ${theme.fontSize.m_captionSans};
          line-height: ${theme.lineHeight.m_captionSans};
        }
      }
    }
  }
`;

const NewsDetailNavBar = css`
  height: fit-content;
  top: 276px;
  height: 80px;
  width: 100%;
  border-top: 2.5px solid #000;
  display: flex;
  align-items: center;
  padding-top: 0;
  justify-content: space-between;
  cursor: pointer;

  :hover {
    opacity: 0.5;
  }

  & > div:first-of-type {
    font-family: ${theme.fontFamily.sans}, sans-serif;
    font-size: ${theme.fontSize.titleSans};
    line-height: ${theme.lineHeight.titleSans};
    letter-spacing: ${theme.letterSpacing.sans};
    width: 100%;
    overflow: hidden;
  }

  & > div:last-of-type {
    width: 40px;
    margin-left: 20px;
    height: 100%;
    display: flex;
    align-items: center;

    img {
      width: 100%;
      object-fit: contain;
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    height: auto;
    padding-top: 5px;
    padding-bottom: 5px;
    border-top: 2.5px solid #000;

    & > div:first-of-type {
      font-size: ${theme.fontSize.m_titleSans};
      line-height: ${theme.lineHeight.m_titleSans};
      width: 100%;
    }

    & > div:last-of-type {
      width: 20px;
    }
  }
`;

type TProps = TPageCommonProps & TArticlePageData;

const id = ({ article }: TProps): JSX.Element => {
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
          <div css={TitleHeader}>
            <h2>news</h2>
          </div>
          <div css={ContentContainer(headerHeight)}>
            <div>
              <div>
                <Marquee pauseOnHover speed={5} gradient={false}>
                  <h3>{article.postedAt.slice(0, 10).replace(/-/g, '. ')}</h3>
                </Marquee>
              </div>
              <div>
                <Marquee pauseOnHover speed={5} gradient={false}>
                  <h3>{article.title}</h3>
                </Marquee>
              </div>
            </div>
            <div css={ContentWrapper}>
              {article.content?.map((contentSection, idx) => (
                <ContentSection
                  key={idx}
                  contentSection={contentSection}
                  components={contentSectionTextBlockComponents}
                />
              ))}
            </div>
            <Link href="/news" style={{ textDecoration: 'none' }}>
              <div css={NewsDetailNavBar}>
                <div>Back To List</div>
                <div>
                  <Image src={ArrowLeft} alt="arrow_left" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </PageLayout>
    </React.Fragment>
  );
};

export default id;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<TWithPreviewProps<TProps>> = async (ctx) => {
  const { preview, params } = ctx;

  const articleSlug = params?.id;
  if (typeof articleSlug !== 'string') throw new Error('never');

  try {
    const { article } = articlePageDataNullable.parse(
      await publicClient.fetch(
        articlePageQuery,
        { articleSlug },
        { token: preview ? sanityEditorToken : undefined }
      )
    );
    if (!article) return { notFound: true };
    return {
      props: {
        previewToken: preview ? sanityEditorToken : null,
        article,
      },
    };
  } catch (err) {
    return {
      props: { previewError: true },
    };
  }
};
