import { css, keyframes } from '@emotion/react';
import theme from '../src/styles/theme';
import Image from 'next/image';
import SampleImage1 from '/public/images/about_1.png';

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
    padding-top: 16px;
    padding-bottom: 16px;
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    margin-top: 16px;
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
      flex-direction: column;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
`;

const BannerModuleContainer = css`
  width: calc(100% / 4);

  display: flex;
  flex-direction: column;

  &:nth-of-type(2),
  &:nth-of-type(3) {
    & > div:first-of-type {
      padding-left: 8px;
      padding-right: 8px;
      height: calc((100vw / 12) * 3 * 1.3);
    }

    & > div:last-of-type {
      & > div {
        padding-left: 8px;
        padding-right: 8px;
      }
    }
  }

  &:first-of-type {
    & > div:first-of-type {
      padding-right: 8px;
      height: calc((100vw / 12) * 3 * 1.3);
    }

    & > div:last-of-type {
      & > div {
        padding-right: 8px;
      }
    }
  }

  &:last-of-type {
    & > div:first-of-type {
      padding-left: 11px;
      height: calc((100vw / 12) * 3 * 1.3);
    }

    & > div:last-of-type {
      & > div {
        padding-left: 11px;
      }
    }
  }

  & > div:first-of-type {
    width: 100%;
    height: fit-content;
    margin-bottom: 18px;

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
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    width: 100%;
    margin: 0;

    & > div:first-of-type {
      padding-top: 0px;
    }

    &:nth-of-type(2),
    &:nth-of-type(3) {
      & > div:first-of-type {
        padding-left: 0px;
        padding-right: 0px;
        height: fit-content;
      }

      & > div:last-of-type {
        & > div {
          padding-left: 0px;
          padding-right: 0px;
        }
      }
    }

    &:first-of-type {
      & > div:first-of-type {
        padding-right: 0px;
        height: fit-content;
        margin-bottom: 10px;
      }

      & > div:last-of-type {
        & > div {
          padding-right: 0px;
        }
      }
    }

    &:last-of-type {
      & > div:first-of-type {
        padding-left: 0px;
        height: fit-content;
      }

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
    height: 100px;
    padding-bottom: 18px;
    border-bottom: 2.5px dashed #000;
    font-family: ${theme.fontFamily.serif}, serif;
    font-size: ${theme.fontSize.bodySerif};
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    span {
      font-family: ${theme.fontFamily.sans}, sans-serif;
      font-size: ${theme.fontSize.bodySans};
      font-style: normal;
    }
  }

  & > div:nth-of-type(2) {
    height: 50px;
    font-family: ${theme.fontFamily.sans}, sans-serif;
    font-size: ${theme.fontSize.smallBodySans};
    line-height: ${theme.lineHeight.smallBodySans};
    display: flex;
    align-items: center;
    border-bottom: 1.5px dashed #000;

    p {
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  & > div:last-of-type {
    height: 135px;
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
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    & > div:first-of-type {
      padding-top: 0px;
      padding-bottom: 5px;
      height: auto;
      border-bottom: 2.5px dashed #000;
      font-size: ${theme.fontSize.m_bodySerif};

      span {
        font-family: ${theme.fontFamily.sans}, sans-serif;
        font-size: ${theme.fontSize.m_bodySans};
        font-style: normal;
      }
    }

    & > div:nth-of-type(2) {
      font-family: ${theme.fontFamily.sans}, sans-serif;
      font-size: ${theme.fontSize.m_bannerSans};
      line-height: ${theme.lineHeight.m_bannerSans};
      padding-top: 5px;
      padding-bottom: 5px;
      border-bottom: 2.5px dashed #000;
      height: auto;
    }

    & > div:last-of-type {
      height: auto;
      font-family: ${theme.fontFamily.serif}, serif;
      font-size: ${theme.fontSize.m_bannerSerif};
      line-height: ${theme.lineHeight.m_bannerSerif};
      letter-spacing: ${theme.letterSpacing.serif};
      padding-top: 5px;
      padding-bottom: 5px;
      margin-bottom: 10px;
      border-bottom: 1.5px dashed #000;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden !important;
    }
  }
`;

const PublicProgramBanner = () => {
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
              <span>curators</span>
              _The_5_Inclusion_Tactics_For_Curators_“empowering,_supportive,_open,
              _fair,_cooperative"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </h2>
      </div>
      <div>
        <div css={BannerModuleContainer}>
          <div>
            <Image src={SampleImage1} alt="sample_image" />
          </div>
          <div css={BannerModuleTextBox}>
            <div>
              public_program
              <span>_blurring_with_tears_for_35_minutes</span>
            </div>
            <div>
              <p>beautifulsoup.org</p>
            </div>
            <div>
              <p>
                Blurring with tears for 35 minutes
                <br />
                The title of this performance, ‘Blurring with tears for 35 minutes’ revisits the
                imagery of Kumgang Spring Dream (2016) by Yun Choi and implies the running time of
                Choi’s action to occupy the website of Beautiful Soup. Anonymous participants on
                multiple screens, where past, present, and future tenses are entangled and bundled.
                With the obscure layers of mumbling and chanting from her studio, sobbing and crying
                from Kumgang Spring Dream, the participants choose either to mourn or to welcome the
                unknowns.
                <br />
                Live Streaming Performance
                <br /> 15.25-16.00 (CET), 23.25-24.00 (KST), Wednesday, 14 December
                <br /> On website (beautifulsoup.org),
                <br />
                Rijksakademie van beeldende kunsten A18,
                <br /> and unknown access points
                <br /> Artist: Yun Choi @ycuhnoi <br />
                Associate curator: Miji Lee @miji.e
                <br /> & Anonymous participants: Gim Ikhyun @kimkhimgim , 김감孫하惠 @qoreanqurl
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProgramBanner;
