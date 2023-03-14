import { PortableTextListComponent, PortableTextProps } from '@portabletext/react';
import { Paragraph } from './blocks';
import { SuperscriptMark, LinkMark } from './marks';

const NumberedList: PortableTextListComponent = ({ children }) => {
  return <ol>{children}</ol>;
};

const BulletedList: PortableTextListComponent = ({ children }) => {
  return <ul>{children}</ul>;
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
