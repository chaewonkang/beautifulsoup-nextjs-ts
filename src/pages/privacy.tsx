import React from 'react';
import { css } from '@emotion/react';
import theme from '../styles/theme';

/* comps */
import { PageLayout } from '../../components';

/* states */
import { useRecoilValue, useRecoilState } from 'recoil';
import { headerState, headerColorState } from '../../state/index';

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

const About = (): JSX.Element => {
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
          <div css={TitleHeader}>
            <div>
              <h2>privacy policy</h2>
            </div>
          </div>
          <div css={AboutWrapper(headerHeight)}>
            <div>
              <div></div>
              <div>
                <p>
                  We are committed to maintaining the accuracy, confidentiality, and security of
                  your personally identifiable information ("Personal Information"). As part of this
                  commitment, our privacy policy governs our actions as they relate to the
                  collection, use and disclosure of Personal Information. Our privacy policy is
                  based upon the values set by the Canadian Standards Association's Model Code for
                  the Protection of Personal Information and Canada's Personal Information
                  Protection and Electronic Documents Act. <br />
                  <br />
                  1. Introduction We are responsible for maintaining and protecting the Personal
                  Information under our control. We have designated an individual or individuals who
                  is/are responsible for compliance with our privacy policy.
                  <br /> 2. Identifying Purposes We collect, use and disclose Personal Information
                  to provide you with the product or service you have requested and to offer you
                  additional products and services we believe you might be interested in. The
                  purposes for which we collect Personal Information will be identified before or at
                  the time we collect the information. In certain circumstances, the purposes for
                  which information is collected may be clear, and consent may be implied, such as
                  where your name, address and payment information is provided as part of the order
                  process.
                  <br /> 3. Consent Knowledge and consent are required for the collection, use or
                  disclosure of Personal Information except where required or permitted by law.
                  Providing us with your Personal Information is always your choice. However, your
                  decision not to provide certain information may limit our ability to provide you
                  with our products or services. We will not require you to consent to the
                  collection, use, or disclosure of information as a condition to the supply of a
                  product or service, except as required to be able to supply the product or
                  service.
                  <br /> 4. Limiting Collection The Personal Information collected will be limited
                  to those details necessary for the purposes identified by us. With your consent,
                  we may collect Personal Information from you in person, over the telephone or by
                  corresponding with you via mail, facsimile, or the Internet.
                  <br /> 5. Limiting Use, Disclosure and Retention Personal Information may only be
                  used or disclosed for the purpose for which it was collected unless you have
                  otherwise consented, or when it is required or permitted by law. Personal
                  Information will only be retained for the period of time required to fulfill the
                  purpose for which we collected it or as may be required by law. <br />
                  6. Accuracy Personal Information will be maintained in as accurate, complete and
                  up-to-date form as is necessary to fulfill the purposes for which it is to be
                  used.
                  <br /> 7. Safeguarding Customer Information Personal Information will be protected
                  by security safeguards that are appropriate to the sensitivity level of the
                  information. We take all reasonable precautions to protect your Personal
                  Information from any loss or unauthorized use, access or disclosure. <br />
                  8. Openness We will make information available to you about our policies and
                  practices with respect to the management of your Personal Information.
                  <br /> 9. Customer Access Upon request, you will be informed of the existence, use
                  and disclosure of your Personal Information, and will be given access to it. You
                  may verify the accuracy and completeness of your Personal Information, and may
                  request that it be amended, if appropriate. However, in certain circumstances
                  permitted by law, we will not disclose certain information to you. For example, we
                  may not disclose information relating to you if other individuals are referenced
                  or if there are legal, security or commercial proprietary restrictions.
                  <br /> 10. Handling Customer Complaints and Suggestions You may direct any
                  questions or enquiries with respect to our privacy policy or our practices by
                  contacting: beautifulsoup.org@gmail.com <br />
                  <br />
                  Additional Information Cookies A cookie is a small computer file or piece of
                  information that may be stored in your computer's hard drive when you visit our
                  websites. We may use cookies to improve our website’s functionality and in some
                  cases, to provide visitors with a customized online experience. Cookies are widely
                  used and most web browsers are configured initially to accept cookies
                  automatically. You may change your Internet browser settings to prevent your
                  computer from accepting cookies or to notify you when you receive a cookie so that
                  you may decline its acceptance. Please note, however, if you disable cookies, you
                  may not experience optimal performance of our website. Other Websites Our website
                  may contain links to other third party sites that are not governed by this privacy
                  policy. Although we endeavour to only link to sites with high privacy standards,
                  our privacy policy will no longer apply once you leave our website. Additionally,
                  we are not responsible for the privacy practices employed by third party websites.
                  Therefore, we suggest that you examine the privacy statements of those sites to
                  learn how your information may be collected, used, shared and disclosed.
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
