import React, { ComponentProps, useEffect, useMemo } from 'react';
import '@/styles/globals.css';
import '@/styles/fonts.css';
import '@/styles/base.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import * as gtag from '../lib/ga/gtag';
import Script from 'next/script';
import Head from 'next/head';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { TPageCommonProps } from 'interfaces';
import { PreviewSuspense } from 'next-sanity/preview';
import Preview from '@/sanity/Preview';
import { routes } from '@/lib/constants';
import {
  aboutPageQuery,
  curatorialPracticePageQuery,
  indexPageQuery,
  landingPageQuery,
  projectPageQuery,
  workPageQuery,
} from '@/sanity/queries';
import {
  aboutPageData,
  curatorialPracticePageData,
  indexPageData,
  landingPageData,
  projectPageData,
  workPageData,
} from '@/schemas';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps<TPageCommonProps>) {
  const router = useRouter();

  const { pathname, query } = router;
  const { previewToken } = pageProps;

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Head>
        <link rel="shortcut icon" href="/images/favicon.png" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RecoilRoot>
          {previewToken ? (
            <Preview
              previewToken={previewToken}
              {...(pathname === routes.landing
                ? { query: landingPageQuery, schema: landingPageData }
                : pathname === routes.about
                ? { query: aboutPageQuery, schema: aboutPageData }
                : pathname === routes.curatorialPractice
                ? { query: curatorialPracticePageQuery, schema: curatorialPracticePageData }
                : pathname === routes.project.pathname
                ? {
                    query: projectPageQuery,
                    params: { projectSlug: query.curator },
                    schema: projectPageData,
                  }
                : pathname === routes.work.pathname
                ? {
                    query: workPageQuery,
                    params: { projectSlug: query.curator, workSlug: query.id },
                    schema: workPageData,
                  }
                : pathname === routes.index
                ? { query: indexPageQuery, schema: indexPageData }
                : {})}
            >
              {(pagePreviewProps) => <Component {...pageProps} {...pagePreviewProps} />}
            </Preview>
          ) : (
            <Component {...pageProps} />
          )}
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}
