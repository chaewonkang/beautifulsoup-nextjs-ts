import { typedObject } from '@/schemas';
import { PortableTextMarkComponent } from '@portabletext/react';
import { z } from 'zod';

export const SuperscriptMark: PortableTextMarkComponent = ({ children }) => {
  return <sup>{children}</sup>;
};

const externalLinkAnnotation = typedObject.extend({
  _type: z.literal('externalLinkAnnotation'),
  url: z.string(),
  newWindow: z.boolean(),
});
export const LinkMark: PortableTextMarkComponent = ({ value, children }) => {
  const { url, newWindow } = externalLinkAnnotation.parse(value);
  return (
    <a
      href={url}
      {...(newWindow
        ? {
            target: '_blank',
            rel: 'noopener noreferrer',
          }
        : {})}
    >
      {children}
    </a>
  );
};
