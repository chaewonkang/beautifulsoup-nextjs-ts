import React from 'react';
import { css } from '@emotion/react';
import theme from '../../styles/theme';

/* comps */
import { PageLayout } from '../../../components';

/* states */
import { useRecoilValue, useRecoilState } from 'recoil';
import { headerState, headerColorState } from '../../../state/index';
import { IParams, IPreviewData, TPageCommonProps } from 'interfaces';
import { GetStaticProps } from 'next';
import { publicClient } from '@/sanity/publicClient';
import { indexPageQuery } from '@/sanity/queries';
import { indexPageData, TIndexPageData } from '@/schemas';
import { PortableText } from '@portabletext/react';
import introBlockComponents from 'components/portableText/introBlockComponents';

const Container = (headerHeight: number) => css`
  width: 100vw;
  height: auto;
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
  }
`;

const TitleHeader = (headerHeight: number) => css`
  width: 100%;
  height: 100px;
  position: sticky;
  top: ${headerHeight}px;
  background-color: #fff;
  display: flex;
  border-bottom: 2.5px solid #000;
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

const IndexModuleContainer = (curatorsRow: number) => css`
  width: calc((100% / 12) * 3);
  display: flex;
  flex-direction: column;

  & > div:first-of-type {
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 2.5px dashed #000;
    font-family: ${theme.fontFamily.sans}, sans-serif;
    font-size: ${theme.fontSize.smallTitleSans};
    line-height: ${theme.lineHeight.smallTitleSans};
    letter-spacing: ${theme.letterSpacing.sans};
  }

  & > div:nth-of-type(2) {
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 2.5px dashed #000;
    font-family: ${theme.fontFamily.sans}, sans-serif;
    font-size: ${theme.fontSize.smallTitleSans};
    line-height: ${theme.lineHeight.smallTitleSans};
    letter-spacing: ${theme.letterSpacing.sans};
  }

  & > div:nth-of-type(3) {
    display: flex;
    align-items: center;
    border-bottom: 2.5px dashed #000;
    height: 60px;
    font-family: ${theme.fontFamily.serif}, serif;
    font-size: ${theme.fontSize.smallTitleSerif};
    line-height: ${theme.lineHeight.smallTitleSerif};
    letter-spacing: ${theme.letterSpacing.serif};
  }

  & > div:last-of-type {
    padding-top: 16px;
    padding-bottom: 16px;
    font-family: ${theme.fontFamily.sans}, sans-serif;
    font-size: ${theme.fontSize.smallBodySans};
    line-height: ${theme.lineHeight.smallBodySans};
    letter-spacing: ${theme.letterSpacing.sans};
    border-bottom: 2.5px solid #000;
    padding-bottom: 20px;
    padding-right: 20px;

    p {
      height: 250px;
      overflow: scroll;
    }
  }

  &:nth-of-type(${4 * curatorsRow + 1}) > div:last-of-type,
  &:nth-of-type(${4 * curatorsRow + 2}) > div:last-of-type,
  &:nth-of-type(${4 * curatorsRow + 3}) > div:last-of-type,
  &:nth-of-type(${4 * curatorsRow + 4}) > div:last-of-type {
    border-bottom: none;
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    width: 50%;

    &:nth-of-type(2n) {
      & > div:nth-of-type(4) {
        padding-left: 5px;
      }
    }

    &:nth-of-type(2n + 1) {
      & > div:nth-of-type(4) {
        padding-right: 5px;
      }
    }

    & > div:first-of-type {
      height: auto;
      padding: 8px 0px;
      border-bottom: 1.5px dashed #000;
      font-size: ${theme.fontSize.m_headerMenu};
      line-height: ${theme.lineHeight.m_headerMenu};
    }

    & > div:nth-of-type(2) {
      height: auto;
      padding: 10px 0px;
      border-bottom: 1.5px dashed #000;
      font-size: ${theme.fontSize.m_headerMenu};
      line-height: ${theme.fontSize.m_headerMenu};
    }

    & > div:nth-of-type(3) {
      height: auto;
      padding: 10px 0px;
      border-bottom: 1.5px dashed #000;
      font-size: ${theme.fontSize.m_bannerSerif};
      line-height: ${theme.fontSize.m_bannerSerif};
    }

    & > div:last-of-type {
      padding: 10px 0px;
      border-bottom: 1.5px dashed #000;
      font-size: ${theme.fontSize.m_smallBodySans};
      line-height: ${theme.lineHeight.m_smallBodySans};
    }

    &:nth-of-type(${4 * curatorsRow + 1}) > div:last-of-type,
    &:nth-of-type(${4 * curatorsRow + 2}) > div:last-of-type,
    &:nth-of-type(${4 * curatorsRow + 3}) > div:last-of-type,
    &:nth-of-type(${4 * curatorsRow + 4}) > div:last-of-type {
      border-bottom: 1.5px dashed #000;
    }
  }
`;

type TProps = TPageCommonProps & TIndexPageData;

const Index = ({ curators }: TProps): JSX.Element => {
  const headerHeight = useRecoilValue(headerState);
  const [headerColor, setHeaderColor] = useRecoilState(headerColorState);
  const curatorsRow: number = Math.floor(curators.length / 4);
  const [curatorsArr, setCuratorsArr] = React.useState<TIndexPageData['curators']>(curators);

  function shuffle(array: TIndexPageData['curators']): void {
    let currentIndex: number = array.length,
      randomIndex: number;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    const newArray = [...array];
    setCuratorsArr(newArray);
  }

  function alphabeticalSort(array: TIndexPageData['curators']): void {
    array.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });

    const newArray = [...array];
    setCuratorsArr(newArray);
  }

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
              <h2>Index</h2>
            </div>
            <div>
              <ul>
                <li
                  onClick={() => {
                    shuffle(curatorsArr);
                  }}
                >
                  shuffle
                </li>
                <li
                  onClick={() => {
                    alphabeticalSort(curatorsArr);
                  }}
                >
                  a-z
                </li>
              </ul>
            </div>
          </div>
          <div>
            {curatorsArr &&
              curatorsArr.map((el: any, _i: number) => {
                return (
                  <div css={IndexModuleContainer(curatorsRow)} key={el._id}>
                    <div>{_i + 1}</div>
                    <div>{el.name}</div>
                    <div>
                      {el.nationality}_{el.residence}
                    </div>
                    <div>
                      <PortableText value={el.intro} components={introBlockComponents} />
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

export default Index;

export const getStaticProps: GetStaticProps<TProps, IParams, IPreviewData> = async (ctx) => {
  const { previewData, params } = ctx;

  const { curators } = indexPageData.parse(await publicClient.fetch(indexPageQuery));

  return {
    props: {
      previewToken: previewData ? previewData.previewToken : null,
      curators,
    },
  };
};
