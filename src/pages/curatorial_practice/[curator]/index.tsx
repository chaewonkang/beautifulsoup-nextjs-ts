import React from 'react';
import { css, keyframes } from '@emotion/react';
import theme from '../../../styles/theme';
import Image from 'next/image';

import { useRouter } from 'next/router';

/* comps */
import { PageLayout, ArtistBanner, Note } from '../../../../components';

/* states */
import { useRecoilValue, useRecoilState } from 'recoil';
import { headerState, headerColorState } from '../../../../state/index';

/* images */
import SampleImage1 from '/public/images/about_1.png';

/* interfaces */
import type { IArtistBannerProps, INoteProps } from '../../../../interfaces/index';

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

const TitleHeader = css`
  width: 100%;
  height: 100px;
  display: flex;
  border-bottom: 4px solid #000;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-family: ${theme.fontFamily.sans}, sans-serif;
    font-size: ${theme.fontSize.category};
    line-height: ${theme.lineHeight.category};
    letter-spacing: ${theme.letterSpacing.sans};
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    height: auto;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 2.5px solid #000;
    h2 {
      font-size: ${theme.fontSize.m_titleSans};
      line-height: ${theme.lineHeight.m_titleSans};
    }
  }
`;

const ContentContainer = (headerHeight: number) => css`
  width: 100%;
  height: auto;

  & > div:first-of-type {
    position: sticky;
    z-index: 1;
    top: ${headerHeight}px;
    background-color: #fff;
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
        line-height: ${theme.lineHeight.titleSans};
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
];

const id = (): JSX.Element => {
  const headerHeight = useRecoilValue(headerState);
  const [headerColor, setHeaderColor] = useRecoilState(headerColorState);
  const router = useRouter();
  const id = router.query.curator as string;

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
            <h2>curatorial practice</h2>
          </div>
          <div css={ContentContainer(headerHeight)}>
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
                      <span>empowering</span>
                      _autophagy:_eating_in_its_destructive_and_creative_nature
                    </div>
                  </div>
                </h3>
              </div>
            </div>
            <div css={ContentWrapper}>
              <div>
                <div></div>
                <div>
                  <p>
                    <br />
                    <br />
                  </p>
                </div>
              </div>
              <div>
                <div></div>
                <div>
                  <p>
                    <b>
                      How can love of life coexist with love of violence?
                      <br /> How was this strange link between care and conquest forged?
                      <br /> - Jane Bennett, <br />
                      Vibrant Matter: A Political Ecology of Things
                    </b>
                  </p>
                </div>
              </div>
              <div>
                <div></div>
                <div>
                  <p></p>
                </div>
              </div>

              <div>
                <div></div>
                <div>
                  <p>
                    The curatorial project,{' '}
                    <b>Autophagy: Eating in Its Destructive and Creative Nature</b>, is an
                    experiment that takes the concept of 'autophagy'— a biological mechanism within
                    the body—as a theoretical hypothesis as part of the larger curatorial project{' '}
                    <b>
                      Inclusion and Innovation as Curatorial Practice: The 5 Inclusion Tactics for 7
                      Curators.
                    </b>{' '}
                    Out of five given keywords: Cooperative, Empowering, Fair, Open, and Supportive,
                    I selected 'empowering' to delve into. By combining this selected keyword with
                    the concept of ‘autophagy’, the project explores the true nature of empowerment
                    and what it means to truly empower someone or even the self.
                  </p>
                </div>
              </div>

              <div>
                <div>
                  <Image src={SampleImage1} alt="sample_image" layout="intrinsic" />
                  <span>
                    Mooni Perry, <b>Binlang Xishi: chapter 2</b>, 2021-2022, single-channel video,
                    16min 22sec (still).
                  </span>
                </div>
                <div>
                  <p>
                    <span>
                      The Dynamics between the One Who Empowers and the One Who Is Empowered
                    </span>
                    <br />
                    The definition of ‘empower’ in the Oxford Dictionary states the following: it
                    describes the verb as "be empowered (to do something)" or “empower somebody (to
                    do something) to give somebody more control over their own life or the situation
                    they are in”, while the Merriam Webster's Dictionary defines the verb to empower
                    "to authorise or delegate or give legal power to someone." This term is often
                    used to motivate employees and increase their drive to work, as it is believed
                    that employees who feel empowered are more productive and achieve better
                    results. In this context, empowerment in terms of corporations, it is understood
                    that empowering is a part of the corporate strategy to control and authorise
                    power. It is also interpreted as 'the possession of formal authority or control
                    over organisational resources.'
                    <span>&sup1;</span> It seems to focus ‘mainly on the concept of sharing
                    authority'.<span>&sup2;</span> As companies adopt the concept of empowerment as
                    a way to motivate workers' energy levels and morale to contribute to the
                    company, the fundamental question arises "Does sharing authority and resources
                    with subordinates automatically empower them?".
                    <span>&sup3;</span>
                    <br />
                    <br />
                    The notion of sharing power, authority, and resources within the existing system
                    is a grandiose and utopian idea. This is because the definition and use of
                    empowerment are based on the following precondition: the person empowering
                    (empowering person), the person being empowered (empowered person) and a
                    dichotomous hierarchical order. In addition, being able to grant authority also
                    means that the authority of others can be deprived. In other words, the
                    challenge with the concept of empowerment lies in its inherent assumption of a
                    dichotomous hierarchical order.
                    <br />
                    <br />
                    This has been a topic of my examination in my master's thesis on Invasive
                    Species and Sovereignty. I have been consistently questioning similar underlying
                    issues related to empowerment. Specifically, I have been questioning ‘the
                    dichotomy of the giver and the recipient of authority, the further deprivation
                    of the authority of others, and the death of others ─ whether it is actively
                    taking the life of another being, legal death, refusal to grant membership as a
                    citizen, or latent death in political danger of facing death even if it is not
                    an actively killed case ─, who has the authority to act?’ The main question is
                    who has the authority to act and why should someone be killed? This question was
                    initially posed by Ayesha Hameed, one of the juries of my dissertation, “Why
                    should nation-states affirm their sovereignty at the biological level?” It has
                    been developed and partially resolved in the paper.
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <Image src={SampleImage1} alt="sample_image" layout="intrinsic" />
                  <span>
                    Alaa Abu Asad, <b>Japanese knotweed in blossom</b>
                    (right), 2022, Ghent.
                  </span>
                </div>
                <div>
                  <p>
                    Leaving aside some of the answers to the question of "why should nation-states
                    assert their sovereignty at the biological level?" that can be inferred from the
                    paper,
                    <span>&#8308;</span> I return to the following question: If the sovereignty of a
                    nation-state is based on the geographical boundaries of its territories, it
                    creates a clear definition of a "homeland" for certain species such as migratory
                    birds, fish, and seeds that follow the seasons, currents, or flow of water or
                    wind. However, what about species that are not connected to such physical
                    matters? How do we define the home of beings that do not have a traditional
                    "hometown" or "place"? And what about those who migrate for political and
                    economic reasons, regardless of their will, to a "place" referred to as "their
                    place"?
                    <br />
                    <br />I have been weaving or unravelling the multiple histories and surroundings
                    of these beings through mediators (species) called ‘invasive species' in order
                    to answer the questions previously mentioned. I have taken a metaphorical
                    approach to scrutinise these species, often alleged as dirty, "out of their
                    place" and undesirable, or often attempted to be effaced. In this exhibition,
                    this theme is manifested in works such as Mooni Perry's Binlang Xishi: chapter 2
                    (2021-2022) which features the symbol 'Binlang', Chulayarnnon Siriphol's{' '}
                    <b>ANG48</b> (2022), which appears the half-human, half-snail 'Angsumalin', and
                    Alaa Abu Asad's essay, <b>The dog chased its tail to bite it off</b> (2022) that
                    explores the invasive plant species 'Japanese Knotweed'. TJ Shin's 'Minjung'
                    from <b>Mugwort Along the Serpent’s Path</b> (2023) is experimented on in this
                    context. It is an experiment on geographical movement, those who are positioned
                    within the hierarchy that is inevitably premised to be empowered by someone, and
                    at the same time, it is proposed as an actor who escapes, liberates, and seeks
                    an exit from the hierarchy and of another deployment assemblage.
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <Image src={SampleImage1} alt="sample_image" layout="intrinsic" />
                  <span>
                    Chulayarnnon Siriphol, <b>ANG48</b>, 2022, single-channel HD video, 25 min.
                    (still) Collection of the Artist and Bangkok CityCity Gallery, commissioned by
                    The Jim Thompson Art Center, Thailand and Hong Gah Museum, Taiwan and Bangkok
                    CityCity Gallery, Thailand. Photo by Jutarat Ninnaihin. Photo Courtesy of the
                    artist and Bangkok CityCity Gallery.
                  </span>
                </div>
                <div>
                  <p>
                    <span>Autophagy, Autopoiesis and Eating</span>
                    <br />
                    Now, returning to the fundamental purpose of empowerment, rather than focusing
                    on the inherent problems of empowerment. That is to say, the discussion shifts
                    to the issue of individual autonomy and independence, which is the goal to be
                    reached through the concept of empowerment. How can we foster the sovereignty
                    and autonomy of each individual in a different way than the binary hierarchy of
                    empowerment that we have tentatively considered? To answer this question, I
                    would like to try to avoid the optimistic approach of empowering individuals
                    with autonomy and cultivating a sense of ownership by others as described in the
                    organisational management theory described above. Rather, I would like to
                    explain 'autophagy' as a method or strategy to reach the goal that ‘empowering’
                    aims to reach by jumping over or traversing the general method of empowerment.
                    <br />
                    <br />
                    Autophagy comes from the Greek word <b>auto-</b>, "self", <b>phagein</b>, "to
                    eat". Autophagy, called 'self-digestion', is a destruction mechanism that
                    naturally decomposes unnecessary or nonfunctional cell components in the
                    regulatory process.
                    <span>&#8309;</span> To provide more explicit details, I would like to introduce
                    the concept of 'autopoiesis,' which was coined by Chilean biologists and
                    philosophers Humberto Maturana and Francisco Javier Varela García. The
                    definition of their autopoiesis organisation can be the basis for the conceptual
                    approach of 'autophagy'. This term was created to reflect the idea that living
                    beings have the power to sustain and regulate themselves. The theories of
                    Umberto Maturana and Francisco Varella start from the search for the questions,
                    ‘What is a living thing?’ and ‘Which one is alive?’ According to them, living
                    things can be defined as a characteristic of continuously generating themselves,
                    and organisms.
                    <span>&#8310;</span> If we look at organisms based on the concept, they are
                    characterised by maintaining tissue structure through self-creation within the
                    biological system. Also, production of their own components is used for
                    self-maintenance. In other words, living things, one alive, can be said to be
                    spontaneous and self-creative. These characteristics are attributes that we can
                    associate with the process of autophagy. This is because autophagy is a
                    mechanism that creates recycling of cellular components by eating unnecessary or
                    dysfunctional components.
                    <br />
                    <br />
                    Then, how can organisms be sustained exactly? As touched upon earlier, it is
                    accompanied by the act of ‘eating.’ Eating refers to the act of eating food and
                    receiving nutrition. It is a fundamental aspect of human biology and is
                    necessary for survival. Humans, like all animals, or even any other living
                    creatures, need food as a source of energy and nutrients, and eating is an
                    essential part of our daily lives. Furthermore, eating is not just interpreted
                    as a biological need, but also a social and cultural activity, and how people
                    eat can vary greatly depending on their cultural background, beliefs, and
                    practices. In essence, eating is deeply tied to social and cultural norms and
                    practices as a way for individuals and groups to assert their identities and
                    relationships, and to negotiate and mediate their position in the world. Thus,
                    eating is also a way for individuals and groups to exercise their own identity
                    and control their own lives.
                    <br />
                    <br />
                    British anthropologist Mary Douglas argued that food taboos are often used in
                    certain cultures to define what is considered "clean" and "pure" and what is
                    considered "dirty" and "unclean."<span>&#8311;</span> This concept posits that
                    food taboos and other forms of food regulation affect women and reinforce gender
                    inequality, and provide insight into the ways in which these practices are used
                    to control and enslave women. In this same vein, some feminists have argued that
                    food taboos and other forms of food regulation are often used to control women's
                    bodies and behaviours while also reinforcing traditional gender roles and power
                    dynamics. For example, in some cultures, women may be expected to follow
                    stricter food taboos and dietary restrictions than men and may be punished or
                    stigmatised if they break these rules. In other words, the act of eating can be
                    understood not only as a way for individuals to explore and respond to their
                    environment directly, but also it can be seen as a way for individuals to
                    explore and examine their position socially, politically or hierarchically.
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <Image src={SampleImage1} alt="sample_image" layout="intrinsic" />
                  <span>
                    TJ Shin, <b>Series from Untitled (Self-Portrait)</b>, 2021, digital print from
                    microscope scans.
                  </span>
                </div>
                <div>
                  <p>
                    <span>Beyond Binary Hierarchies: Autophagy as a Strategy for Empowerment</span>
                    <br />
                    So how exactly can the concepts of 'autophagy' and 'eating' be elaborated within
                    the framework of 'empowering'? As outlined before, the word autophagy comes from
                    the Greek words <b>auto-</b>, meaning 'self' and <b>phagein</b>, meaning 'to
                    eat'. Thus, autophagy means "eating oneself" and is also called self-digestion.
                    It is a natural and regulated mechanism of cells to remove unnecessary or
                    nonfunctional components. Apart from its many functions, autophagy plays an
                    important role in cellular homeostasis by removing larger protein complexes and
                    worn organs. As discussed earlier, the act of eating is a powerful tool that
                    individuals and groups can use to exercise their own identity and control their
                    lives. In a similar way, the process of autophagy can be seen as a way for the
                    body to exercise its own identity and control its own life. The concept of
                    autophagy, that is, the process by which a cell "eats" or decomposes its own
                    cellular components, can be drawn as an extension of the concept of "eating" in
                    two aspects.
                    <br />
                    <br />
                    Autophagy, the process of self-digestion, can be understood as a strategy for
                    promoting individual autonomy and independence. At the cellular level, autophagy
                    allows cells to degrade and recycle their own components, thereby exerting
                    control over their own lives and asserting their own identity within the larger
                    organism. This process can be seen as a form of self-determination, as cells
                    actively shape their own internal structure in order to support growth and
                    development. Michel Foucault says in <b>Techniques de soi,</b> “Self is a
                    reflexive pronoun, and it has two meanings. <b>Auto</b> means "the same," but it
                    also conveys the notion of identity. The latter meaning shifts the question from
                    "What is this self?" to "What is the plateau on which I shall find my
                    identity?””
                    <span>&#8312;</span> In this context, autophagy can be understood as a method
                    and a foundation for finding my identity through self-determination. In other
                    words, autophagy is a way of "eating" their own internal structure in order to
                    recycle and reuse materials such as cells, which can be seen as a form of
                    self-capacity and self-determination. . Autophagy, in turn, is a way of "eating"
                    their own internal structure in order to recycle and reuse materials such as
                    cells, which can be seen as a form of self-capacity and self-determination.
                    <br />
                    <br />
                    In addition to exercising autonomy, autophagy can also be seen as a way in which
                    cells challenge and subvert existing power structures and social norms within an
                    organism. For example, the process of autophagy allows cells to break down and
                    recycle old or damaged components and create new, healthy components. In this
                    way, the process of autophagy allows cells to challenge and subvert existing
                    power structures and social norms within an organism that dictate what is
                    considered "good" or "bad" and "valuable" or "unworthy". The process of
                    autophagy can be related to the concept of 'eating' as a way for cells to
                    exercise their identity and control their lives and how cells challenge and
                    subvert existing power structures and social norms within an organism. By
                    engaging in the process of autophagy, cells can support their own growth and
                    development, plus they can create new possibilities and alternatives for
                    building themselves and larger organisms, organisations, and worlds.
                  </p>
                </div>
              </div>
              <div>
                <div></div>
                <div>
                  <p>
                    <br />
                    <br />
                    As we have explored the link between autophagy and empowerment, we have come to
                    understand that just like how autophagy allows cells to eat, destroy, recycle
                    and create using unnecessary or dysfunctional components, it is important for us
                    to embrace and transform our own wounds, conflicts, and discordances. Even if
                    our own wounds, conflicts, and discordances are considered of little value, it
                    can have an impact through a process of ‘autophagy’. To conclude, rather than
                    solely focusing on the binary hierarchy of empowerment, ‘autophagy’ enables us
                    to pay attention to the subtleties, diversity and wonders of life that surround
                    us, and truly understand and appreciate the beauty and complexity of the world
                    we inhabit. The presented artworks by four artists ─ Alaa Abu Asad, Mooni Perry,
                    TJ Shin and Chulayarnnon Siriphol serve as a means of escaping the constraints
                    of societal hierarchies and the deployment of new perspectives and
                    understanding, highlighting the journey towards true empowerment. They also may
                    be the embodiment of a guiding light, illuminating the path towards a deeper
                    understanding of not only empowerment but also the world while reflecting back
                    to us the inner workings of our souls.
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
                  Eunha CHANG (b. 1990, South Korea) is a curator and researcher based in Seoul,
                  working between contemporary art theory and ecology. She has recently graduated
                  with distinction from an MA in Contemporary Art Theory at Goldsmiths, University
                  of London. She has worked as a director, curator, programme coordinator in various
                  projects across Europe and Asia. She curated two curatorial projects: Invasive
                  Species Behind the Notoriety: Multi-directional Narratives for Abundant Futures
                  (Gwangju, 2021); Portals, Teleportation (Seoul and Istanbul, 2021). She is working
                  as a coordinator for Scoring the Words (2022) in the Exhibition Division at Seoul
                  Museum of Art, and assisting in their International Exchange Team. She has over 4
                  years international art and professional experience across a range of
                  world-renowned art institutions including Istanbul Biennial, National Museum of
                  Modern and Contemporary Art, Korea and Gwangju Design Biennale. Chang served as a
                  curatorial assistant for the Asia Project, contributing to Looking for Another
                  Family (2020), Catastrophe and Recovery (2021), and Nam June Paik Archive (working
                  title) at the National Museum of Modern and Contemporary Art. She completed an
                  internship in The Seventh Continent (2019) at the Istanbul Biennial fully funded
                  by the Ministry of Culture, Sports and Tourism of the Republic of Korea.
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
          </div>
        </div>
      </PageLayout>
    </React.Fragment>
  );
};

export default id;
