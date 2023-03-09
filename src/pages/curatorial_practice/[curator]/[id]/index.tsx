import React, { useEffect } from 'react';
import { css, keyframes } from '@emotion/react';
import theme from '../../../../styles/theme';
import Image from 'next/image';
import { useRouter } from 'next/router';

/* comps */
import { PageLayout, ArtistBanner, Note } from '../../../../../components';

/* states */
import { useRecoilValue, useRecoilState } from 'recoil';
import { headerState, headerColorState } from '../../../../../state/index';

/* images */
import SampleImage1 from '/public/images/about_1.png';

/* interface */
import type { IArtistBannerProps, INoteProps } from '../../../../../interfaces/index';

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

const ContentContainer = (headerHeight: number, headerColor: string) => css`
  width: 100%;
  height: auto;

  & > div:first-of-type {
    position: sticky;
    z-index: 1;
    top: ${headerHeight}px;
    background-color: ${headerColor};
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

      & > span {
        b {
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
      img,
      iframe {
        width: 100%;
        padding-bottom: 16px;
      }

      div {
        padding: 60% 0 0 0;
        position: relative;
      }
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
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

        b {
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

const NoteContainer = css`
  width: 100%;
  border-top: 4px dashed #000;
  height: auto;
  display: flex;
  padding-top: 16px;
  padding-bottom: 16px;

  b {
    font-style: italic;
  }

  & > div:first-of-type {
    width: calc((100% / 12) * 4 - 20px);
    font-family: ${theme.fontFamily.serif}, serif;
    font-size: ${theme.fontSize.bodySerif};
    line-height: ${theme.lineHeight.bodySerif};
    letter-spacing: ${theme.letterSpacing.serif};
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

      & > span:first-of-type {
        width: 20px;
        text-align: left;
        display: inline-block;
      }

      & > span:last-of-type {
        display: inline-block;
        width: calc(100% - 20px);
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

const BioContainer = css`
  width: 100%;
  border-top: 4px dashed #000;
  height: auto;
  display: flex;
  padding-top: 16px;
  padding-bottom: 16px;

  & > div:first-of-type {
    width: calc((100% / 12) * 4);
    font-family: ${theme.fontFamily.serif}, serif;
    font-size: ${theme.fontSize.bodySerif};
    line-height: ${theme.lineHeight.bodySerif};
    letter-spacing: ${theme.letterSpacing.serif};
  }

  & > div:last-of-type {
    display: flex;
    flex-direction: column;
    width: calc(((100% / 12) * 8));
    font-family: ${theme.fontFamily.sans}, sans-serif;
    font-size: ${theme.fontSize.smallBodySans};
    line-height: ${theme.lineHeight.smallBodySans};
    letter-spacing: ${theme.letterSpacing.sans};

    & > div {
      & > span:first-of-type {
        width: 20px;
        text-align: left;
        display: inline-block;
      }

      & > span:last-of-type {
        display: inline-block;
        width: calc(100% - 20px);
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

type TArtistBannerSampleData = IArtistBannerProps[];
type TNoteBannerSampleData = INoteProps[];

const ArtistBannerData: TArtistBannerSampleData = [
  {
    name: 'Alaa Abu Asad',
    pathname: 'alaa_abu_asad',
    isCurator: false,
    colorCode: '#E6FFC5',
  },
  {
    name: 'Mooni Perry',
    pathname: 'mooni_perry',
    isCurator: false,
    colorCode: '#EAE8FF',
  },
  {
    name: 'Chulayarnnon Siriphol',
    pathname: 'chulayarnnon_siriphol',
    isCurator: false,
    colorCode: '#FFE8FF',
  },
  {
    name: 'TJ Shin',
    pathname: 'tj_shin',
    isCurator: false,
    colorCode: '#D2FFFF',
  },
  {
    name: 'Hwang Miyojo',
    pathname: 'hwang_miyojo',
    isCurator: false,
    colorCode: '#FFD2E9',
  },
];

const NoteData: TNoteBannerSampleData = [
  {
    index: 1,
    content:
      'The TV series aired in 1990 recorded the highest ratings ever in Thai broadcasting history.',
  },
  {
    index: 2,
    content: 'Serialized in Sri Siam magazine in 1965, first volume published in 1969.',
  },
  {
    index: 3,
    content: `<span>3</span>
    <span>
      3 films were made into films, among which 2 films of the same name (1935)
      adapted from
      <b>Buttercup Flower and Flower Diary</b> (1939) adapted from Bellflower remains
      as a film due to efforts such as the discovery of NFAJ (formerly NFC).{' '}
      <b>Buttercup Flower</b>
      depicts the homosexual relationship of girls, and was screened at the 18th Tokyo
      International Lesbian & Gay Film Festival immediately after the discovery and
      restoration of NFC.
      <a
        href="https://rainbowreeltokyo.com/2009/program/pre/01_fukujyusou.html"
        target="_blank"
      >
        https://rainbowreeltokyo.com/2009/program/pre/01_fukujyusou.html
      </a>
    </span>`,
  },
];

const id = (): JSX.Element => {
  const headerHeight = useRecoilValue(headerState);
  const [headerColor, setHeaderColor] = useRecoilState(headerColorState);
  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    setHeaderColor('#D2FFFF');
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
          <div css={ContentContainer(headerHeight, headerColor)}>
            <div>
              <div>
                <h3>
                  <div css={Marquee}>
                    <div
                      css={css`
                        animation: ${MarqueeAnimation} 100s linear infinite;
                      `}
                    >
                      {id}
                    </div>
                  </div>
                </h3>
              </div>
              <div>
                <h3>
                  <div css={Marquee}>
                    <div
                      css={css`
                        animation: ${MarqueeAnimation} 100s linear infinite;
                      `}
                    >
                      Being Radical, or Its Perplexity: Asian Postcoloniality and Gender Politics in
                      Division and Connection of Popular Culture
                    </div>
                  </div>
                </h3>
              </div>
            </div>
            <div css={ContentWrapper}>
              <div>
                <div>
                  <Image src={SampleImage1} alt="sample_image" layout="intrinsic" />
                  <span>
                    Chulayarnnon Siriphol, <b>ANG48</b> (2022), still. Photo by Jutarat Ninnaihin.
                    Photo Courtesy of the artist and Bangkok CityCity Gallery.
                  </span>
                </div>
                <div>
                  <p>
                    <span>
                      <b>ANG48</b>- Why Is Decolonization and Internationalism So Challenging and
                      Perlexing?
                    </span>
                    <br />
                    <br />
                    In the villages of northern Thailand, which border Myanmar, huge amounts of
                    Japanese remains are scattered and buried. During World War II, Japanese troops
                    tried to move through the Thai border to invade Burma, which was under British
                    occupation. Soldiers were stationed in northern Thai villages, paving new roads
                    or building bridges for smooth movement, and small northern villages provided
                    goods and services to Japanese soldiers, and the economy was lively. Soon, the
                    Japanese army was defeated, and thousands of Japanese soldiers died during the
                    retreat, destroying even the bridges they had built. The Japanese remains, which
                    began to be excavated in the late 1970s, are traces of this history. After the
                    war, these areas, which were only rural villages in remote areas, became tourist
                    destinations after the memories of the war were discovered, attracting people
                    and revitalizing the local economy. Shrines honoring the souls of the fallen
                    were built, and the war memory became a resource for Thai and Japanese tourists.
                    This ironic memory of war history has also been transformed into a love story
                    between a Japanese soldier and a Thai woman, and has become a folk legend. In
                    Mae Hong Son, a city in northern Thailand, there is a shrine dedicated to a
                    woman who became famous for the mochi rice cake recipe that a Japanese soldier
                    with whom she had a relationship gave her, and her love story.
                    <br />
                    <br />
                    <b>ANG48</b> (2022), a video by Chulayarnnon Siriphol, an artist who has been
                    focusing on political issues and (post-)colonialism in Thailand through moving
                    images and his own body, starts from this perplexing colonial relationship
                    between Thailand and Japan. <b>ANG48</b> is a recombinant and recreated video of
                    his recent video works <b>Golden Snail</b> (2019), <b>Golden Spiral</b> (2018),
                    and <b>The Internationale</b> (2018), which uniquely explores the history of
                    colonialism and neo-colonialism between Japanese imperialism, Thailand and Asia.
                    It explores all over the place with articulation methods, sharp satire and
                    humor. The materials and territories of this exploration are popular cultures
                    mediated by the media. The artist appropriates, articulates, twists, and
                    parodies popular and transnational pop culture such as folk legends, beauty
                    product advertisements disguised as expert opinions, melodrama films, and idol
                    dances.
                    <br />
                    <br />
                    The beginning of the video is a montage of ruins, parks, sculptures, and archive
                    photos, suggesting that these images are traces of war. What follows is a love
                    story between a Japanese soldier and a Thai woman, which forms the axis of the
                    video. The wall of the studio set where a woman is being interviewed becomes a
                    screen and a video directed like a silent movie is shown. The video is regarded
                    as a flashback paired with a voice-over of a woman doing an interview, but as it
                    is presented in the form of a movie through the screen, it also seems to be a
                    representation of the familiar public memory between Thailand and Japan after
                    World War II. This silent film is a flashback of individualized memories and a
                    representation of public memory about colonial relations, intertextually
                    constructing each other's identity and memory between history and individuals.
                  </p>
                </div>
              </div>
            </div>
            <div css={NoteContainer}>
              <div>
                <span>Note</span>
              </div>
              <div>
                {NoteData &&
                  NoteData.map((el, _i) => <Note key={_i} index={el.index} content={el.content} />)}
              </div>
            </div>
            <div css={BioContainer}>
              <div>
                <span>Bio</span>
              </div>
              <div>
                <p>
                  Hwang Miyojo is a feminist film researcher who has studied film theory, cultural
                  studies, East Asian studies, and comparative literature. She teaches feminist film
                  criticism and East Asian film studies at Korea National University of Arts and
                  works as a programmer for the Seoul International Women's Film Festival and the
                  Seoul Animal Film Festival.
                </p>
              </div>
            </div>
            {ArtistBannerData &&
              ArtistBannerData.map((el, _i) => (
                <ArtistBanner
                  key={_i}
                  name={el.name}
                  pathname={el.pathname}
                  isCurator={el.isCurator}
                  colorCode={el.colorCode}
                />
              ))}
            <ArtistBanner
              name={'CHANG Eunha'}
              pathname={'chang_eunha'}
              isCurator={true}
              colorCode={'#fff'}
            />
          </div>
        </div>
      </PageLayout>
    </React.Fragment>
  );
};

export default id;
