import React, { ComponentProps, useEffect, useMemo } from 'react';
import '@/styles/globals.css';
import '@/styles/fonts.css';
import '@/styles/base.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import * as gtag from '../lib/ga/gtag';
import Script from 'next/script';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { TPageCommonProps } from 'interfaces';
import { gaTrackingId } from '@/lib/clientEnvs';
import WithPreviewByPathname from 'components/WithPreviewByPathname';

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
        src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaTrackingId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Head>
        <link rel="shortcut icon" href="/images/favicon.png" />
      </Head>

      <RecoilRoot>
        <WithPreviewByPathname previewToken={previewToken}>
          {(previewProps) => <Component {...pageProps} {...previewProps} />}
        </WithPreviewByPathname>
      </RecoilRoot>
    </>
  );
}
