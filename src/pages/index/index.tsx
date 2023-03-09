import React from 'react';
import { css } from '@emotion/react';
import theme from '../../styles/theme';

/* comps */
import { PageLayout } from '../../../components';

/* states */
import { useRecoilValue, useRecoilState } from 'recoil';
import { headerState, headerColorState } from '../../../state/index';

const Container = (headerHeight: number) => css`
  width: 100vw;
  height: auto;
  padding-left: 22px;
  padding-right: 22px;
  padding-top: ${headerHeight}px;

  & > div:last-of-type {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const TitleHeader = (headerHeight: number) => css`
  width: 100%;
  height: 100px;
  position: sticky;
  top: ${headerHeight}px;
  background-color: #fff;
  display: flex;
  border-bottom: 2.5px solid #000;
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
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 2.5px solid #000;

    & > div:first-of-type {
      h2 {
        font-size: ${theme.fontSize.m_titleSans};
        line-height: ${theme.lineHeight.m_titleSans};
      }
    }

    & > div:last-of-type {
      flex-direction: row;

      ul {
        display: flex;
        li {
          font-size: ${theme.fontSize.m_smallBodySans};
          line-height: ${theme.lineHeight.m_smallBodySans};
        }

        li:first-of-type {
          margin-right: 10px;
        }
      }
    }
  }
`;

const IndexModuleContainer = css`
  width: calc((100% / 12) * 3);
  display: flex;
  flex-direction: column;

  & > div:first-of-type {
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 2.5px dashed #000;
    font-family: ${theme.fontFamily.sans}, sans-serif;
    font-size: ${theme.fontSize.smallTitleSans};
    line-height: ${theme.lineHeight.smallTitleSans};
    letter-spacing: ${theme.letterSpacing.sans};
  }

  & > div:nth-of-type(2) {
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 2.5px dashed #000;
    font-family: ${theme.fontFamily.sans}, sans-serif;
    font-size: ${theme.fontSize.smallTitleSans};
    line-height: ${theme.lineHeight.smallTitleSans};
    letter-spacing: ${theme.letterSpacing.sans};
  }

  & > div:nth-of-type(3) {
    display: flex;
    align-items: center;
    border-bottom: 2.5px dashed #000;
    height: 60px;
    font-family: ${theme.fontFamily.serif}, serif;
    font-size: ${theme.fontSize.smallTitleSerif};
    line-height: ${theme.lineHeight.smallTitleSerif};
    letter-spacing: ${theme.letterSpacing.serif};
  }

  & > div:last-of-type {
    padding-top: 16px;
    padding-bottom: 16px;
    font-family: ${theme.fontFamily.sans}, sans-serif;
    font-size: ${theme.fontSize.smallBodySans};
    line-height: ${theme.lineHeight.smallBodySans};
    letter-spacing: ${theme.letterSpacing.sans};
    border-bottom: 2.5px solid #000;

    padding-bottom: 20px;
    padding-right: 20px;

    p {
      height: 250px;
      overflow: scroll;
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    width: 50%;

    &:nth-of-type(2n) {
      & > div:nth-of-type(4) {
        padding-left: 5px;
      }
    }

    &:nth-of-type(2n + 1) {
      & > div:nth-of-type(4) {
        padding-right: 5px;
      }
    }

    & > div:first-of-type {
      height: auto;
      padding: 8px 0px;
      border-bottom: 1.5px dashed #000;
      font-size: ${theme.fontSize.m_headerMenu};
      line-height: ${theme.lineHeight.m_headerMenu};
    }

    & > div:nth-of-type(2) {
      height: auto;
      padding: 10px 0px;
      border-bottom: 1.5px dashed #000;
      font-size: ${theme.fontSize.m_headerMenu};
      line-height: ${theme.fontSize.m_headerMenu};
    }

    & > div:nth-of-type(3) {
      height: auto;
      padding: 10px 0px;
      border-bottom: 1.5px dashed #000;
      font-size: ${theme.fontSize.m_bannerSerif};
      line-height: ${theme.fontSize.m_bannerSerif};
    }

    & > div:last-of-type {
      padding: 10px 0px;
      border-bottom: 1.5px dashed #000;
      font-size: ${theme.fontSize.m_smallBodySans};
      line-height: ${theme.lineHeight.m_smallBodySans};
    }
  }
`;

interface IIndexProps {
  name: string;
  email: string;
  nation: string;
  intro: string;
  index: number;
}

const IndexModule = ({ name, email, nation, intro, index }: IIndexProps) => {
  return (
    <div css={IndexModuleContainer}>
      <div>{index}</div>
      <div>{name}</div>
      <div>{nation}</div>
      <div>
        <p>
          {email}
          <br />
          {intro}
        </p>
      </div>
    </div>
  );
};

const IndexArray = [
  {
    name: 'Jeanette Bisschops',
    email: 'j.e.bisschops@gmail.com',
    nation: 'Netherlands_NY',
    intro:
      'Jeanette Bisschops is an independent Dutch curator, art critic and writer residing in New York. She was Curatorial Fellow at the New Museum, New York between 2019 and 2022 and served as Curatorial Assistant for Time-Based Media at the Stedelijk Museum Amsterdam between 2016-2019. She holds a Master’s in Psychology from Maastricht University and a Master’s in Art History from the University of Amsterdam.',
  },
  {
    name: 'CHANG Eunha',
    email: 'eunhaart@gmail.com',
    nation: 'Korea_Seoul',
    intro:
      'Eunha CHANG (b. 1990, South Korea) is a curator and researcher based in Seoul, working between contemporary art theory and ecology. She has recently graduated with distinction from an MA in Contemporary Art Theory at Goldsmiths, University of London. She has worked as a director, curator, programme coordinator in various projects across Europe and Asia. She curated two curatorial projects: Invasive Species Behind the Notoriety: Multi-directional Narratives for Abundant Futures (Gwangju, 2021); Portals, Teleportation (Seoul and Istanbul, 2021). She is working as a coordinator for Scoring the Words (2022) in the Exhibition Division at Seoul Museum of Art, and assisting in their International Exchange Team. She has over 4 years international art and professional experience across a range of world-renowned art institutions including Istanbul Biennial, National Museum of Modern and Contemporary Art, Korea and Gwangju Design Biennale. Chang served as a curatorial assistant for the Asia Project, contributing to Looking for Another Family (2020), Catastrophe and Recovery (2021), and Nam June Paik Archive (working title) at the National Museum of Modern and Contemporary Art. She completed an internship in The Seventh Continent (2019) at the Istanbul Biennial fully funded by the Ministry of Culture, Sports and Tourism of the Republic of Korea.',
  },
  {
    name: 'Sofia Dourron',
    email: 'sofiadourron@gmail.com',
    nation: 'Argentina_Buenos Aires',
    intro:
      "Sofía Dourron (b. 1984, Argentina) is an independent curator, researcher and writer based in Buenos Aires. Her current work researches the relationships between Latin American decolonial perspectives and post-humanist philosophy, the notion of the decolonization of the unconscious, ecological thinking, and artistic practices and imaginations. She also continues to research art institutions in her region, focusing on the paradigms of the museum as a colonial device, while searching for alternative genealogies that escape the modern universalist museum canon. Dourron was part of La Ene, Nuevo Museo Energía de Arte Contemporáneo, which she directed between 2015 and 2018, and was a Curator at the Museo de Arte Moderno de Buenos Aires. She holds a BA in Art History and Management, an MA in Latin American Art History and was a participant in the De Appel Curatorial Programme 2018/2019. In 2019 she was an International Research Fellow at the National Museum of Modern and Contemporary Art of Korea, and in 2015 she participated in ICI's Curatorial Intensive Bogotá. Her recent projects include: After Nature (arteba, Buenos Aires, 2022), Caudal, by Joaquín Boz (Barro, Buenos Aires, 2022), Temporada Fulgor. Foto Estudio Luisita (Malba, Buenos Aires, 2021), Myths of the Near Future (Asia Culture Center, Gwangju, 2020/Parque de la Memoria, Buenos Aires, 2022), Landscape with Bear (De Appel, Amsterdam, 2019), Untitled. Elba Bairon (Museo de Arte Moderno de Buenos Aires, Buenos Aires, 2017) and Avello: joven profesional multipropósito (Museo de Arte Moderno de Buenos Aires, Buenos Aires, 2017). She has contributed essays for publications on artists such as Belkis Ayón, Laura Códega, Ad Minoliti, Joaquín Boz, Dignora Pastorello, Juan del Prete, Jorge Lezama, Edgardo Vigo, Hernán Soriano and Marta Minujín, amongst others.",
  },
  {
    name: 'Manique Hendricks',
    email: 'manique.h@gmail.com',
    nation: 'Netherlands_Amsterdam',
    intro:
      'Art historian Manique Hendricks (1992, the Netherlands) works at the Frans Hals Museum as exhibition curator. As a freelance curator, writer and researcher she specializes in contemporary (media) art, visual- and digital culture. In her practice she touches upon themes as identity, representation, the body, camp and club culture. Manique’s writings have been published by Stedelijk Studies, NXS Magazine, Mister Motley, The Institute of Network Cultures, Tubelight and The Hmm. Additionally, she acts as an advisor for the Mondrian Fund and part of the boards of Nieuwe Vide and Jong VNK. ',
  },
  {
    name: 'MOK Honggyun',
    email: 'honggyunmok@gmail.com',
    nation: 'Korea_Seoul',
    intro:
      'Independent curator based in Seoul. Currently she is working as a curatorial director for the 2021–2022 Korea-Netherlands Arts Joint. In recent years, she directed the curatorial project Project The Great Museum (KOFICE,2021), curated Private Song I (DOOSAN Gallery, 2020), The City of Homeless (ARKO, 2016), co-curated The Manual: Parts & Labour (Culture Factory Osan, 2014) and participated for a curatorial fellowship at De Appel Amsterdam (2018). She was also a researcher at Tokyo Art and Space (2018) and V&A London (2017). Currently, having an interest in making a collaborative platform like GitHub for independent curators.',
  },
  {
    name: 'ONG Jo-Lene',
    email: 'ongjolene@gmail.com',
    nation: 'Malaysia_Amsterdam',
    intro:
      'Curator and teacher based in Amsterdam. She is of Malaysian-Hokkien heritage and got her start in the field at the intersection of social activism and art in Kuala Lumpur. Her practice engages with the textures and transmissions surrounding migratory movements and boundary transgressions. Jo-Lene has curated exhibitions in Framer Framed, Amsterdam; Oude Kerk, Amsterdam; De Appel, Amsterdam; Kunstinstituut Melly, Rotterdam; ILHAM Gallery, Kuala Lumpur; National Art Gallery Kuala Lumpur. Recent roles include being curator at Hartwig Art Production | Collection Fund (2020-21), co-curator of visual arts and theory at Other Futures (2020-21), co-editor of Practice Space (2019) a volume on forms of radical localisms by art initiatives, and being in the curatorial team of SUNSHOWER: Contemporary Art from Southeast Asia 1980s to Now at The National Art Center Tokyo and Mori Art Museum. Jo-Lene is resident at Delfina Foundation in early 2023.',
  },
  {
    name: 'YUN Minhwa',
    email: 'ymhcurates@gmail.com',
    nation: 'Korea_Seoul',
    intro:
      'Minhwa Yun(b. 1985, South Korea) in an independent curator. Yun is currently studying for a doctorate program in Posthuman Studies at Ewha Womans University. She has curated and organized many exhibitions, including Translate into Mother Tongue(Doosan Gallery Seoul/New York, 2013), Seoul Mediacity Biennale 2018(SeMA, 2018), Earthbound(Amado Art Space, 2020), Panorama Object(d/p, 2020), Anthrophony(Mullae Art Space, 2021) and others. She ran an art space called Cake Gallery in Seoul and also has worked at Seoul Museum of Art(SeMA) as a curator.',
  },
];

const Index = (): JSX.Element => {
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
          <div css={TitleHeader(headerHeight)}>
            <div>
              <h2>Index</h2>
            </div>
            <div>
              <ul>
                <li>shuffle</li>
                <li>a-z</li>
              </ul>
            </div>
          </div>
          <div>
            {IndexArray &&
              IndexArray.map((el, _i) => {
                return (
                  <IndexModule
                    key={_i}
                    index={_i + 1}
                    name={el.name}
                    email={el.email}
                    nation={el.nation}
                    intro={el.intro}
                  />
                );
              })}
          </div>
        </div>
      </PageLayout>
    </React.Fragment>
  );
};

export default Index;
