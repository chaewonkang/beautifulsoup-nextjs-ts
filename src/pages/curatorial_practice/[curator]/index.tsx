import React from 'react';
import { css, keyframes } from '@emotion/react';
import theme from '../../../styles/theme';
import { useRouter } from 'next/router';
import { PortableText } from '@portabletext/react';

/* comps */
import { PageLayout, ArtistBanner } from 'components';
import ContentSection from 'components/ContentSection';
import contentSectionTextBlockComponents from 'components/portableText/contentSectionTextBlockComponents';
import bioBlockComponents from 'components/portableText/bioBlockComponents';
import noteBlockComponents from 'components/portableText/noteBlockComponents';

/* states */
import { useRecoilValue, useRecoilState } from 'recoil';
import { headerState, headerColorState } from '../../../../state/index';

/* interfaces */
import type { TPageCommonProps } from '../../../../interfaces/index';
import { GetStaticPaths, GetStaticProps } from 'next';
import { projectPageQuery } from '@/sanity/queries';
import { publicClient } from '@/sanity/publicClient';
import { projectPageDataNullable, TProjectPageData } from '@/schemas';
import { sanityEditorToken } from '@/lib/serverEnvs';

import { TWithPreviewProps } from '@/sanity/WithPreview';

import Marquee from 'react-fast-marquee';

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

      & > span,
      & > p {
        em {
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

        em {
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
      display: flex;
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

const AttachmentContainer = css`
  width: 100%;
  border-top: 4px dashed #000;
  height: auto;
  display: flex;
  padding-top: 16px;
  padding-bottom: 16px;

  & > div:first-of-type {
    width: calc((100% / 12) * 4);
    span {
      font-family: ${theme.fontFamily.serif}, serif !important;
      font-size: ${theme.fontSize.bodySerif} !important;
      line-height: ${theme.lineHeight.bodySerif} !important;
      letter-spacing: ${theme.letterSpacing.serif} !important;
    }
  }

  & > div:last-of-type {
    width: calc((100% / 12) * 8);
    display: flex;
    flex-direction: column;
    :hover {
      opacity: 0.5;
    }

    & > div {
      display: flex;
      align-items: center;
      width: 100%;
      font-family: ${theme.fontFamily.sans}, sans-serif;
      font-size: ${theme.fontSize.smallBodySans};
      line-height: ${theme.lineHeight.smallBodySans};
      letter-spacing: ${theme.letterSpacing.sans};
      cursor: pointer;
      height: 40px;

      :hover {
        opacity: 0.5;
      }

      span {
        width: calc(100% - 32px);
        text-decoration: underline;
      }

      img {
        width: 20px !important;
        margin-left: 12px;
        object-fit: contain;
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

      span {
        width: calc(100% - 25px);
        text-decoration: underline;
      }

      img {
        width: 15px;
        margin-left: 10px;
        object-fit: contain;
      }
    }
  }
`;

type TProps = TPageCommonProps & TProjectPageData;

const id = ({ project }: TProps): JSX.Element => {
  const headerHeight = useRecoilValue(headerState);
  const [headerColor, setHeaderColor] = useRecoilState(headerColorState);
  const router = useRouter();
  const id = router.query.curator as string;

  setHeaderColor('#fff');

  function handleFileDownload(url: string, filename: string) {
    fetch(url).then(function (t) {
      return t.blob().then((b) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(b);
        a.setAttribute('download', filename);
        a.click();
      });
    });
  }

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
                <Marquee pauseOnHover speed={5} gradient={false}>
                  <h3>{id}</h3>
                </Marquee>
              </div>
              <div>
                <Marquee pauseOnHover speed={5} gradient={false}>
                  <h3>
                    <span>
                      {project.tags.length > 1
                        ? project.tags.map((tag) => {
                            if (project.tags.indexOf(tag) < project.tags.length - 1)
                              return tag.title + '+';
                            else return tag.title;
                          })
                        : project.tags.map((tag) => {
                            return tag.title;
                          })}
                    </span>
                    _{project.title}
                  </h3>
                </Marquee>
              </div>
            </div>
            <div css={ContentWrapper}>
              {project.content?.map((contentSection, idx) => (
                <ContentSection
                  key={idx}
                  contentSection={contentSection}
                  components={contentSectionTextBlockComponents}
                />
              ))}
            </div>
            {project.note && (
              <div css={NoteContainer}>
                <div>
                  <span>Note</span>
                </div>
                <div>
                  <PortableText value={project.note} components={noteBlockComponents} />
                </div>
              </div>
            )}
            <div css={BioContainer}>
              <div>
                <span>Bio</span>
              </div>
              <div>
                {project.bio && (
                  <PortableText value={project.bio} components={bioBlockComponents} />
                )}
              </div>
            </div>
            {project.attachments && (
              <div css={AttachmentContainer}>
                <div>
                  <span>Attachment</span>
                </div>
                <div>
                  {project.attachments.map((attachment) => {
                    return (
                      <div key={attachment.title}>
                        <span
                          onClick={() => handleFileDownload(attachment.file.url, attachment.title)}
                        >
                          {attachment.title}
                        </span>
                        <img src="/images/download.png" alt="download" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {project.works &&
              project.works.map((el, _i) => (
                <ArtistBanner
                  key={_i}
                  curatorName={project.slug}
                  name={el.artistName}
                  pathname={el.slug}
                  colorCode={el.color}
                  isCurator={false}
                />
              ))}
          </div>
        </div>
      </PageLayout>
    </React.Fragment>
  );
};

export default id;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<TWithPreviewProps<TProps>> = async (ctx) => {
  const { preview, params } = ctx;

  const projectSlug = params?.curator;
  if (typeof projectSlug !== 'string') throw new Error('never');

  try {
    const { project } = projectPageDataNullable.parse(
      await publicClient.fetch(
        projectPageQuery,
        { projectSlug },
        { token: preview ? sanityEditorToken : undefined }
      )
    );
    if (!project) return { notFound: true };
    return {
      props: {
        previewToken: preview ? sanityEditorToken : null,
        project,
      },
    };
  } catch (err) {
    return {
      props: { previewError: true },
    };
  }
};
