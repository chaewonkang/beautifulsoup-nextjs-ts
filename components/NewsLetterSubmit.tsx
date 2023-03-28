import React from 'react';
import { css } from '@emotion/react';
import theme from '../src/styles/theme';
import { getData } from '../src/lib/api/getData';

const Container = css`
  width: 100%;
  height: 110px;
  display: flex;
  border-top: 2.5px solid #000;
  align-items: flex-end;

  & > div:first-of-type {
    width: fit-content;
    align-items: flex-end;
    font-family: ${theme.fontFamily.serif}, serif;
    font-size: ${theme.fontSize.newsLetterSerif};
    line-height: 90px;
    margin-right: 22px;
  }

  & > div:nth-of-type(2) {
    display: flex;
    align-items: flex-end;
    flex: 1 0 0;
    margin-right: 22px;
    position: relative;

    input {
      width: 100%;
      border-bottom: 6px solid #000;
    }
  }

  & > div:last-of-type {
    width: fit-content;
    font-family: ${theme.fontFamily.sans}, sans-serif;
    font-size: ${theme.fontSize.newsletterSans};
    letter-spacing: -0.41px;
    line-height: ${theme.fontSize.newsletterSans};
    cursor: pointer;

    :hover {
      opacity: 0.5;
    }
  }

  @media only screen and (max-width: ${theme.size.mobile}) {
    height: auto;
    align-items: flex-end;
    padding-bottom: 10px;
    padding-top: 10px;

    & > div:first-of-type {
      font-size: ${theme.fontSize.smallBodySerif};
      line-height: ${theme.fontSize.smallBodySerif};
    }

    & > div:nth-of-type(2) {
      display: flex;
      align-items: flex-end;
      flex: 1 0 0;
      height: auto;
      margin-right: 0;
      position: relative;

      input {
        width: 100%;
        height: auto;
        border-bottom: 1px solid #000;
      }
    }

    & > div:last-of-type {
      font-size: ${theme.fontSize.smallBodySans};
      line-height: ${theme.fontSize.smallBodySans};
    }
  }
`;

const NewsLetterSubmit = () => {
  const [submitMessage, setSubmitMessage] = React.useState('submit');
  const [email, setEmail] = React.useState<string>('');

  const onChange = (e: any) => {
    const { value } = e.target;

    setEmail(value);
  };

  async function handler() {
    try {
      const data = await getData();
      const sheet = await data.sheetsByIndex[0];
      const newsletter = sheet.addRow({
        timestamp: new Date(),
        email: email,
      });

      setSubmitMessage('submitted!');
      setEmail('');
    } catch (error) {}
  }

  return (
    <div css={Container}>
      <div>
        <span>newsletter</span>
      </div>
      <div>
        <input onChange={onChange} value={email} type="text" placeholder="Enter email" />
      </div>
      <div onClick={() => handler()}>
        <span>{submitMessage}</span>
      </div>
    </div>
  );
};

export default NewsLetterSubmit;

export async function getServerSideProps() {
  const data = await getData();
  const sheet = await data.sheetsByIndex[0];

  return {
    props: { sheet },
  };
}
