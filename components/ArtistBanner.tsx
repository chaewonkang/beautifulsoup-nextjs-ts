import { css } from '@emotion/react';
import theme from '../src/styles/theme';
import Image from 'next/image';
import Link from 'next/link';
import type { IArtistBannerProps } from '../interfaces/index';

/* images */
import ArrowRight from '../public/images/arrowRight.png';
import ArrowLeft from '../public/images/arrowLeft.png';

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

const ArtistBannerComponent = ({
  name,
  pathname,
  isCurator,
  colorCode,
}: IArtistBannerProps): JSX.Element => {
  return (
    <div css={ArtistBanner(colorCode)}>
      <div>
        {isCurator ? (
          <Link href={`/curatorial_practice/${pathname}`}>
            <span>{name}</span>
          </Link>
        ) : (
          <Link href={`/curatorial_practice/chang_eunha/${pathname}`}>
            <span>{name}</span>
          </Link>
        )}
      </div>
      <div>
        {isCurator ? (
          <Image src={ArrowLeft} alt="arrow_left" />
        ) : (
          <Image src={ArrowRight} alt="arrow_right" />
        )}
      </div>
    </div>
  );
};

export default ArtistBannerComponent;
