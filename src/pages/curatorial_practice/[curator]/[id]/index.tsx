import React from 'react';
import { css, keyframes } from '@emotion/react';
import theme from '../../../../styles/theme';

import { useRouter } from 'next/router';

/* comps */
import { PageLayout } from '../../../../../components';

/* states */
import { useRecoilValue, useRecoilState } from 'recoil';
import { headerState, headerColorState } from '../../../../../state/index';

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

const ArtistBanner = (colorCode: string) => css`
  height: fit-content;
  top: 276px;
  height: 80px;
  width: 100%;
  border-top: 2.5px solid #000;
  display: flex;
  align-items: center;
  padding-top: 0;
  justify-content: space-between;
  cursor: pointer;

  :hover {
    background-color: ${colorCode};
    cursor: pointer;
  }

  & > div:first-of-type {
    font-family: ${theme.fontFamily.sans}, sans-serif;
    font-size: ${theme.fontSize.titleSans};
    line-height: ${theme.lineHeight.titleSans};
    letter-spacing: ${theme.letterSpacing.sans};
    width: 100%;
    overflow: hidden;
  }

  & > div:last-of-type {
    width: 40px;
    margin-left: 20px;
    height: 100%;
    display: flex;
    align-items: center;

    img {
      width: 100%;
      object-fit: contain;
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    height: auto;
    padding-top: 5px;
    padding-bottom: 5px;
    border-top: 2.5px solid #000;

    & > div:first-of-type {
      font-size: ${theme.fontSize.m_titleSans};
      line-height: ${theme.lineHeight.m_titleSans};
      width: 100%;
    }

    & > div:last-of-type {
      width: 20px;
    }
  }
`;

const id = () => {
  const headerHeight = useRecoilValue(headerState);
  const [headerColor, setHeaderColor] = useRecoilState(headerColorState);
  const router = useRouter();
  const id = router.query.id as string;

  React.useEffect(() => {
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
                  {' '}
                  <img src="../../../static/images/curatorialPractice/chang_eunha/hwang_1.png" />
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

              <div>
                <div>
                  {' '}
                  <img src="../../../static/images/curatorialPractice/chang_eunha/hwang_2.png" />
                  <span>
                    Chulayarnnon Siriphol, <b>ANG48</b>
                    {} (2022), still. Photo by Jutarat Ninnaihin. Photo Courtesy of the artist and
                    Bangkok CityCity Gallery.
                  </span>
                </div>
                <div>
                  <p>
                    A video in which a person who appears to be a doctor explains about exotic
                    edible snails is inserted. It is said that giant snails brought from Africa to
                    be raised for food while Japan built military bases in Southeast Asia reproduced
                    at a frightening rate and spread throughout Southeast Asia. This video, which
                    appears to be plausible information about snails, turns out to be an
                    advertisement for snail essence cosmetics, which soon became a product of the
                    beauty industry. And the woman in the cross-edited silent film gives birth to a
                    giant snail that glows golden while fighting with a Japanese soldier. The giant
                    snail's father, the Japanese soldier, leaves for his home country with the
                    defeat, and the giant snail's mother misses him while making mochi with the
                    recipe he taught. The snail girl born between Japan and Thailand and destined to
                    become a market product is Angsumalin. Angsumalin is also the heroine of the
                    popular novel <b>Khu Kam</b> (Thommayanti, 1969)<span>&sup1;</span>, which is
                    familiar to Thai people enough to have been adapted nine times
                    <span>&sup2;</span>, including movies, TV series, and musicals. Angsumalin is
                    engaged to Banus, an elite Thai man studying abroad in England, but her heart is
                    also shaken by Kobori, a young Japanese naval officer who is devoted and
                    pure-hearted, who actively approaches her. Her father, a right-wing political
                    leader, forced her to marry Kobori, but she couldn't even sort her mind with
                    Banus. The artist synthesizes his own face with Angsumalin faces from films
                    adapted from <b>Khu Kam</b>
                    , which were adopted in the 1970s, 80s, 90s, and 2010s. The audience sees the
                    artist's face attached to Angsumalin's body, which is shaken and torn between
                    Banus and Kobori, Thailand and Japan. Angsumalin shows strong hostility to
                    Kobori when she meets him because he is a foreigner, but their relationship soon
                    turns into a friendly one. Angsumalin cannot decide her own destiny. It only
                    confuses between Banus or father, and Kobori. By cross-editing newsreel and
                    documentary footage documenting the boycott of Japanese goods led by the Thai
                    government in the 1970s, and the reminiscences of her mother, who was unable to
                    make or sell mochi anymore, the author cross-edited post-war right-wing
                    nationalism and imperial Japan's colonialism which highlights the difficulties
                    Angsumalin was facing not being able to do anything between them. This
                    difficulty is repeated in recent Thai films throughout the ages and is also
                    found in Taiwanese films that experienced Japanese colonial history.
                    <br />
                    <br />
                    Confessing the irony of her birth in Japanese, Angsumalin makes copies into
                    dozens of bodies and heads for space. In space, can the ironies and difficulties
                    derived from colonialism and post-war nationalism reduce? Can Angsumalin be
                    completely free between the boundaries of history? Drenched in giant snail
                    juice, Angsumalin becomes an idol dancing in a sailor uniform. Just like the
                    fertility of giant snails spreading across Southeast Asia at an alarming rate,
                    marketization and commercialization break down all boundaries and unite us all.
                    The most powerful force that unites everyone while expanding their territory as
                    vigorously as the giant snail is now is the song and dance of idols. The 48 idol
                    groups in Tokyo, Osaka, Shanghai, Jakarta, and Bangkok exist everywhere in a
                    different way from imperialism, which used force while singing — or selling —
                    love, friendship, and courage. From the beginning of the 20th century, the
                    National Socialist movement, the radical leftist movement in Europe, North
                    America, and Japan, and the democracy movement in the Third World all shouted
                    and sang together, but the ‘The Internationale’, which could not be realized,
                    finally lifted the body of Angsumalin in a sailor suit and realized through. Is
                    it realized? The artist doubts and disturbs ‘The Internationale’ realized at the
                    same time by inserting images of statues of girls from various parts of Asia and
                    a performance video in which Angsumalin wears a sailor suit and visits a shrine
                    dedicated to the love between the Japanese soldier and a Thai woman and offers
                    homemade mochi. The editing and arrangement of the two-channel video further
                    intensifies the disturbance by mixing and synchronizing their order. Here's the
                    sobering reality. Half of Angsumalin came from Japan. Since modern times, our
                    daily lives and perceptions have been composed of colonialism and imperialism.
                    No one is free from this perplexing cul-de-sac. Like the spiral pattern on the
                    shell of a giant snail, it repeats endlessly in a spiral like the spiral
                    staircase of the Bangkok Art Center, modeled after the Guggenheim in New York.
                    This is the core of the criticality of Chulayarnnon Siriphol's work, which
                    connects colonialism, which still leads to market domination through popular
                    culture, with his own historical genealogy, and expresses himself by dividing
                    and fragmenting his body.
                  </p>
                </div>
              </div>

              <div>
                <div>
                  {' '}
                  <img src="../../../static/images/curatorialPractice/chang_eunha/hwang_3.png" />
                  <span>
                    Mooni Perry, <b>Binlang Xishi</b> (2021-22), still.
                  </span>
                </div>
                <div>
                  <p>
                    <span>
                      <b>Mapping with Mooni Perry: Genre Yuri or GL (Girls' Love)</b> - Radical
                      Queerness in GL
                    </span>
                    <br />
                    <br />
                    After watching the film
                    <b>The People of the Ataka Family</b> (directed by Seiji Hisamatsu, 1952)
                    starring Kinuyo Tanaka, which was based on a novel by Nobuko Yoshiya, I
                    struggled to find other films based on novels by the same author for a while.{' '}
                    <b>The People of the Ataka Family</b> is one of the tendencies of Japanese films
                    produced during the post-war allied occupation period after the defeat, the fall
                    of the old era (symbolized by damaged patriarchy, old capital, and old class)
                    and the new era (represented by women and the public) which can be seen as a
                    movie about a lonely prelude, but what caught attention most of all was the
                    relationship between the women in the movie. Kuniko, who has situated a unique
                    position within the Ataka household as a caretaker for her disabled husband, a
                    manager of the household's affairs akin to her father who was a butler, and a
                    mediator between the employees and the family, finds solace and support in her
                    interactions with Masako, the wife of her husband's brother, as they navigate
                    the intricacies of their familial dynamics and societal expectations.
                    Ultimately, both women make the bold decision to break away from their
                    traditional roles and dissolve their family ties, opting instead to relinquish
                    their inherited wealth and power to the masses. The story and the ending of the
                    film invites the (female) audience to reconstruct the movie as a secret
                    solidarity of women through the lens of the film The People of the Atakas. The
                    original author, Nobuko Yoshiya, began submitting novels with girls as the main
                    characters to magazines from the early 1900s when she was a teenager, and
                    continued to write novels about women until her later years in the 1970s.{' '}
                    <b>The Flower Stories (Hanamonogatari)</b> series, which has been made into
                    several films as well, is a series of short stories that depict the psychology
                    and relationships of girls with different flowers
                    <span>&sup3;</span>, for about 10 years, it was serialized in two magazines with
                    enthusiastic support from the girls of the time. In particular, in the latter
                    half of the series, as the stories of featuring strong ties between girls and
                    homosexual themes became more prevalent and resonated with readers,, it is
                    considered the origin and start of the genre known as Yuri that has seen a
                    resurgence in popularity since the 1970s. ‘Girls’ schools’, which are based on a
                    conservative and patriarchal culture of gender separation,, allow female
                    students to reflect on themselves and form relationships outside of heterosexual
                    norms.
                    <span>&#8308;</span> Nobuko Yoshiya's <b>The Women's Classroom</b> (1939), which
                    has been made into films and stage plays several times, is set during the
                    Sino-Japanese War. Although the title <b>The Women in the Rear Guard</b> was
                    created to emphasizes the responsibility and duty of women in the rear on behalf
                    of men drafted for war<span>&#8309;</span> to reorganize women, the women in the
                    rear guard focuses on identity, self-reliance, and relationships between women
                    as independent individuals, separated from men or husbands, in the context of
                    time and space without men.
                    <br />
                    <br />
                    Mooni Perry's previous works, which combine video, installation, and
                    performance, <b>Binlang Xishi</b> (2021–22) and <b>Missing</b> (2022–) show the
                    ambivalence of culture occupied by women — as inferior beings in the patriarchal
                    order — or others associated with women, and explores radical possibilities
                    through its appropriation and parody. The combination of the status and
                    sexuality of women selling betel nut in <b>Binlang Xishi</b> brings the image to
                    the fore, so that the women selling betel nut (binlang) rather play and perform
                    the existing image in full. By bringing the concept of dirt and inferiority to
                    the fore, it makes the separation of ‘dirty’ and ‘clean’ unfamiliar, rather than
                    accepting the existing image, and makes us ask questions and deconstructive
                    questions about the process of the separation being rescued. Missing borrows and
                    mixes the frame of reverse harem and the layout design of role playing games in
                    female subcultures including same-sex/interspecies romance, detective stories
                    from popular narratives, time travel genre and popular movie subplots based on
                    Chinese tales, and animation which conducts a critique of radical ecofeminist
                    positions on anthropocentrism and interspecies inequality. According to Judith
                    Butler, the process of receiving, appropriating, and accepting norms is the
                    process by which the subject, that is, the speaking “I” is formed.
                    <span>&#8310;</span> ‘I’ cannot help but be formed within the existing norms,
                    and the possibility of having other performativity by actively appropriating the
                    norms also comes from this process of appropriation. Butler speaks of
                    appropriation moving between rejection and absorption of existing norms:
                    “Antigone's autonomy is achieved through the appropriation of the voice of
                    authority of the person she stands against, an appropriation that bears within
                    herself both the rejection and the absorption of that very authority.”
                    <span>&#8311;</span> Judith Butler responded to discussions criticizing the
                    performance of New York ball culture in the 1990s that borrowed existing
                    heterosexual norms or appropriated the gender role of heterosexual relationships
                    and the conservatism of the desires of gays, lesbians, transgenders, and drag
                    queens who participated in it: “In other words, after all, the drag queen,
                    molded for us and filmed for us, is a figure who both appropriates and subverts
                    racist, misogynistic and homophobic norms of oppression. But how can we explain
                    this ambivalence?
                  </p>
                </div>
              </div>

              <div>
                <div>
                  {' '}
                  <img src="../../../static/images/curatorialPractice/chang_eunha/hwang_4.png" />
                  <span>
                    Mooni Perry, <b>Mapping with Mooni Perry: Genre Yuri or GL (Girls' Love)</b>{' '}
                    (2022), still.
                  </span>
                </div>
                <div>
                  <p>
                    This ambivalence is not the kind of ambivalence that first appears as
                    appropriation and later as subversion. Sometimes the two appear simultaneously,
                    sometimes such ambivalence is caught in an insoluble tension, and sometimes
                    fatally a nonsubversive appropriation takes place.” We cannot, by fate, say what
                    is radical or conservative. It is to create radical moments and actions while
                    questioning how they are composed within the repetition, arrangement, and
                    rearrangement of performance within and outside the network of semantics and
                    relationships of norms. In Mooni Perry's works, the genre frameworks of popular
                    culture and subculture, which are familiar and cannot be called critical or
                    radical in themselves, are appropriated and parodied, allowing us to look into
                    existing powers and at the same time construct new semantic networks.
                    <br />
                    <br />
                    Mooni Perry's new work{' '}
                    <b>Mapping with Mooni Perry: Genre Yuri or GL (Girls' Love)</b> explores the
                    female-only subculture of yuri or GL. More precisely, it explores the queer
                    radicality of GL. Showing the methodology of appropriating the images and frames
                    of existing popular culture and subculture through a 3D map as a collage of
                    text, literally mapping, drawing a map itself is the core of this work. This map
                    begins with Yoshiya Nobuko's <b>Flower Stories (Hanamonogatari)</b> and
                    discusses the characteristics of a contemporary subculture in which consumers
                    and producers are not separated and the form of ‘consumption’ becomes more
                    important, and the ‘Omegaverse’ becomes more important, and worldview, which can
                    be seen as the most recently observed form of imagination in relation to gender,
                    sexuality, and women. Vertically and horizontally, it leads to a cross-cultural
                    study of regional, post-colonial, and postmodern capitalist contemporaneity, the
                    differences and commonalities between GL, queer works, and BL, and the United
                    States and Japan. However, this map is not simply a commentary on GL culture. It
                    is a work to dismantle the monopoly status of heterosexual romantic love since
                    modern times and to engrave the genealogy of relationships between women in the
                    history of construction of modernity, plus an attempt to feminize modern queer
                    history. In addition, BL and GL, which have a commonality of a culture almost
                    exclusively occupied by women, are contrasted, focusing on the distance between
                    the character (s) in the work and the creator/enjoyer, and the party. In this
                    mapping of Mooni Perry, GL is positioned as a text that has a direct and deep
                    relationship with women's reality, and as a mutually constructive text in which
                    women create their own ‘party’.
                    <br />
                    <br />
                    While having a relationship with the reality of GL, Mooni Perry, who vigorously
                    explored non-normative and fluid radicality, attaches the modern otaku culture
                    that has built a closed, self-sufficient, and consuming world that is
                    increasingly disconnected from reality, as discussed in{' '}
                    <b>Animalizing Postmodern</b> by Azuma Hiroki. This montage or collage looks
                    somewhat different from the development of the previous mapping. When the
                    previous map drawing was a chronological yet organic flow that converges into
                    one point, female homosexual culture and GL creation/enjoyment from the early
                    modern times to recent subcultures in Korea, this ‘animalized postmodern’ otaku
                    culture is separated from reality and buried in the self-sufficient genre
                    culture itself, and in a broad sense, it is identified and subsumed as
                    neoliberal consumption. What's the problem when these collages collide? Is this
                    ‘animalizing postmodern’ otaku culture critically emerging in contrast to
                    current GL culture, or is it a part of the development of GL culture that Mooni
                    Perry is concerned about while mapping? The otaku culture that Azuma Hiroki
                    discusses is distinct from the GL culture discussed in Mapping with Mooni Perry:
                    Genre Yuri or GL (Girls' Love) in that it is a male-centered culture for both
                    creators and enjoyers, and that it is a reality glass with closure. However, the
                    effect of the structure of this mapping, which consists of collisions of
                    quotations and texts without any other explanation of the connection, seems to
                    be both a privilege of GL and a concern for the future. After building the
                    radicality of GL culture centering on the dismantling of heterosexual culture,
                    the feminization of queer history, and the party that is distinct from BL, Azuma
                    Hiroki was added, and while emphasizing the uniqueness of GL culture, it manages
                    to add the ambivalence of concern about future developments.
                    <br />
                    <br />
                    As women build and reciprocally rebuild their identities, GL culture has
                    secretly expanded its radical imagination. The discovery of the imagination of
                    GL culture, which starts from familiar relationships but is not returned
                    anywhere, and the ambivalent position of expectations and concerns about
                    unpredictable future developments reminds Chizuko Ueno's discussion of girls'
                    school culture. As women build and reciprocally rebuild their identities, GL
                    culture has secretly expanded its radical imagination. Mooni Perry articulates
                    and connects the imagination of GL culture, which originates from familiar
                    relationships but is not returned anywhere, to feminist science fiction. This
                    article ends with a sentence about the unknown future brought by Chizuko Ueno's
                    'Girls' School Culture'. “In the world of media, the girls’ school culture is
                    expanding its territory deeply and widely. … What will happen when this dark
                    continent, which has been a blind spot for men, suddenly appears in front of
                    their eyes, just as the fantasy Atlantis sometimes rises from the sea?”
                    <span>&#8312;</span>
                  </p>
                </div>
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
                    The TV series aired in 1990 recorded the highest ratings ever in Thai
                    broadcasting history.
                  </span>
                </div>
                <div>
                  <span>2</span>
                  <span>
                    Serialized in Sri Siam magazine in 1965, first volume published in 1969.
                  </span>
                </div>
                <div>
                  <span>3</span>
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
                      href="
                                    https://rainbowreeltokyo.com/2009/program/pre/01_fukujyusou.html"
                      target="_blank"
                    >
                      https://rainbowreeltokyo.com/2009/program/pre/01_fukujyusou.html
                    </a>
                  </span>
                </div>
                <div>
                  <span>4</span>
                  <span>
                    Of course, none of these relationships are morally right or good, and they all
                    have their downsides. Nevertheless, it is radical in that it builds something
                    new in a place different from the male or heterosexual patriarchal point of
                    view. The deepening of this discussion can be referred to in “Chapter 11 Girls'
                    School Culture and Misogyny” in Chizuko Ueno's book{' '}
                    <b>Hate Misogyny (Onna Girai -Nippon No Misogyn)</b>.
                  </span>
                </div>
                <div>
                  <span>5</span>
                  <span>
                    It is a discourse that reorganizes the identity of women in the rear as
                    war-related under wartime by emphasizing the role of women who did not
                    participate in the war under the total mobilization system during the Japanese
                    imperialist war in rear management, education, and mobilization of materials.
                    Kwon Myeongah, <b>The Women in the Rear Guard, New Woman, and Spy</b>,
                    Sang-heo-hak-bo, 2004, vol.12, pp. 251-282.
                  </span>
                </div>
                <div>
                  <span>6</span>
                  <span>
                    Butler discusses this in several books, but in particular, she discusses it
                    intensively in <b>Hate Speech</b> (Ryu Min-seok, Aleph publishing) and Gender
                    Demolition (Cho Hyun-jun, Moonji Publishing Co., Ltd.).
                  </span>
                </div>
                <div>
                  <span>7</span>
                  <span>
                    Judith Butler, <b>Undoing Gender</b>, pp. 267.
                  </span>
                </div>
                <div>
                  <span>8</span>
                  <span>
                    Chizuko Ueno, <b>Hate Misogyny (Onna Girai -Nippon No Misogyn)</b>, pp. 212.
                  </span>
                </div>
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
            <div
              css={ArtistBanner('#e6ffc5')}
              onClick={() =>
                router.push({
                  pathname: '/curatorial_practice/chang_eunha/alaa_abu_asad',
                })
              }
            >
              <div>
                <span>Alaa Abu Asad</span>
              </div>
              <div>
                <img
                  src="../../static/images/curatorialPractice/arrowRight.png"
                  alt="오른 쪽 화살표"
                />
              </div>
            </div>
            <div
              css={ArtistBanner('#FFE8FF')}
              onClick={() =>
                router.push({
                  pathname: '/curatorial_practice/chang_eunha/mooni_perry',
                })
              }
            >
              <div>
                <span>Mooni Perry</span>
              </div>
              <div>
                <img
                  src="../../static/images/curatorialPractice/arrowRight.png"
                  alt="오른 쪽 화살표"
                />
              </div>
            </div>
            <div
              css={ArtistBanner('#EAE8FF')}
              onClick={() => {
                router.push({
                  pathname: '/curatorial_practice/chang_eunha/chulayarnnon_siriphol',
                });
              }}
            >
              <div>
                <span>Chulayarnnon Siriphol</span>
              </div>
              <div>
                <img
                  src="../../static/images/curatorialPractice/arrowRight.png"
                  alt="오른 쪽 화살표"
                />
              </div>
            </div>
            <div
              css={ArtistBanner('#E8FFF5')}
              onClick={() =>
                router.push({
                  pathname: '/curatorial_practice/chang_eunha/tj_shin',
                })
              }
            >
              <div>
                <span>TJ Shin</span>
              </div>
              <div>
                <img
                  src="../../static/images/curatorialPractice/arrowRight.png"
                  alt="오른 쪽 화살표"
                />
              </div>
            </div>
            <div
              css={ArtistBanner('#D2FFFF')}
              onClick={() =>
                router.push({
                  pathname: '/curatorial_practice/chang_eunha/hwang_miyojo',
                })
              }
            >
              <div>
                <span>Hwang Miyojo</span>
              </div>
              <div>
                <img
                  src="../../static/images/curatorialPractice/arrowRight.png"
                  alt="오른 쪽 화살표"
                />
              </div>
            </div>
            <div
              css={ArtistBanner('#fff')}
              onClick={() =>
                router.push({
                  pathname: '/curatorial_practice/chang_eunha',
                })
              }
            >
              <div>
                <span>CHANG Eunha</span>
              </div>
              <div>
                <img
                  src="../../static/images/curatorialPractice/arrowLeft.png"
                  alt="왼 쪽 화살표"
                />
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </React.Fragment>
  );
};

export default id;
