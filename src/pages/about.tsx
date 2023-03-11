import React from 'react';
import { css } from '@emotion/react';
import theme from '../styles/theme';
import Image from 'next/image';

/* comps */
import { PageLayout } from '../../components';

/* states */
import { useRecoilValue, useRecoilState } from 'recoil';
import { headerState, headerColorState } from '../../state/index';

/* images */
import AboutImage1 from '/public/images/about_1.png';
import AboutImage2 from '/public/images/about_2.png';
import AboutImage3 from '/public/images/about_3.png';
import { GetStaticProps } from 'next';
import { IParams, IPreviewData, TPageCommonProps } from 'interfaces';
import { aboutPageData, TAboutPageData } from '@/lib/schemas';
import { aboutPageQuery } from 'sanity/queries';
import { client } from 'sanity/server';

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

type TProps = TPageCommonProps & TAboutPageData;

const About = ({ aboutPageConfig }: TProps) => {
  const headerHeight = useRecoilValue(headerState);
  const [headerColor, setHeaderColor] = useRecoilState(headerColorState);

  React.useEffect(() => {
    setHeaderColor('#fff');
  });

  // Test
  console.log(aboutPageConfig);

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
              <h2>about</h2>
            </div>
          </div>
          <div css={AboutWrapper(headerHeight)}>
            <div>
              <div>
                <Image src={AboutImage1} alt="about_1" layout="intrinsic" />
                <p>Page from the manuscript of Alice’s Adventures Under Ground, 1864</p>
              </div>
              <div>
                <p>
                  A young girl named Alice sits bored by a riverbank, where she suddenly spots a
                  White Rabbit with a pocket watch and waistcoat lamenting that he is late. The
                  surprised Alice follows him down a rabbit hole, which sends her down a lengthy
                  plummet but to a safe landing. Inside a room with a table, she finds a key to a
                  tiny door, beyond which is a beautiful garden. As she ponders how to fit through
                  the door, she discovers a bottle reading “Drink me”. Alice hesitantly drinks a
                  portion of the bottle’s contents, and to her astonishment, she shrinks small
                  enough to enter the door. However, she had left the key upon the table and is
                  unable to reach it. Alice then discovers and eats a cake, which causes her to grow
                  to a tremendous size. As the unhappy Alice bursts into tears, the passing White
                  Rabbit flees in a panic, dropping a fan and pair of gloves. Alice uses the fan for
                  herself, which causes her to shrink once more and leaves her swimming in a pool of
                  her own tears. Alice uses the fan for herself, which causes her to shrink once
                  more and leaves her swimming in a pool of her own tears. Within the pool, Alice
                  meets a variety of animals and birds, who convene on a bank and engage in a
                  “Caucus Race” to dry themselves. Following the end of the race, Alice
                  inadvertently frightens the animals away by discussing her (^・x・^).
                </p>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <Image src={AboutImage2} alt="about_2" layout="intrinsic" />
                  <p>
                    The cracker cracks a smile at edge of the primordial soup, print, Stephen Gibb,
                    2013
                  </p>
                </div>
              </div>
              <div>
                {' '}
                <p>
                  <span>The White Rabbit appears in search of the gloves and fan.</span>
                  <br />
                  Mistaking Alice for his maidservant, the White Rabbit orders Alice to go into his
                  house and retrieve them. Alice finds another bottle and drinks from it, which
                  causes her to grow to such an extent that she gets stuck within the house. The
                  White Rabbit and his neighbors attempt several methods to extract her, eventually
                  taking to hurling pebbles that turn into small cakes. Alice eats one and shrinks
                  herself, allowing her to flee into the forest. She meets a Caterpillar seated on a
                  mushroom and smoking a hookah. Amidst the Caterpillar1’s questioning, Alice begins
                  to admit to her current identity crisis, compounded by her inability to remember a
                  poem. Before crawling away, the Caterpillar tells her that a bite of one side of
                  the mushroom will make her larger, while a bite from the other side will make her
                  smaller. During a period of trial and error, Alice’s neck extends between the
                  treetops, frightening a pigeon who mistakes her for a serpent. After shrinking to
                  an appropriate height, Alice arrives at the home of a Duchess, who owns a
                  perpetually grinning Cheshire (^・x・^). The Duchess’s baby, whom she hands to
                  Alice, transforms into a piglet, which Alice releases into the woods. The Cheshire
                  (^・x・^) appears to Alice and directs her toward the Hatter and March Hare before
                  disappearing, leaving his grin behind. Alice finds the Hatter, March Hare2, and a
                  sleepy Dormouse in the midst of an absurd tea party. The Hatter explains that it
                  is always 6 pm (tea time), claiming that time is standing still as punishment for
                  the Hatter trying to “kill it”. A strange conversation ensues around the table,
                  and the riddle “Why is a raven like a writing desk?” is brought forward.
                  Eventually, Alice impatiently decides to leave, dismissing the affair as “the
                  stupidest tea party that [she has] ever been to”. Alice trying to play croquet
                  with a Flamingo Noticing a door on one of the trees, Alice passes through and
                  finds herself back in the room from the beginning of her journey. She is able to
                  take the key and use it to open the door to the garden, which turns out to be the
                  croquet court of the Queen of Hearts, whose guard consists of living playing
                  cards. Alice participates in a croquet game, in which hedgehogs3 are used as
                  balls, flamingos are used as mallets, and soldiers act as gates. The Queen proves
                  to be short-tempered, and she constantly orders beheadings. When the Cheshire
                  (^・x・^) appears as only a head, the Queen orders his beheading, only to be told
                  that such an act is impossible. Because the (^・x・^) belongs to the Duchess,
                  Alice prompts the Queen to release the Duchess from prison to resolve the matter.
                  When the Duchess ruminates on finding morals in everything around her, the Queen
                  dismisses her on the threat of execution. Alice then meets a Gryphon and a weeping
                  Mock Turtle, who dance to the Lobster Quadrille while Alice recites (rather
                  incorrectly) “’Tis the Voice of the Lobster”. The Mock Turtle sings them
                  “Beautiful Soup” during which the Gryphon drags Alice away for an impending trial,
                  in which the Knave of Hearts stands accused of stealing the Queen’s tarts. The
                  trial is ridiculously conducted by the King of Hearts, and the jury is composed of
                  various animals that Alice had previously met. Alice gradually grows in size and
                  confidence, allowing herself increasingly frequent remarks on the irrationality of
                  the proceedings. The Queen finally commands Alice’s beheading, but Alice scoffs
                  that the Queen’s guard is only a pack of cards. Although Alice holds her own for a
                  time, the card guards soon gang up and start to swarm all over her. Alice’s sister
                  wakes her up from a dream, brushing what turns out to be some leaves from Alice’s
                  face. Alice leaves her sister on the bank to imagine all the curious happenings
                  for herself. A young girl named Alice sits bored by a riverbank, where she
                  suddenly spots a White Rabbit with a pocket watch and waistcoat lamenting that he
                  is late. The surprised Alice follows him down a rabbit hole, which sends her down
                  a lengthy plummet but to a safe landing. Inside a room with a table, she finds a
                  key to a tiny door, beyond which is a beautiful garden. As she ponders how to fit
                  through the door, she discovers a bottle reading “Drink me”.
                </p>
              </div>
            </div>
            <div>
              <div>
                <Image src={AboutImage3} alt="about_3" layout="intrinsic" />
                <p>
                  Stained glass window of Alice characters (King and Queen of Hearts) in All Saints’
                  church, Daresbury, Cheshire
                </p>
              </div>
              <div>
                {' '}
                <p>
                  Alice hesitantly drinks a portion of the bottle’s contents, and to her
                  astonishment, she shrinks small enough to enter the door. However, she had left
                  the key upon the table and is unable to reach it. Alice then discovers and eats a
                  cake, which causes her to grow to a tremendous size. As the unhappy Alice bursts
                  into tears, the passing White Rabbit flees in a panic, dropping a fan and pair of
                  gloves. Alice uses the fan for herself, which causes her to shrink once more and
                  leaves her swimming in a pool of her own tears. Alice uses the fan for herself,
                  which causes her to shrink once more and leaves her swimming in a pool of her own
                  tears. Within the pool, Alice meets a variety of animals and birds, who convene on
                  a bank and engage in a “Caucus Race” to dry themselves. Following the end of the
                  race, Alice inadvertently frightens the animals away by discussing her (^・x・^).
                  The White Rabbit appears in search of the gloves and fan. Mistaking Alice for his
                  maidservant, the White Rabbit orders Alice to go into his house and retrieve them.
                  Alice finds another bottle and drinks from it, which causes her to grow to such an
                  extent that she gets stuck within the house. The White Rabbit and his neighbors
                  attempt several methods to extract her, eventually taking to hurling pebbles that
                  turn into small cakes. Alice eats one and shrinks herself, allowing her to flee
                  into the forest. She meets a Caterpillar seated on a mushroom and smoking a
                  hookah. Amidst the Caterpillar1’s questioning, Alice begins to admit to her
                  current identity crisis, compounded by her inability to remember a poem. Before
                  crawling away, the Caterpillar tells her that a bite of one side of the mushroom
                  will make her larger, while a bite from the other side will make her smaller.
                  During a period of trial and error, Alice’s neck extends between the treetops,
                  frightening a pigeon who mistakes her for a serpent. After shrinking to an
                  appropriate height, Alice arrives at the home of a Duchess, who owns a perpetually
                  grinning Cheshire (^・x・^). The Duchess’s baby, whom she hands to Alice,
                  transforms into a piglet, which Alice releases into the woods. The Cheshire
                  (^・x・^) appears to Alice and directs her toward the Hatter and March Hare before
                  disappearing, leaving his grin behind. Alice finds the Hatter, March Hare2, and a
                  sleepy Dormouse in the midst of an absurd tea party. The Hatter explains that it
                  is always 6 pm (tea time), claiming that time is standing still as punishment for
                  the Hatter trying to “kill it”. A strange conversation ensues around the table,
                  and the riddle “Why is a raven like a writing desk?” is brought forward.
                  Eventually, Alice impatiently decides to leave, dismissing the affair as “the
                  stupidest tea party that [she has] ever been to”. Alice trying to play croquet
                  with a Flamingo Noticing a door on one of the trees, Alice passes through and
                  finds herself back in the room from the beginning of her journey. She is able to
                  take the key and use it to open the door to the garden, which turns out to be the
                  croquet court of the Queen of Hearts, whose guard consists of living playing
                  cards. Alice participates in a croquet game, in which hedgehogs3 are used as
                  balls, flamingos are used as mallets, and soldiers act as gates. The Queen proves
                  to be short-tempered, and she constantly orders beheadings. When the Cheshire
                  (^・x・^) appears as only a head, the Queen orders his beheading, only to be told
                  that such an act is impossible. Because the (^・x・^) belongs to the Duchess,
                  Alice prompts the Queen to release the Duchess from prison to resolve the matter.
                  When the Duchess ruminates on finding morals in everything around her, the Queen
                  dismisses her on the threat of execution. Alice then meets a Gryphon and a weeping
                  Mock Turtle, who dance to the Lobster Quadrille while Alice recites (rather
                  incorrectly) “’Tis the Voice of the Lobster”. The Mock Turtle sings them
                  “Beautiful Soup” during which the Gryphon drags Alice away for an impending trial,
                  in which the Knave of Hearts stands accused of stealing the Queen’s tarts. The
                  trial is ridiculously conducted by the King of Hearts, and the jury is composed of
                  various animals that Alice had previously met. Alice gradually grows in size and
                  confidence, allowing herself increasingly frequent remarks on the irrationality of
                  the proceedings. The Queen finally commands Alice’s beheading, but Alice scoffs
                  that the Queen’s guard is only a pack of cards. Although Alice holds her own for a
                  time, the card guards soon gang up and start to swarm all over her. Alice’s sister
                  wakes her up from a dream, brushing what turns out to be some leaves from Alice’s
                  face. Alice leaves her sister on the bank to imagine all the curious happenings
                  for herself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </React.Fragment>
  );
};

export default About;

export const getStaticProps: GetStaticProps<TProps, IParams, IPreviewData> = async (ctx) => {
  const { previewData, params } = ctx;

  const { aboutPageConfig } = aboutPageData.parse(await client.fetch(aboutPageQuery));

  return {
    props: {
      previewToken: previewData ? previewData.previewToken : null,
      aboutPageConfig,
    },
  };
};
