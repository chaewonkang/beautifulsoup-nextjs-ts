import { urlFor } from '@/lib/helpers';
import { TContentSection } from '@/schemas';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import { Fragment } from 'react';

interface IProps {
  contentSection: TContentSection;
  components?: Partial<PortableTextReactComponents>;
}
const ContentSection = ({ contentSection: { images, text }, components }: IProps) => {
  const parse = require('html-react-parser');
  return (
    <div>
      <div>
        {images?.map(({ image, alt, caption }, idx) => (
          <Fragment key={idx}>
            <img src={urlFor(image).url()} alt={alt ?? undefined} />
            {caption && <span>{parse(caption)}</span>}
          </Fragment>
        ))}
      </div>
      <div>
        <PortableText value={text} components={components} />
      </div>
    </div>
  );
};

export default ContentSection;
