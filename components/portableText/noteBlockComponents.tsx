import { PortableTextListComponent, PortableTextProps } from '@portabletext/react';
import { Paragraph } from './blocks';
import { SuperscriptMark, LinkMark } from './marks';

const NumberedList: PortableTextListComponent = ({ children }) => {
  console.log(children);

  return (
    <div>
      <span>1</span>
      <span>{children}</span>
    </div>
  );
};

const BulletedList: PortableTextListComponent = ({ children }) => {
  console.log(children);
  return (
    <div>
      <span>{children}</span>
    </div>
  );
};

const noteBlockComponents: PortableTextProps['components'] = {
  marks: {
    externalLinkAnnotation: LinkMark,
    sup: SuperscriptMark,
  },
  list: {
    number: NumberedList,
    bullet: BulletedList,
  },
};
export default noteBlockComponents;
