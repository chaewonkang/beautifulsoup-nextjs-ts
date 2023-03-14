import { urlFor } from '@/lib/helpers';
import { TContentSection } from '@/schemas';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import { Fragment } from 'react';

interface IProps {
  contentSection: TContentSection;
  components?: Partial<PortableTextReactComponents>;
}
const ContentSection = ({ contentSection: { images, text }, components }: IProps) => {
  return (
    <div>
      <div>
        {images?.map(({ image, alt, caption }, idx) => (
          <Fragment key={idx}>
            <img src={urlFor(image).url()} alt={alt ?? undefined} />
            {caption && <div>{caption}</div>}
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
