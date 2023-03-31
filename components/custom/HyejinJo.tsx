import React from 'react';
import { css } from '@emotion/react';

import theme from '../../src/styles/theme';

const SlideShow = css`
  height: 100%;
  margin: auto;
  overflow: hidden;
  position: relative !important;
  padding: 0 !important;
  top: 0 !important;
  cursur: pointer;

  :hover {
    & > div:first-of-type {
      display: flex;
    }
  }
`;

const ArrowBox = css`
  display: flex;
  width: 100%;
  height: auto;
  padding: 0 !important;
  align-items: center;
  justify-content: space-between;
  position: absolute !important;
  z-index: 2;
  top: 50%;

  & > div:first-of-type {
    padding-left: 20px;
  }

  & > div:last-of-type {
    padding-right: 20px;
  }

  & > div {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 35px;
      height: 35px;
      object-fit: contain;
      cursor: pointer;
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    & > div:first-of-type {
      padding-left: 10px;
    }

    & > div:last-of-type {
      padding-right: 10px;
    }

    top: calc(50% - 10px);
    & > div {
      img {
        width: 30px !important;
        padding-bottom: 0px !important;
      }
    }
  }
`;

const Slider = css`
  width: 100%;
  height: 100%;
  padding: 0 !important;
  white-space: nowrap;
  transition: ease 1000ms;
  height: 100%;
  max-height: 100%;
`;

const Slide = css`
  display: inline-block;
  object-fit: contain;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: scroll;
  margin: 0;
  padding: 0 !important;

  & > div {
    width: 50%;
    height: 100%;
    display: inline-block;
    overflow-y: scroll;
    word-break: break-all;
    white-space: normal;

    p {
      width: 100%;
      max-width: 100%;
      word-break: break-all;
      white-space: normal;
      font-style: italic;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  & > div:first-of-type {
    img {
      object-position: right;
    }
  }

  & > div:last-of-type {
    img {
      object-position: left;
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
  }
`;

const NoteContainer = css`
  width: 100%;
  border-top: 4px dashed #000;
  height: auto;
  display: flex;
  padding-top: 16px;
  padding-bottom: 16px;

  & > div:first-of-type {
    width: calc((100% / 12) * 4 - 20px);

    span {
      font-family: ${theme.fontFamily.serif}, serif !important;
      font-size: ${theme.fontSize.bodySerif} !important;
      line-height: ${theme.lineHeight.bodySerif} !important;
      letter-spacing: ${theme.letterSpacing.serif} !important;
    }
  }

  & > div:last-of-type {
    display: flex;
    flex-direction: column;
    width: calc(((100% / 12) * 8) + 20px);
    font-family: ${theme.fontFamily.sans}, sans-serif;
    font-size: ${theme.fontSize.smallBodySans};
    line-height: ${theme.lineHeight.smallBodySans};
    letter-spacing: ${theme.letterSpacing.sans};

    & > div {
      display: flex;
      padding: 0 !important;

      & > span:first-of-type {
        width: 20px;
        text-align: left;
        display: inline-block;
      }

      & > span:last-of-type {
        display: inline-block;
        width: calc(100% - 20px);

        b {
          font-style: italic;
        }

        img {
          margin-top: 8px;
          margin-bottom: 8px;
        }
      }
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    flex-direction: column;

    & > div:first-of-type {
      width: 100%;
      margin-bottom: 16px;
      font-size: ${theme.fontSize.m_bodySerif};
      line-height: ${theme.lineHeight.m_bodySerif};
    }

    & > div:last-of-type {
      width: 100%;
      font-size: ${theme.fontSize.m_captionSans};
      line-height: ${theme.lineHeight.m_captionSans};
    }
  }
`;

const AttachmentContainer = css`
  width: 100%;
  border-top: 4px dashed #000;
  height: auto;
  display: flex;
  padding-top: 16px;
  padding-bottom: 16px;

  & > div:first-of-type {
    width: calc((100% / 12) * 4);
    span {
      font-family: ${theme.fontFamily.serif}, serif !important;
      font-size: ${theme.fontSize.bodySerif} !important;
      line-height: ${theme.lineHeight.bodySerif} !important;
      letter-spacing: ${theme.letterSpacing.serif} !important;
    }
  }

  & > div:last-of-type {
    display: flex;
    align-items: center;
    width: calc((100% / 12) * 8);
    font-family: ${theme.fontFamily.sans}, sans-serif;
    font-size: ${theme.fontSize.smallBodySans};
    line-height: ${theme.lineHeight.smallBodySans};
    letter-spacing: ${theme.letterSpacing.sans};
    cursor: pointer;

    :hover {
      opacity: 0.5;
    }

    span {
      width: calc(100% - 32px);
      text-decoration: underline;
    }

    img {
      width: 20px !important;
      margin-left: 12px;
      object-fit: contain;
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    flex-direction: column;

    & > div:first-of-type {
      width: 100%;
      margin-bottom: 16px;
      font-size: ${theme.fontSize.m_bodySerif};
      line-height: ${theme.lineHeight.m_bodySerif};
    }

    & > div:last-of-type {
      width: 100%;
      font-size: ${theme.fontSize.m_captionSans};
      line-height: ${theme.lineHeight.m_captionSans};

      span {
        width: calc(100% - 25px);
        text-decoration: underline;
      }

      img {
        width: 15px;
        margin-left: 10px;
        object-fit: contain;
      }
    }
  }
`;

type TSlideArray = {
  left: string;
  right?: string;
};

const manualArray: TSlideArray[] = [
  {
    left: '/images/hyejinJo/manual_0.png',
    right: '/images/hyejinJo/manual_1.png',
  },
  {
    left: '/images/hyejinJo/manual_2.png',
    right: '/images/hyejinJo/manual_3.png',
  },
  {
    left: '/images/hyejinJo/manual_4.png',
    right: '/images/hyejinJo/manual_5.png',
  },
  {
    left: '/images/hyejinJo/manual_6.png',
  },
];

const GerberaArray: TSlideArray[] = [
  {
    left: '/images/hyejinJo/gerbera_1.png',
    right: '/images/hyejinJo/gerbera_2.png',
  },
  {
    left: '/images/hyejinJo/gerbera_3.png',
    right: '/images/hyejinJo/gerbera_4.png',
  },
  {
    left: '/images/hyejinJo/gerbera_5.png',
    right: '/images/hyejinJo/gerbera_6.png',
  },
  {
    left: '/images/hyejinJo/gerbera_7.png',
  },
];

const LilyArray: TSlideArray[] = [
  {
    left: '/images/hyejinJo/lily_1.png',
    right: '/images/hyejinJo/lily_2.png',
  },
  {
    left: '/images/hyejinJo/lily_3.png',
  },
];

const WarneckiiArray: TSlideArray[] = [
  {
    left: '/images/hyejinJo/warneckii_1.png',
    right: '/images/hyejinJo/warneckii_2.png',
  },
  {
    left: '/images/hyejinJo/warneckii_3.png',
  },
];

const HyejinJo = (): JSX.Element => {
  const [manualIndex, setManualIndex] = React.useState<number>(0);
  const [gerberaIndex, setGerberaIndex] = React.useState<number>(0);
  const [lilyIndex, setLilyIndex] = React.useState<number>(0);
  const [warneckiiIndex, setWarneckiiIndex] = React.useState<number>(0);

  return (
    <React.Fragment>
      <div>
        <div></div>
        <div css={SlideShow}>
          <p>Instructions for Gerbera, Lily, and Warneckii</p>
          <div css={ArrowBox}>
            <div
              onClick={() => {
                if (manualIndex < manualArray.length && 0 < manualIndex)
                  setManualIndex(manualIndex - 1);
                else if (manualIndex === 0) setManualIndex(manualArray.length - 1);
                else setManualIndex(0);
              }}
            >
              <img src="/images/arrowLeft.png" alt="왼쪽 화살표" />
            </div>
            <div
              onClick={() => {
                if (manualIndex === manualArray.length) setManualIndex(0);
                else if (manualIndex >= 0 && manualIndex < manualArray.length - 1)
                  setManualIndex(manualIndex + 1);
                else setManualIndex(0);
              }}
            >
              <img src="/images/arrowRight.png" alt="오른쪽 화살표" />
            </div>
          </div>
          <div
            css={Slider}
            style={{
              transform: `translate3d(${-manualIndex * 100}%, 0, 0)`,
            }}
          >
            {manualArray &&
              manualArray.map((el) => {
                return (
                  <div css={Slide} key={el.left + el.right}>
                    <div>
                      <img src={el.left} />
                    </div>
                    <div>{el.right && <img src={el.right} />}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div>
        <div></div>
        <div css={SlideShow}>
          <p>Designs for Making Gerbera</p>
          <div css={ArrowBox}>
            <div
              onClick={() => {
                if (gerberaIndex < GerberaArray.length && 0 < gerberaIndex)
                  setGerberaIndex(gerberaIndex - 1);
                else if (gerberaIndex === 0) setGerberaIndex(GerberaArray.length - 1);
                else setGerberaIndex(0);
              }}
            >
              <img src="/images/arrowLeft.png" alt="왼쪽 화살표" />
            </div>
            <div
              onClick={() => {
                if (gerberaIndex === GerberaArray.length) setGerberaIndex(0);
                else if (gerberaIndex >= 0 && gerberaIndex < GerberaArray.length - 1)
                  setGerberaIndex(gerberaIndex + 1);
                else setGerberaIndex(0);
              }}
            >
              <img src="/images/arrowRight.png" alt="오른쪽 화살표" />
            </div>
          </div>
          <div
            css={Slider}
            style={{
              transform: `translate3d(${-gerberaIndex * 100}%, 0, 0)`,
            }}
          >
            {GerberaArray &&
              GerberaArray.map((el) => {
                return (
                  <div css={Slide} key={el.left + el.right}>
                    <div>
                      <img src={el.left} />
                    </div>
                    <div>{el.right && <img src={el.right} />}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div>
        <div></div>
        <div css={SlideShow}>
          <p>Designs for Making Lily</p>
          <div css={ArrowBox}>
            <div
              onClick={() => {
                if (lilyIndex < LilyArray.length && 0 < lilyIndex) setLilyIndex(lilyIndex - 1);
                else if (lilyIndex === 0) setLilyIndex(LilyArray.length - 1);
                else setLilyIndex(0);
              }}
            >
              <img src="/images/arrowLeft.png" alt="왼쪽 화살표" />
            </div>
            <div
              onClick={() => {
                if (lilyIndex === LilyArray.length) setLilyIndex(0);
                else if (lilyIndex >= 0 && lilyIndex < LilyArray.length - 1)
                  setLilyIndex(lilyIndex + 1);
                else setLilyIndex(0);
              }}
            >
              <img src="/images/arrowRight.png" alt="오른쪽 화살표" />
            </div>
          </div>
          <div
            css={Slider}
            style={{
              transform: `translate3d(${-lilyIndex * 100}%, 0, 0)`,
            }}
          >
            {LilyArray &&
              LilyArray.map((el) => {
                return (
                  <div css={Slide} key={el.left + el.right}>
                    <div>
                      <img src={el.left} />
                    </div>
                    <div>{el.right && <img src={el.right} />}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div>
        <div></div>
        <div css={SlideShow}>
          <p>Designs for Making Warneckii</p>
          <div css={ArrowBox}>
            <div
              onClick={() => {
                if (warneckiiIndex < WarneckiiArray.length && 0 < warneckiiIndex)
                  setWarneckiiIndex(warneckiiIndex - 1);
                else if (warneckiiIndex === 0) setWarneckiiIndex(WarneckiiArray.length - 1);
                else setWarneckiiIndex(0);
              }}
            >
              <img src="/images/arrowLeft.png" alt="왼쪽 화살표" />
            </div>
            <div
              onClick={() => {
                if (warneckiiIndex === WarneckiiArray.length) setWarneckiiIndex(0);
                else if (warneckiiIndex >= 0 && warneckiiIndex < WarneckiiArray.length - 1)
                  setWarneckiiIndex(warneckiiIndex + 1);
                else setWarneckiiIndex(0);
              }}
            >
              <img src="/images/arrowRight.png" alt="오른쪽 화살표" />
            </div>
          </div>
          <div
            css={Slider}
            style={{
              transform: `translate3d(${-warneckiiIndex * 100}%, 0, 0)`,
            }}
          >
            {WarneckiiArray &&
              WarneckiiArray.map((el) => {
                return (
                  <div css={Slide} key={el.left + el.right}>
                    <div>
                      <img src={el.left} />
                    </div>
                    <div>{el.right && <img src={el.right} />}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div>
        <div></div>
        <div>
          <p>File download</p>
          <p>
            <a
              href="https://drive.google.com/drive/folders/11cZLqyC1ZlUX3Pjghi53aQFiEGCV34X3?usp=share_link"
              target="_blank"
              rel="noreferrer"
            >
              click to download Gerbera
            </a>{' '}
            <br />
            <a
              href="https://drive.google.com/drive/folders/1a6CjhvyvM26EXTex4mDtFC7WAhbgMiC2?usp=share_link"
              target="_blank"
              rel="noreferrer"
            >
              click to download Lily
            </a>{' '}
            <br />
            <a
              href="https://drive.google.com/drive/folders/11bunE3ISF-oIbnbAiY9lAg3mLl6aWq9L?usp=share_link"
              target="_blank"
              rel="noreferrer"
            >
              click to download Warneckii
            </a>{' '}
            <br />
          </p>
        </div>
      </div>
      <div css={NoteContainer}>
        <div>
          <span>Note</span>
        </div>
        <div>
          <div>
            <span>1</span>
            <span>
              The types of flowers used in floral wreath for sympathy or celebration in Korea are
              determined by the character of the occasion. White chrysanthemums, yellow lilies, and
              Warneckii are mainly used in funerals. For celebratory events, the materials are
              centered around multi-colored gerberas, red lilies, and Warneckii. This text discusses
              celebration wreaths. (Photo: Flower Mans)
              <br />
              <img src="/images/hyejinJo/image_1.jpg" />
            </span>
          </div>
          <div>
            <span>2</span>
            <span>
              "Enforcement Rules enacted for the Development of Flower Industry and the Promotion of
              Floriculture," The Ministry of Agriculture, Food, and Rural Affairs, August 20, 2020.
            </span>
          </div>
          <div>
            <span>3</span>
            <span>
              Kim Sung-guk, "Fake flowers take up over 80percent… Labeling System for Reuse Wreath
              needs urgent amendment," Nongminsinmun, June 29, 2022.
            </span>
          </div>
          <div>
            <span>4</span>
            <span>
              Six types of involucres of artificial gerbera.
              <br />
              <img src="/images/hyejinJo//image_2.jpg" />
            </span>
          </div>
          <div>
            <span>5</span>
            <span>
              There are currently 111 gerbera varieties and 216 lily varieties protected by
              Intellectual Property Rights in Plant Varieties (Variety Protection Act) in Korea.
              Korea Seed & Variety Service. Accessed July 26, 2022.
              https://www.seed.go.kr/seed/270/subview.do (The search result listed 288 gerbera and
              293 lily varieties; however, I excluded the ones with intellectual property rights
              waived, canceled, withdrawn, nullified, and denied.)
            </span>
          </div>
          <div>
            <span>6</span>
            <span>
              Most of the gerbera varieties currently in commercial cultivation originate from
              <b>Gerbera jamesonii</b>, <b>Gerbera viridifolia</b>, and their cross{' '}
              <b>Gerbera x hybrida</b>. I am discussing hybrids over a particular gerbera species
              because the diverse colors and shapes of gerbera used in wreaths make it hard to
              specify one species. Additionally, I believe the hybrids are inclusive of artificial
              flowers of various combinations since they hold the potential to be developed into new
              crossbreeds.
            </span>
          </div>
        </div>
      </div>
      <div css={AttachmentContainer}>
        <div>
          <span>Attachment</span>
        </div>
        <div>
          <span>
            <a
              href="https://drive.google.com/drive/folders/1yrbLVoAka6rWPdZicVBEi29WtvfDRpoT?usp=share_link"
              target="_blank"
              rel="noreferrer"
            >
              Images and Manual
            </a>
          </span>
          <img src="/images/download.png" alt="download" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default HyejinJo;
