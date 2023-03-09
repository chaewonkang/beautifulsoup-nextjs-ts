import React from 'react';
import { css } from '@emotion/react';
import theme from '../styles/theme';

/* comps */
import { PageLayout } from '../../components';

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
    border-bottom: 2.5px solid #000;

    & > div:first-of-type {
      padding-top: 10px;
      padding-bottom: 10px;
      h2 {
        font-size: ${theme.fontSize.m_titleSans};
        line-height: ${theme.lineHeight.m_titleSans};
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
  }
`;

const AboutWrapper = (headerHeight: number) => css`
  width: 100%;
  min-height: 50vh;
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;

  & > div {
    width: 100%;
    height: auto;
    display: flex;

    & > div:first-of-type {
      position: -webkit-sticky;
      position: sticky;
      height: fit-content;
      top: ${headerHeight + 16}px;
      width: calc((100% / 12) * 4);
      padding-right: 16px;
      display: flex;
      flex-direction: column;

      p {
        font-family: ${theme.fontFamily.sans}, sans-serif;
        font-size: ${theme.fontSize.captionSans};
        line-height: ${theme.lineHeight.captionSans};
        letter-spacing: ${theme.letterSpacing.sans};
        margin-top: 10px;
        margin-bottom: 20px;
      }
    }

    & > div:last-of-type {
      width: calc((100% / 12) * 8);
      height: fit-content;

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
      }
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    & > div {
      flex-direction: column;

      & > div:first-of-type {
        width: 100%;
        position: unset;
        top: unset;

        p {
          margin-top: 8px;
          margin-bottom: 16px;
        }
      }

      & > div:last-of-type {
        width: 100%;

        p {
          margin-top: 24px;

          font-size: ${theme.fontSize.m_bannerSerif};
          line-height: ${theme.lineHeight.m_bannerSerif};

          span {
            font-size: ${theme.fontSize.m_bannerSans};
            line-height: ${theme.lineHeight.m_bannerSans};
          }
        }
      }
    }
  }
`;

const Contact = (): JSX.Element => {
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
            <div>
              <h2>contact</h2>
            </div>
          </div>
          <div css={AboutWrapper(headerHeight)}>
            <div>
              <div></div>
              <div>
                <p>beautifulsoup.org@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </React.Fragment>
  );
};

export default Contact;
