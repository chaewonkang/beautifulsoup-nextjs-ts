import { groq } from 'next-sanity';
import { definePreview, Params, PreviewSuspense } from 'next-sanity/preview';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { z } from 'zod';
import { dataset, projectId } from './config';

const neverQuery = groq`*[_id == 'never'][0] {}`;

let alerted = false;
export const usePreview = definePreview({
  projectId,
  dataset,
  onPublicAccessOnly: () => {
    // You can opt to throw an error here instead of using `window.alert`, and customize how it displays by wrapping the component calling `usePreview` in an ErrorBoundary
    // https://reactjs.org/docs/error-boundaries.html
    if (!alerted) {
      // eslint-disable-next-line no-alert
      alert('You are not logged in. You will only see public data.');
      alerted = true;
    }
  },
  documentLimit: Infinity,
});

interface IProps {
  previewToken?: string | null;
  previewError?: true | null;
  query?: string;
  params?: Params;
  schema?: z.Schema;
  children: (data: any) => JSX.Element;
}

const WithPreview = ({ query, params, schema, children, previewToken, previewError }: IProps) => {
  if (previewError) return <PreviewErrorScreen />;

  return previewToken ? (
    <PreviewSuspense fallback="Loading...">
      <ErrorBoundary FallbackComponent={PreviewErrorScreen}>
        <PreviewInner previewToken={previewToken} query={query} params={params} schema={schema}>
          {children}
        </PreviewInner>
      </ErrorBoundary>
      <ExitPreviewButton />
    </PreviewSuspense>
  ) : (
    children({})
  );
};
export default WithPreview;

interface IPreviewInnerProps {
  previewToken: string;
  query?: string;
  params?: Params;
  schema?: z.Schema;
  children: (data: any) => JSX.Element;
}

const PreviewInner = ({ previewToken, query, params, schema, children }: IPreviewInnerProps) => {
  const pagePreviewProps = usePreview(previewToken, query ?? neverQuery, params);
  if (schema) schema.parse(pagePreviewProps);
  return children(pagePreviewProps);
};

const ExitPreviewButton = () => {
  return (
    <Link
      style={{
        position: 'fixed',
        bottom: '8px',
        right: '8px',
        backgroundColor: '#fff',
        padding: '4px 8px',
        border: '1px solid #000',
        cursor: 'pointer',
      }}
      type="button"
      href="/api/exit-preview"
    >
      Exit Preview
    </Link>
  );
};

// const Redirect = () => {
//   const router = useRouter();
//   useEffect(() => {
//     router.replace('/preview-error');
//   }, [router]);
//   return null;
// };

export const PreviewErrorScreen = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        lineHeight: 1.5,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      미리보기 데이터에 문제가 있습니다.
      <br />
      필수 필드가 모두 작성되었는지 확인해주세요.
    </div>
  );
};

export type TWithPreviewProps<T> =
  | (T & {
      previewError?: never;
      previewToken: string | null;
    })
  | {
      previewError: true;
      previewToken?: never;
    };
