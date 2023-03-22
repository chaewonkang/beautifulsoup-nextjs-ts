import { PortableTextBlockComponent } from '@portabletext/react';
import { ComponentProps } from 'react';

type TParagraphProps = ComponentProps<PortableTextBlockComponent> & { align: 'left' | 'center' };
export const Paragraph = ({ children, align }: TParagraphProps) => {
  return (
    <p
      style={{
        textAlign: align === 'left' ? 'left' : 'center',
      }}
    >
      {children}
    </p>
  );
};
