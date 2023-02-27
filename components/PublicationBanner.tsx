import React from 'react';
import { css, keyframes } from '@emotion/react';
import theme from '../src/styles/theme';

const MarqueeAnimation = keyframes`
0% {
    transform: translate3d(var(--move-initial), 0, 0);
}

100% {
    transform: translate3d(var(--move-final), 0, 0);
}
`;

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

const Container = css`
  width: 100%;

  & > div:first-of-type {
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;

    border-top: 2.5px solid #000;
    border-bottom: 2.5px solid #000;

    h2 {
      padding-top: 5px;
      width: 100%;

      overflow: hidden;

      font-family: ${theme.fontFamily.sans}, sans-serif;
      font-size: ${theme.fontSize.titleSans};

      span {
        font-family: ${theme.fontFamily.serif}, serif;
        font-size: ${theme.fontSize.titleSerif};
      }
    }
  }

  & > div:last-of-type {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 16px;
    padding-bottom: 16px;

    & > div:first-of-type {
      font-family: ${theme.fontFamily.sans}, sans-serif;
      font-size: ${theme.fontSize.smallTitleSerif};
      border-bottom: 2.5px dashed #000;
      padding-bottom: 16px;

      span {
        font-family: ${theme.fontFamily.serif}, serif;
        font-size: ${theme.fontSize.smallTitleSerif};
      }
    }

    & > div:nth-of-type(2) {
      padding-top: 16px;
      font-family: ${theme.fontFamily.sans}, sans-serif;
      font-size: ${theme.fontSize.smallBodySans};
      padding-bottom: 16px;
      border-bottom: 1.5px dashed #000;
    }

    & > div:nth-of-type(3) {
      padding-top: 16px;
      padding-bottom: 16px;
      font-family: ${theme.fontFamily.serif}, serif;
      font-size: ${theme.fontSize.smallBodySerif};
    }

    & > div:last-of-type {
      display: flex;
      width: 100%;

      & > div {
        width: calc((100% / 12) * 2);
        height: auto;
        margin-left: 11px;
        margin-right: 11px;

        &:first-of-type {
          margin-left: 0;
        }

        &:last-of-type {
          margin-right: 0;
        }

        & > img {
          width: 100%;
          height: auto;
          object-fit: contain;
          border: 2px dashed #000;
        }
      }
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    & > div:first-of-type {
      height: auto;
      padding-top: 8px;
      padding-bottom: 8px;
      h2 {
        font-family: ${theme.fontFamily.sans}, sans-serif;
        font-size: ${theme.fontSize.m_bodySans};

        span {
          font-family: ${theme.fontFamily.serif}, serif;
          font-size: ${theme.fontSize.m_bodySerif};
        }
      }
    }

    & > div:last-of-type {
      & > div:first-of-type {
        padding-bottom: 18px;

        border-bottom: 2.5px dashed #000;

        font-family: ${theme.fontFamily.sans}, sans-serif;
        font-size: ${theme.fontSize.m_bannerSans};

        span {
          font-family: ${theme.fontFamily.serif}, serif;
          font-size: ${theme.fontSize.m_bodySerif};
          font-style: normal;
        }
      }

      & > div:nth-of-type(2) {
        padding-top: 16px;
        font-family: ${theme.fontFamily.sans}, sans-serif;
        font-size: ${theme.fontSize.m_bannerSans};
        line-height: ${theme.lineHeight.m_bannerSans};
        padding-bottom: 16px;
        border-bottom: 4px dashed #000;
      }

      & > div:nth-of-type(3) {
        padding-top: 16px;
        padding-bottom: 16px;
        font-family: ${theme.fontFamily.serif}, serif;
        font-size: ${theme.fontSize.m_bannerSerif};
        line-height: ${theme.lineHeight.m_bannerSerif};
        letter-spacing: ${theme.letterSpacing.serif};
      }
    }
  }
`;

const PublicationBanner = () => {
  return (
    <div css={Container}>
      <div>
        <h2>
          <div css={Marquee}>
            <div
              css={css`
                animation: ${MarqueeAnimation} 100s linear infinite;
              `}
            >
              <span>publication</span>
              _project_ the_great_museum&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>publication</span>
              _project_ the_great_museum&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
              <span>publication</span>
              _project_ the_great_museum&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </h2>
      </div>
      <div>
        <div>
          <p>
            <span>Cultural studies, film & media</span>
            _proeject_the_great_museum
          </p>
        </div>
        <div>
          <p>r&d collective, edited by Honggyun Mok Manique Hendricks Klega, 2022</p>
        </div>
        <div>
          <p>
            Buddhism uses a similar image to describe the interconnectedness of all phenomena. It is
            called Indra’s Net. When Indra fashioned the world, he made it as a web, and at every
            knot in the web is tied a pearl. Everything that exists, or has ever existed, every idea
            that can be thought about, every datum that is true—every dharma, in the language of
            Indian philosophy—is a pearl in Indra’s net. Not only is every pearl tied to every other
            pearl by virtue of the web on which they hang, but on the surface of every pearl is
            reflected every other jewel on the net. Everything that exists in Indra’s web implies
            all else that exists very pearl tied to every other pearl by virtue of the web.
          </p>
        </div>
        <div>
          <div>
            <img src="../static/images/publication_1.png" />
          </div>
          <div>
            <img src="../static/images/publication_2.png" />
          </div>
          <div>
            <img src="../static/images/publication_3.png" />
          </div>
          <div>
            <img src="../static/images/publication_4.png" />
          </div>
          <div>
            <img src="../static/images/publication_5.png" />
          </div>
          <div>
            <img src="../static/images/publication_6.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationBanner;
