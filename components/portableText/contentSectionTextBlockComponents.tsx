import { PortableTextProps } from '@portabletext/react';
import { Paragraph } from './blocks';
import { SuperscriptMark, LinkMark, StyleMark } from './marks';

const contentSectionTextBlockComponents: PortableTextProps['components'] = {
  marks: {
    externalLinkAnnotation: LinkMark,
    styleAnnotation: StyleMark,
    sup: SuperscriptMark,
  },
  block: {
    normal: (props) => <Paragraph align="left" {...props} />,
    normalAlignCenter: (props) => <Paragraph align="center" {...props} />,
  },
};
export default contentSectionTextBlockComponents;
