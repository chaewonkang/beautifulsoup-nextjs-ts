import { PortableTextProps } from '@portabletext/react';
import { Paragraph } from './blocks';
import { SuperscriptMark, LinkMark } from './marks';

const contentSectionTextBlockComponents: PortableTextProps['components'] = {
  marks: {
    externalLinkAnnotation: LinkMark,
    sup: SuperscriptMark,
  },
  block: {
    normal: (props) => <Paragraph align="left" {...props} />,
    normalAlignCenter: (props) => <Paragraph align="center" {...props} />,
  },
};
export default contentSectionTextBlockComponents;
