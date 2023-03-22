import React from 'react';
import { css } from '@emotion/react';

import theme from '../../src/styles/theme';
import { useRouter } from 'next/router';

const SlideShow = css`
  width: 100% !important;
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
  position: absolute;
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

const Container = css`
  padding: 0;
`;

const SliderLen = 56;

type TNinaBook = {
  left: string;
  right: string;
};

const pageArray: TNinaBook[] = [];

for (let i = 0; i < 55; i++) {
  pageArray[i] = {
    left: `/images/ninaDjekic/book_${i * 2}.jpg`,
    right: `/images/ninaDjekic/book_${i * 2 + 1}.jpg`,
  };
}

const NinaDjekic = (): JSX.Element => {
  const [index, setIndex] = React.useState(0);

  return (
    <div css={Container}>
      <div css={SlideShow}>
        <div css={ArrowBox}>
          <div
            onClick={() => {
              if (index < SliderLen && 0 < index) setIndex(index - 1);
              else if (index === 0) setIndex(SliderLen - 1);
              else setIndex(0);
            }}
          >
            <img src="/images/arrowLeft.png" alt="왼쪽 화살표" />
          </div>
          <div
            onClick={() => {
              if (index === SliderLen - 1) setIndex(0);
              else if (index >= 0 && index < SliderLen) setIndex(index + 1);
              else setIndex(0);
            }}
          >
            <img src="/images/arrowRight.png" alt="오른쪽 화살표" />
          </div>
        </div>
        <div
          css={Slider}
          style={{
            transform: `translate3d(${-index * 100}%, 0, 0)`,
          }}
        >
          {pageArray &&
            pageArray.map((el) => {
              return (
                <div css={Slide} key={el.left + el.right}>
                  <div>
                    <img src={el.left} alt="left_page" />
                  </div>
                  <div>
                    <img src={el.right} alt="right_page" />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default NinaDjekic;
