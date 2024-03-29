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

const styleAnnotation = typedObject.extend({
  _type: z.literal('styleAnnotation'),
  font: z.literal('sans').nullable().optional(),
});
export const StyleMark: PortableTextMarkComponent = ({ value, children }) => {
  const { font } = styleAnnotation.parse(value);
  return (
    <span
      {...(font === 'sans'
        ? {
            className: 'sans',
          }
        : {})}
    >
      {children}
    </span>
  );
};
