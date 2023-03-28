import { PortableTextListComponent, PortableTextProps } from '@portabletext/react';

import { SuperscriptMark, LinkMark } from './marks';

const NumberedList: PortableTextListComponent = ({ children }) => {
  return (
    <div>
      <span>1</span>
      <span>{children}</span>
    </div>
  );
};

const BulletedList: PortableTextListComponent = ({ children }) => {
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
