import React from 'react';
import { css, keyframes } from '@emotion/react';
import theme from '../src/styles/theme';

import { useRouter } from 'next/router';

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

const MainBanner = () => {
  const router = useRouter();
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
              <span>curators</span>
              _The_5_Inclusion_Tactics_For_Curators_“empowering,_supportive,_open,
              _fair,_cooperative"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>curators</span>
              _The_5_Inclusion_Tactics_For_Curators_“empowering,_supportive,_open,
              _fair,_cooperative"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </h2>
      </div>
      <div>
        <div
          css={BannerModuleContainer}
          onClick={() =>
            router.push({
              pathname: '/curatorial_practice/ong_jo_lene',
            })
          }
        >
          <div>
            <img src="../static/images/curators/jolene.jpg" />
          </div>
          <div css={BannerModuleTextBox}>
            <div>
              <span>ONG JO-Lene</span>
            </div>
            <div>
              <p>
                Yun Choi, Finn Maätita & Jerrold Saija, Jesse Chun, Sung Hwan Kim, Liz Ferrer and
                Bow Ty Venture Capital, Okui Lala & Nasrikah, & PERTIMIG, Nina Djekić, Isola Tong
              </p>
            </div>
            <div>
              <p>
                Slippery Tongues Sliding Horizons
                <br />
                Composed in the key of ‘open’—one of the five keywords in Five Inclusion Tactics for
                Seven Curators: empowering, supportive, cooperative, open, fair—Slippery Tongues
                Sliding Horizons speaks with experiences of navigating multiple languages and
                existing between fixed...
              </p>
            </div>
          </div>
        </div>
        <div
          css={BannerModuleContainer}
          onClick={() =>
            router.push({
              pathname: '/curatorial_practice/sofia_duorron',
            })
          }
        >
          <div>
            <img src="../static/images/curators/sofia.jpg" />
          </div>
          <div css={BannerModuleTextBox}>
            <div>
              <span>Sofía Dourron</span>
            </div>
            <div>
              <p>Sofía Durrieu, Chaveli Sifre, Choi Yun, Ana María Gómez López, Landa Hernández</p>
            </div>
            <div>
              <p>
                Seen but unnoticed. Bodily infrastructure at work
                <br />
                In the introduction to Extrastatecraft. The Power of Infrastructure Space Keller
                Easterling makes it very clear: infrastructure is not and never has been just the
                buildings, highways, transport systems, communications networks, electric grids and
                pipelines that allow our bodies to move, interact and generally function within the
                confines of finite spaces.
              </p>
            </div>
          </div>
        </div>
        <div
          css={BannerModuleContainer}
          onClick={() =>
            router.push({
              pathname: '/curatorial_practice/yun_minhwa',
            })
          }
        >
          <div>
            <img src="../static/images/curators/yunminhwa.png" />
          </div>
          <div css={BannerModuleTextBox}>
            <div>
              <span>YUN Minhhwa</span>
            </div>
            <div>
              <p>Hyejin Jo, Insook Bae, Mirim Chu, Minhwa Yun</p>
            </div>
            <div>
              <p>
                Clever Hans Effect
                <br />
                Clever Hans Effect is a psychological term derived from the name of a horse, Hans,
                who was rumored to be able to read numbers and calculate. When people gave an
                arithmetic quiz, Hans answered by striking his hoof on the floor, and was almost
                always right. Hans became so popular that researchers eventually visited to see if
                Hans really understood numbers and arithmetic.
              </p>
            </div>
          </div>
        </div>{' '}
        <div
          css={BannerModuleContainer}
          onClick={() =>
            router.push({
              pathname: '/curatorial_practice/jeanette_bisschops',
            })
          }
        >
          <div>
            <img src="../static/images/curators/bisschops.jpeg" />
          </div>
          <div css={BannerModuleTextBox}>
            <div>
              <span>Jeanette Bisschops</span>
            </div>
            <div>
              <p>
                Simnikiwe Buhlungu, Alvin Tran, Kang Seung Lee, Goeun Bae, Ibanjiha, Eunsong Kim,
                Yeong Ran Kim, Alvin Tran
              </p>
            </div>
            <div>
              <p>
                We Cry Poetry
                <br />
                Growing up, I was a child constantly engrossed in stories. Growing up quite insular
                and not allowed to watch much tv, I would get new stacks of books at the local
                library almost every weekend. But while I had a passion for words and the worlds
                they create, it was hard for me to access more peculiar, playful and poetic works.
                Raised in a household and a society that idolizes rationality, poetry felt both
                frivolous and terrifyingly open-ended.
              </p>
            </div>
          </div>
        </div>
        <div
          css={BannerModuleContainer}
          onClick={() =>
            router.push({
              pathname: '/curatorial_practice/honggyun_mok',
            })
          }
        >
          <div>
            <img src="../static/images/curators/mok.jpeg" />
          </div>
          <div css={BannerModuleTextBox}>
            <div>
              <span>MOK Honggyun</span>
            </div>
            <div>
              <p>
                Seungjoon Choi, Werker Collective, Lee Wonho, Ha Saet-byul, Kim Haemin, Gabriela
                Golder, Nam Woong, Francis Annagu
              </p>
            </div>
            <div>
              <p>
                On Fair: Remnants, From the Five
                <br />
                The first man who, having enclosed a piece of ground, bethought himself of saying
                this is mine and found people simple enough to believe him, was the real founder of
                civil society…Beware of listening to this impostor; you are undone if you once
                forget that the fruits of the earth belong to us all, and the earth itself to
                nobody.
              </p>
            </div>
          </div>
        </div>
        <div
          css={BannerModuleContainer}
          onClick={() =>
            router.push({
              pathname: '/curatorial_practice/chang_eunha',
            })
          }
        >
          <div>
            <img src="../static/images/curators/chang.png" />
          </div>
          <div css={BannerModuleTextBox}>
            <div>
              <span>CHANG Eunha</span>
            </div>
            <div>
              <p>Alaa Abu Asad, Mooni Perry, TJ Shin, Chulayarnnon Siriphol, Hwang Miyojo</p>
            </div>
            <div>
              <p>
                Autophagy: Eating in Its Destructive and Creative Nature
                <br />
                How can love of life coexist with love of violence?
                <br /> How was this strange link between care and conquest forged?
                <br /> - Jane Bennett, Vibrant Matter: A Political Ecology of Things
              </p>
            </div>
          </div>
        </div>
        <div
          css={BannerModuleContainer}
          onClick={() =>
            router.push({
              pathname: '/curatorial_practice/manique_hendricks',
            })
          }
        >
          <div>
            <img src="../static/images/curators/hendricks.jpeg" />
          </div>
          <div css={BannerModuleTextBox}>
            <div>
              <span>Manique Hendricks</span>
            </div>
            <div>
              <p>
                Bin Koh, Emirhakin, Young Joon Kwak, Philth Haus, Art.Goss, Charlotte Rhode, Haitian
                Ma, Zippora Elders, Ka-Tjun Hau
              </p>
            </div>
            <div>
              <p>
                For Our Common Emotional Goals
                <br />
                The three cups tarot card is often an image of three women dancing and raising their
                cups for a toast. It represents the celebration of friendship, sisterhood,
                connection, abundance, cooperation and creative collaborations.
              </p>
            </div>
          </div>
        </div>
        <div css={BannerModuleContainer}>
          <div></div>
          <div css={BannerModuleTextBox}>
            <div>
              <span></span>
            </div>
            <div>
              <p></p>
            </div>
            <div>
              <p>
                <span></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
