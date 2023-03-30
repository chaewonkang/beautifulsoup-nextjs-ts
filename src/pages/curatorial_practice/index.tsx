import React from 'react';
import { css, keyframes } from '@emotion/react';
import { urlFor } from '@/lib/helpers';
import theme from '../../styles/theme';
import Image from 'next/image';
import { useRouter } from 'next/router';

/* comps */
import { PageLayout } from '../../../components';

/* states */
import { useRecoilState, useRecoilValue } from 'recoil';
import { headerState, headerColorState } from '../../../state/index';

import arrowDownImage from 'public/images/arrowDown.png';
import { publicClient } from '@/sanity/publicClient';
import { curatorialPracticePageQuery } from '@/sanity/queries';
import { GetStaticProps } from 'next';
import { TPageCommonProps } from 'interfaces';
import { curatorialPracticePageData, TCuratorialPracticePageData } from '@/schemas';
import { PortableText } from '@portabletext/react';
import introBlockComponents from 'components/portableText/introBlockComponents';
import { sanityEditorToken } from '@/lib/serverEnvs';
import { TWithPreviewProps } from '@/sanity/WithPreview';
import Marquee from 'react-fast-marquee';

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
      margin-right: 16px;
      :hover {
        text-decoration: underline;
      }
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
    border-bottom: 2.5px solid #000;

    img {
      width: 20px;
    }

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
      margin-right: 16px;

      :hover {
        text-decoration: underline;
      }
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
    border-bottom: 2.5px solid #000;

    img {
      width: 20px;
    }

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
  :hover {
    opacity: 0.5;
  }

  width: 50%;
  height: auto;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:nth-of-type(2n) {
    & > div:first-of-type {
      padding-right: 0;

      img {
        padding-left: 8px;
      }
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
    position: relative;
    height: 35vh;
    min-height: 400px;

    img {
      width: 100%;
      padding-right: 8px;
      height: 100%;
      object-fit: cover;
    }
  }

  & > div:last-of-type {
    & > div {
      padding-right: 8px;
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    width: 100%;
    padding-right: 0;

    &:nth-of-type(2n) {
      & > div:first-of-type {
        padding-right: 0;
        padding-left: 0;

        img {
          padding-left: 0px;
        }
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
      padding-right: 0;
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
      margin-right: 50px;

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

type TProps = TPageCommonProps & TCuratorialPracticePageData;

const CuratorialPractice = ({ tags, categories, projects }: TProps) => {
  const router = useRouter();
  const headerHeight = useRecoilValue(headerState);
  const [headerColor, setHeaderColor] = useRecoilState(headerColorState);
  const [projectsArr, setProjectsArr] =
    React.useState<TCuratorialPracticePageData['projects']>(projects);

  React.useEffect(() => {
    setHeaderColor('#fff');
  });

  function filteredByTag(array: TCuratorialPracticePageData['projects'], target: string): void {
    const newArray: TCuratorialPracticePageData['projects'] = [];

    array.map((el) => {
      const { tags } = el;
      tags.map((tag) => {
        if (tag.title === target) newArray.push(el);
      });
    });

    setProjectsArr(newArray);
  }

  function filteredByCategory(
    array: TCuratorialPracticePageData['projects'],
    target: string
  ): void {
    const newArray: TCuratorialPracticePageData['projects'] = [];

    array.map((el) => {
      const { categories } = el;
      categories.map((category) => {
        if (category.title === target) newArray.push(el);
      });
    });

    setProjectsArr(newArray);
  }

  function sortedByAlphabet(array: TCuratorialPracticePageData['projects']): void {
    array.sort((a, b) => {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;
      return 0;
    });

    const newArray = [...array];
    setProjectsArr(newArray);
  }

  function sortedByDate(array: TCuratorialPracticePageData['projects']): void {
    array.sort((a, b) => {
      if (a.postedAt > b.postedAt) return -1;
      if (a.postedAt < b.postedAt) return 1;
      return 0;
    });

    const newArray = [...array];
    setProjectsArr(newArray);
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
          <div css={TitleHeader}>
            <div>
              <h2>curatorial practice</h2>
            </div>
            <div>
              <ul>
                <li
                  onClick={() => {
                    sortedByDate(projects);
                  }}
                >
                  recent
                </li>
                <li
                  onClick={() => {
                    sortedByAlphabet(projectsArr);
                  }}
                >
                  a-z
                </li>
              </ul>
            </div>
          </div>
          <div css={keywordContainer}>
            <ul>
              <li onClick={() => setProjectsArr(projects)}>all</li>
              {tags &&
                tags.map((el, _i) => {
                  return (
                    <li key={_i} onClick={() => filteredByTag(projects, el.title)}>
                      {el.title}
                    </li>
                  );
                })}
            </ul>
            <Image src={arrowDownImage} alt="아래 화살표" layout="intrinsic" />
          </div>
          <div css={filterContainer}>
            <ul>
              <li onClick={() => setProjectsArr(projects)}>all</li>
              {categories &&
                categories.map((el, _i) => {
                  return (
                    <li key={_i} onClick={() => filteredByCategory(projects, el.title)}>
                      {el.title}
                    </li>
                  );
                })}
            </ul>
            <Image src={arrowDownImage} alt="아래 화살표" layout="intrinsic" />
          </div>
          <div css={ContentContainer}>
            {projectsArr &&
              projectsArr.map((el, _i) => {
                return (
                  <div
                    key={_i}
                    css={ModuleContainer}
                    onClick={() =>
                      router.push({
                        pathname: `/curatorial_practice/${el.slug}`,
                      })
                    }
                  >
                    <div>
                      <Image
                        src={urlFor(el.thumbnail.image.asset._id).url()}
                        alt={el.thumbnail.alt ?? ''}
                        fill
                      />
                    </div>
                    <div css={ModuleTextWrapper}>
                      <div>
                        <Marquee pauseOnHover speed={5} gradient={false}>
                          <h5>
                            <span>
                              {el.tags.length > 1
                                ? el.tags.map((tag) => {
                                    if (el.tags.indexOf(tag) < el.tags.length - 1)
                                      return tag.title + '+';
                                    else return tag.title;
                                  })
                                : el.tags.map((tag) => {
                                    return tag.title;
                                  })}
                            </span>
                            _{el.title}
                          </h5>
                        </Marquee>
                      </div>

                      <div>
                        {el.intro && (
                          <PortableText value={el.intro} components={introBlockComponents} />
                        )}
                      </div>
                      <div>{el.contentExcerpt && <p>{el.contentExcerpt}...</p>}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </PageLayout>
    </React.Fragment>
  );
};

export default CuratorialPractice;

export const getStaticProps: GetStaticProps<TWithPreviewProps<TProps>> = async (ctx) => {
  const { preview } = ctx;
  try {
    const { tags, categories, projects } = curatorialPracticePageData.parse(
      await publicClient.fetch(curatorialPracticePageQuery, undefined, {
        token: preview ? sanityEditorToken : undefined,
      })
    );
    return {
      props: {
        previewToken: preview ? sanityEditorToken : null,
        tags,
        categories,
        projects,
      },
    };
  } catch (err) {
    return {
      props: { previewError: true },
    };
  }
};
