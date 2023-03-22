import React from 'react';
import { css } from '@emotion/react';
import theme from '../../styles/theme';
import { urlFor } from '@/lib/helpers';
import { useRouter } from 'next/router';

/* comps */
import { PageLayout } from '../../../components';

/* states */
import { useRecoilValue, useRecoilState } from 'recoil';
import { headerState, headerColorState } from '../../../state/index';

/* props */
import { GetStaticProps } from 'next';
import { TPageCommonProps } from 'interfaces';
import { publicClient } from '@/sanity/publicClient';
import { newsPageQuery } from '@/sanity/queries';
import { newsPageData, TNewsPageData } from '@/schemas';
import { sanityEditorToken } from '@/lib/serverEnvs';
import { TWithPreviewProps } from '@/sanity/WithPreview';

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

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    padding-right: 20px;
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

type TProps = TPageCommonProps & TNewsPageData;

const News = ({ articles }: TProps) => {
  const router = useRouter();
  const headerHeight = useRecoilValue(headerState);
  const [headerColor, setHeaderColor] = useRecoilState(headerColorState);
  const [articlesArr, setArticlesArr] = React.useState<TNewsPageData['articles']>(articles);

  React.useEffect(() => {
    setHeaderColor('#fff');
  });

  function alphabeticalSort(array: TNewsPageData['articles']): void {
    array.sort((a, b) => {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;
      return 0;
    });

    const newArray = [...array];
    setArticlesArr(newArray);
  }

  function dateSort(array: TNewsPageData['articles']): void {
    array.sort((a, b) => {
      if (a.postedAt > b.postedAt) return -1;
      if (a.postedAt < b.postedAt) return 1;
      return 0;
    });

    const newArray = [...array];
    setArticlesArr(newArray);
  }

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
                <li
                  onClick={() => {
                    dateSort(articles);
                  }}
                >
                  recent
                </li>
                <li
                  onClick={() => {
                    alphabeticalSort(articlesArr);
                  }}
                >
                  a-z
                </li>
              </ul>
            </div>
          </div>
          <div>
            {articlesArr &&
              articlesArr.map((el) => {
                return (
                  <div
                    css={NewsModuleContainer}
                    key={el._id}
                    onClick={() =>
                      router.push({
                        pathname: `/news/${el.slug}`,
                      })
                    }
                  >
                    <div>
                      <img
                        src={urlFor(el.thumbnail.image.asset._id).url()}
                        alt={el.thumbnail.alt ?? undefined}
                      />
                    </div>
                    <div>{el.postedAt.slice(0, 10).replace(/-/g, '. ')}</div>
                    <div>
                      <span>{el.title}</span>
                    </div>
                    <div>{el.contentExcerpt}...</div>
                  </div>
                );
              })}
          </div>
        </div>
      </PageLayout>
    </React.Fragment>
  );
};

export default News;

export const getStaticProps: GetStaticProps<TWithPreviewProps<TProps>> = async (ctx) => {
  const { preview } = ctx;
  try {
    const { articles } = newsPageData.parse(
      await publicClient.fetch(newsPageQuery, undefined, {
        token: preview ? sanityEditorToken : undefined,
      })
    );
    return {
      props: {
        previewToken: preview ? sanityEditorToken : null,
        articles,
      },
    };
  } catch (err) {
    return {
      props: { previewError: true },
    };
  }
};
