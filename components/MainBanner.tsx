import { css, keyframes } from '@emotion/react';
import theme from '../src/styles/theme';
import { useRouter } from 'next/router';
import { urlFor } from '@/lib/helpers';

import introBlockComponents from './portableText/introBlockComponents';
import { PortableText } from '@portabletext/react';

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
  height: auto;
  display: flex;
  flex-direction: column;

  & > div:first-of-type {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    border-top: 2.5px solid #000;
    border-bottom: 2.5px solid #000;
    overflow-x: hidden;

    h2 {
      overflow-x: hidden;
      padding-top: 5px;
      width: 100%;

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
    height: auto;
    display: flex;
    flex-wrap: wrap;
    padding-top: 16px;
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    & > div:first-of-type {
      height: auto;
      padding-top: 0px;
      padding-bottom: 0px;

      h2 {
        font-family: ${theme.fontFamily.sans}, sans-serif;
        font-size: ${theme.fontSize.m_bodySans};
        padding-top: 0px;
        span {
          font-family: ${theme.fontFamily.serif}, serif;
          font-size: ${theme.fontSize.m_bodySerif};
        }
      }
    }

    & > div:last-of-type {
      padding-top: 0px;
      flex-direction: column;
    }
  }
`;

const BannerModuleContainer = css`
  width: calc(100% / 4);
  cursor: pointer;
  :hover {
    & > div:first-of-type {
      opacity: 0.5;
    }
  }

  display: flex;
  flex-direction: column;

  :nth-of-type(4n + 1) {
    & > div:first-of-type {
      padding-left: 0;
    }
  }

  :nth-of-type(4n) {
    & > div:first-of-type {
      padding-right: 0;
    }
  }

  :nth-of-type(2n),
  :nth-of-type(3n),
  :nth-of-type(3n + 4) {
    & > div:last-of-type {
      & > div {
        padding-left: 8px;
      }
    }
  }

  :nth-of-type(5n),
  :nth-of-type(6n),
  :nth-of-type(7n),
  :nth-of-type(8n) {
    & > div:last-of-type {
      border-bottom: none;
      margin-bottom: 0;
    }
  }

  & > div:first-of-type {
    width: 100%;
    height: 250px;
    padding-right: 8px;
    padding-left: 8px;
    margin-bottom: 16px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  & > div:last-of-type {
    width: 100%;

    height: auto;
    display: flex;
    flex-direction: column;
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 2.5px solid #000;
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    width: 100%;
    margin: 0;

    & > div:first-of-type {
      padding-top: 10px;
      padding-left: 0px;
      padding-right: 0px;
      margin-bottom: 5px;
    }

    :nth-of-type(8n) {
      display: none;
    }

    & > div:last-of-type {
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 0;
    }

    :nth-of-type(2n),
    :nth-of-type(3n),
    :nth-of-type(3n + 4) {
      & > div:last-of-type {
        & > div {
          padding-left: 0px;
        }
      }
    }
  }
`;

const BannerModuleTextBox = css`
  & > div:first-of-type {
    padding-bottom: 18px;
    border-bottom: 2.5px dashed #000;
    span {
      padding-right: 11px;
      font-family: ${theme.fontFamily.sans}, sans-serif;
      font-size: ${theme.fontSize.bodySans};
      font-style: normal;
    }
  }

  & > div:nth-of-type(2) {
    height: 127px;
    font-family: ${theme.fontFamily.sans}, sans-serif;
    font-size: ${theme.fontSize.smallBodySans};
    line-height: ${theme.lineHeight.smallBodySans};
    padding-top: 16px;
    padding-bottom: 16px;
    border-bottom: 1.5px dashed #000;

    p {
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      padding-right: 11px;
    }
  }

  & > div:last-of-type {
    height: 127px;
    position: relative;

    font-family: ${theme.fontFamily.serif}, serif;
    font-size: ${theme.fontSize.smallBodySerif};
    line-height: ${theme.lineHeight.smallBodySerif};
    letter-spacing: ${theme.letterSpacing.serif};
    padding-top: 16px;

    p {
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      padding-right: 11px;

      span {
        position: absolute;
        bottom: 0;
        font-family: ${theme.fontFamily.sans}, serif;
        font-size: ${theme.fontSize.m_bannerSans};
        line-height: 1.25;
      }
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    & > div:first-of-type {
      padding-bottom: 5px;
      padding-top: 5px;

      border-bottom: 2.5px dashed #000;
      span {
        font-family: ${theme.fontFamily.sans}, sans-serif;
        font-size: ${theme.fontSize.m_bodySans};
        font-style: normal;
      }
    }

    & > div:nth-of-type(2) {
      height: auto;
      font-family: ${theme.fontFamily.sans}, sans-serif;
      font-size: ${theme.fontSize.m_bannerSans};
      line-height: ${theme.lineHeight.m_bannerSans};
      padding-top: 5px;
      padding-bottom: 5px;
      border-bottom: 2.5px dashed #000;
    }

    & > div:last-of-type {
      height: auto;
      padding-top: 5px;
      padding-bottom: 5px;
      border-bottom: 1.5px dashed #000;
      font-family: ${theme.fontFamily.serif}, serif;
      font-size: ${theme.fontSize.m_bannerSerif};
      line-height: ${theme.lineHeight.m_bannerSerif};
      letter-spacing: ${theme.letterSpacing.serif};

      p {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;

        span {
          position: unset;

          font-family: ${theme.fontFamily.sans}, serif;
          font-size: ${theme.fontSize.m_bannerSans};
          line-height: 1.25;
        }
      }
    }
  }
`;

interface IMainBannerProps {
  projectsSectionTitle: string | null;
  projects: any;
}

const MainBanner = ({ projectsSectionTitle, projects }: IMainBannerProps) => {
  const router = useRouter();
  console.log(projects);
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
              <span>curators</span>_{projectsSectionTitle}
            </div>
          </div>
        </h2>
      </div>
      <div>
        {projects.map((el: any, _i: number) => {
          return (
            <div
              key={_i}
              css={BannerModuleContainer}
              onClick={() =>
                router.push({
                  pathname: `/curatorial_practice/${el.slug}`,
                })
              }
            >
              <div>
                <img
                  src={urlFor(el.thumbnail.image.asset._id).url()}
                  alt={el.thumbnail.alt ?? undefined}
                />
              </div>
              <div css={BannerModuleTextBox}>
                <div>
                  <span>{el.curator.name}</span>
                </div>
                <div>
                  <PortableText value={el.intro} components={introBlockComponents} />
                </div>
                <div>
                  <p>{el.contentExcerpt}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainBanner;
