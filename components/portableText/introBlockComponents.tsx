import { PortableTextProps } from '@portabletext/react';
import { Paragraph } from './blocks';
import { SuperscriptMark, LinkMark } from './marks';

const introBlockComponents: PortableTextProps['components'] = {
  marks: {
    externalLinkAnnotation: LinkMark,
    sup: SuperscriptMark,
  },
};
export default introBlockComponents;
