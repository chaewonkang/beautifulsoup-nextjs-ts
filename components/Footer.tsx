import React from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import theme from '../src/styles/theme';
import Image from 'next/image';

import footerLogoImage from '../public/images/footer.png';
import NewsLetterSubmit from './NewsLetterSubmit';

const Container = css`
  width: 100%;
  padding-left: 22px;
  padding-right: 22px;

  & > div:last-of-type {
    border-top: 4px solid #000;
    margin-top: 16px;
    padding-top: 16px;
    padding-bottom: 16px;
    display: flex;

    & > div:first-of-type {
      width: calc((100% / 12) * 2);
      margin-right: 16px;
      img {
        width: 100%;
      }
    }

    & > div:nth-of-type(2) {
      width: calc((100% / 12) * 7);
      height: auto;
      display: flex;
      align-items: flex-end;

      h3 {
        margin-right: 22px;
        font-family: ${theme.fontFamily.sans}, sans-serif;
        font-size: ${theme.fontSize.m_headerMenu};
        line-height: ${theme.lineHeight.m_headerMenu};

        span {
          font-family: ${theme.fontFamily.serif}, serif;
          font-size: ${theme.fontSize.m_headerMenu};
          line-height: ${theme.lineHeight.m_headerMenu};
        }
      }

      h4 {
        font-family: ${theme.fontFamily.sans}, sans-serif;
        font-size: ${theme.fontSize.m_headerMenu};
        line-height: ${theme.lineHeight.m_headerMenu};
      }
    }

    & > div:last-of-type {
      width: calc((100% / 12) * 3);
      display: flex;

      ul {
        width: 33.3%;
        text-align: right;
        font-family: ${theme.fontFamily.sans}, sans-serif;
        font-size: ${theme.fontSize.m_headerMenu};
        line-height: 24px;

        li {
          cursor: pointer;
          :hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    padding-left: 16px;
    padding-right: 16px;

    & > div:last-of-type {
      margin-top: 0px;
      padding-top: 15px;
      border-top: 2.5px solid #000;
      padding-bottom: 15px;
      flex-wrap: wrap;
      & > div:first-of-type {
        width: 50%;
        padding-right: 10px;
        margin-right: 0;
        order: 1;
      }
      & > div:nth-of-type(2) {
        order: 3;
        width: 100%;
        flex-direction: column;
        margin-top: 15px;
        align-items: flex-start;
      }
      & > div:last-of-type {
        width: 50%;
        order: 2;
        display: flex;
        flex-wrap: wrap;

        ul {
          text-align: left;
        }

        ul:first-of-type {
          width: 50%;
          order: 1;
        }

        ul:nth-of-type(2) {
          width: 50%;
          order: 3;
        }

        ul:last-of-type {
          width: 50%;
          order: 2;
        }
      }
    }
  }
`;

const Footer = () => {
  const router = useRouter();
  return (
    <div css={Container}>
      <NewsLetterSubmit />
      <div>
        <div>
          <Image src={footerLogoImage} layout="intrinsic" alt="footer_logo" />
        </div>
        <div>
          <h3>
            © 2022 <span>beautiful</span>_soup and the author
          </h3>
          <h4>
            design and development by{' '}
            <a href="https://instagram.com/yfactorial" target="_blank">
              y!
            </a>
          </h4>
        </div>
        <div>
          <ul>
            <li
              onClick={() =>
                router.push({
                  pathname: '/about',
                })
              }
            >
              About
            </li>
            <li>Privacy Policy</li>
            <li>Institutions</li>
          </ul>
          <ul>
            <li>Contact</li>
          </ul>
          <ul>
            <li>
              <a href="https://instagram.com/beautifulsoup.official" target="_blank">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
