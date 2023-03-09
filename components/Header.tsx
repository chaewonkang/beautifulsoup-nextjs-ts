import React from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import theme from '../src/styles/theme';
import { headerState, headerColorState } from '../state/index';
import { useRecoilState, useRecoilValue } from 'recoil';
import Image from 'next/image';
import Link from 'next/link';
import HeaderImage from '../public/images/header.png';
import smallHeaderImage from '../public/images/smallHeader.png';
import searchIconImage from '../public/images/searchIcon.png';
import menuIconImage from '../public/images/menuIcon.png';
import logoImage from '../public/images/logo.png';

const Container = (menuIsOpen: boolean, searchIsOpen: boolean, headerColor: string) => css`
  width: calc(100% - 44px);
  height: fit-content;
  display: flex;
  flex-direction: column;
  position: fixed;
  padding: 22px;

  top: 0;
  z-index: 10;
  padding-top: 16px;

  & > div:first-of-type {
    width: 100%;
    height: 80px;
    align-items: center;
    top: ${menuIsOpen ? '0' : '-110px'};
    background-color: ${headerColor !== '#fff' ? headerColor : '#fff'};
    position: absolute;

    display: flex;

    border-bottom: 4px solid #000;
    transition: ease-in 500ms;

    margin-bottom: 16px;

    & > ul {
      display: flex;

      li {
        font-family: ${theme.fontFamily.sans}, sans-serif;
        font-size: ${theme.fontSize.titleSans};
        margin-right: 28px;
        cursor: pointer;

        :hover {
          text-decoration: underline;
        }

        span {
          font-family: ${theme.fontFamily.serif}, serif;
        }
      }
    }
  }

  & > div:nth-of-type(2) {
    top: ${searchIsOpen ? '0' : '-110px'};
    position: absolute;
    background-color: ${headerColor !== '#fff' ? headerColor : '#fff'};
    display: flex;
    transition: ease-in 500ms;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 16px;
    height: 95px;
    align-items: center;
    border-bottom: 4px solid #000;

    label {
      font-family: ${theme.fontFamily.sans}, sans-serif;
      font-size: ${theme.fontSize.titleSans};
      cursor: pointer;

      :hover {
        text-decoration: underline;
      }
    }

    input {
      border-bottom: 2px solid #000;
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    width: calc(100% - 32px);
    height: fit-content;
    display: flex;
    flex-direction: column;
    position: fixed;
    padding: 16px;

    & > div:first-of-type {
      margin-bottom: 0;
      height: auto;
      padding-top: 8px;
      padding-bottom: 8px;
      top: ${menuIsOpen ? '0' : '-54px'};
      border-bottom: 2.5px solid #000;

      & > ul {
        width: 100%;
        display: flex;
        justify-content: space-between;
        li {
          font-size: ${theme.fontSize.m_bannerSans};
          margin-right: 0px;
        }
      }
    }

    & > div:nth-of-type(2) {
      padding-bottom: 10px;
      margin-bottom: 0;
      height: 54px;
      top: ${searchIsOpen ? '0' : '-54px'};
      label {
        font-family: ${theme.fontFamily.sans}, sans-serif;
        font-size: ${theme.fontSize.m_bannerSans};
        cursor: pointer;

        :hover {
          text-decoration: underline;
        }
      }

      input {
        border-bottom: 2px solid #000;
        font-size: ${theme.fontSize.m_bannerSans};
      }
    }
  }
`;

const HeaderWrapper = (
  menuIsOpen: boolean,
  searchIsOpen: boolean,
  isScrollOver: boolean,
  headerColor: string
) => css`
  display: flex;
  width: calc(100% - 44px);
  background-color: ${headerColor !== '#fff' ? headerColor : '#fff'};
  position: fixed;
  padding-top: 16px;
  z-index: 1;
  padding-bottom: 16px;
  border-bottom: 4px solid #000;
  transition: ease-in 500ms;
  top: ${menuIsOpen || searchIsOpen ? '80px' : '0'};

  & > div:first-of-type {
    width: calc((100% / 12) * 5);
    height: auto;
    padding-right: 20px;

    & > img {
      width: 100%;
      height: 100%;
    }
  }

  & > div:last-of-type {
    width: calc((100% / 12) * 7);
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > div:first-of-type {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      h2 {
        font-family: ${theme.fontFamily.sans}, sans-serif;
        font-size: ${theme.fontSize.smallTitleSans};
        letter-spacing: ${theme.letterSpacing.sans};
        display: ${isScrollOver ? 'none' : 'unset'};
      }

      & > div {
        position: ${isScrollOver ? 'absolute' : 'unset'};
        right: ${isScrollOver ? '0px' : 'unset'};
        display: flex;

        z-index: 10;

        & > div {
          margin-left: ${isScrollOver ? '15px' : '24px'};
          width: ${isScrollOver ? '20px' : '34px'};
          height: ${isScrollOver ? '20px' : '34px'};
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            cursor: pointer;

            :hover {
              filter: invert(100%);
            }
          }
        }

        & > div:last-of-type {
          img {
            transform: ${menuIsOpen ? 'rotate(45deg)' : 'unset'};
            transition: ease-in 500ms;
          }
        }
      }
    }

    & > div:last-of-type {
      width: 100%;
      height: 100%;
      align-self: flex-end;
      justify-self: flex-end;
      display: flex;
      justify-content: ${isScrollOver ? 'flex-start' : 'flex-end'};
      align-items: flex-end;
      position: relative;

      img {
        position: absolute;
        height: ${isScrollOver ? '100%' : 'unset'};
        bottom: ${isScrollOver ? '-20px' : '0'};
        object-fit: contain;
        cursor: pointer;

        :hover {
          filter: invert(100%);
        }
      }
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    flex-direction: column;
    padding-bottom: 0px;
    width: calc(100% - 32px);
    padding-top: 8px;
    top: ${menuIsOpen || searchIsOpen ? '38px' : '0'};
    border-bottom: 2.5px solid #000;

    & > div:first-of-type {
      width: 100%;
      padding-right: 0px;
      padding-bottom: 15px;
      order: 2;
      display: none;
    }

    & > div:last-of-type {
      width: 100%;
      height: 100%;
      order: 1;

      & > div:first-of-type {
        h2 {
          font-size: ${theme.fontSize.m_headerTinyTitle};
        }

        & > div {
          margin-top: 0;
          & > div {
            width: 15px;
            height: 15px;
            margin-left: 0px;
          }
        }
      }

      & > div:last-of-type {
        height: 100%;
        padding-top: 10px;

        img {
          bottom: 0px;
          position: unset;
          margin-bottom: 5px;
        }
      }
      width: 100%;
    }
  }
`;

interface IHeaderProps {
  menuIsOpen: boolean;
  setMenuIsOpen: (open: boolean) => void;
  searchIsOpen: boolean;
  setSearchIsOpen: (open: boolean) => void;
}

type TWhiteBackground = string[];

const Header = ({ menuIsOpen, setMenuIsOpen, searchIsOpen, setSearchIsOpen }: IHeaderProps) => {
  const router = useRouter();
  const [clientWindowHeight, setClientWindowHeight] = React.useState<number>(0);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const [header, setHeaderState] = useRecoilState(headerState);
  const headerHeight = useRecoilValue(headerState);
  const [headerColor, setHeaderColor] = useRecoilState(headerColorState);
  const [windowSize, setWindowSize] = React.useState({
    width: 0,
    height: 0,
  });

  const [headerImageSrc, setHeaderImageSrc] = React.useState(HeaderImage);
  const [isScrollOver, setIsScrollOver] = React.useState(false);

  const fffBackground: TWhiteBackground = [
    '/',
    '/curatorial_practice',
    '/curatorial_practice/ong_jo_lene',
    '/index',
    '/about',
    '/news',
  ];

  React.useEffect(() => {
    if (typeof window != 'undefined') {
      const handleResize = (): void => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        if (headerRef.current != null) setHeaderState(headerRef.current.clientHeight);
      };
      handleResize();

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);

      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [clientWindowHeight, headerHeight]);

  React.useEffect(() => {
    if (fffBackground.indexOf(router.pathname) > -1) setHeaderColor('#fff');
  }, []);

  React.useEffect(() => {
    if (clientWindowHeight > 100) {
      setIsScrollOver(true);
      setHeaderImageSrc(smallHeaderImage);
    } else {
      setIsScrollOver(false);
      setHeaderImageSrc(HeaderImage);
    }
  }, [clientWindowHeight]);

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  return (
    <div css={Container(menuIsOpen, searchIsOpen, headerColor)}>
      <div>
        <ul>
          <Link href="/curatorial_practice">
            <li>1_curatorial_practice</li>
          </Link>
          <Link href="/news">
            <li>2_news</li>
          </Link>
          <Link href="/about">
            <li>3_about</li>
          </Link>
          <Link href="/index">
            <li>4_index</li>
          </Link>
        </ul>
      </div>
      <div>
        <input type="text" placeholder="Enter something beautiful..." />
        <label>Search</label>
      </div>
      <div css={HeaderWrapper(menuIsOpen, searchIsOpen, isScrollOver, headerColor)} ref={headerRef}>
        <div>
          <Image src={headerImageSrc} alt="Header_image" />
        </div>
        <div>
          <div>
            <h2 onClick={() => router.push({ pathname: '/' })}>
              platform_as_a_curatorial_research_lab_for_independent_curators
            </h2>
            <div>
              <div
                onClick={() => {
                  setSearchIsOpen(!searchIsOpen);
                  setMenuIsOpen(false);
                }}
              >
                <Image src={searchIconImage} alt="search_icon" placeholder="blur" />
              </div>
              <div
                onClick={() => {
                  setSearchIsOpen(false);
                  setMenuIsOpen(!menuIsOpen);
                }}
              >
                <Image src={menuIconImage} alt="menu_icon" />
              </div>
            </div>
          </div>
          <div onClick={() => router.push({ pathname: '/' })}>
            <Image src={logoImage} layout="responsive" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
