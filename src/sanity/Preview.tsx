import { definePreview, Params, PreviewSuspense } from 'next-sanity/preview';
import Link from 'next/link';
import { ErrorBoundary } from 'react-error-boundary';
import { z } from 'zod';
import { dataset, projectId } from './config';

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
  previewToken: string;
  children: (data: any) => JSX.Element;
  query?: string;
  params?: Params;
  schema?: z.Schema;
}

const Preview = ({ children, previewToken, query, params, schema }: IProps) => {
  return query ? (
    <PreviewSuspense fallback="Loading...">
      <ErrorBoundary FallbackComponent={ErrorScreen}>
        <PreviewInner previewToken={previewToken} query={query} params={params} schema={schema}>
          {children}
        </PreviewInner>
      </ErrorBoundary>
      <ExitPreviewButton />
    </PreviewSuspense>
  ) : (
    <div>No matching query for this preview.</div>
  );
};

interface IPreviewInnerProps {
  previewToken: string;
  children: (data: any) => JSX.Element;
  query: string;
  params?: Params;
  schema?: z.Schema;
}

const PreviewInner = ({ previewToken, children, query, params, schema }: IPreviewInnerProps) => {
  const pagePreviewProps = usePreview(previewToken, query, params);
  if (schema) schema.parse(pagePreviewProps);
  return children(pagePreviewProps);
};
export default Preview;

const ExitPreviewButton = () => {
  return (
    <Link
      // className="fixed bottom-2 right-2 px-3 py-1 z-50 rounded-sm bg-neutral-200 border border-neutral-500"
      type="button"
      href="/api/exit-preview"
      style={{
        position: 'fixed',
        bottom: '8px',
        right: '8px',
        backgroundColor: '#fff',
        padding: '4px 8px',
        border: '1px solid #000',
        cursor: 'pointer',
      }}
    >
      Exit Preview
    </Link>
  );
};

const ErrorScreen = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
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
