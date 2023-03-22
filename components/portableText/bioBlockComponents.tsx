import { PortableTextProps } from '@portabletext/react';
import { Paragraph } from './blocks';
import { SuperscriptMark, LinkMark } from './marks';

const bioBlockComponents: PortableTextProps['components'] = {
  marks: {
    externalLinkAnnotation: LinkMark,
    sup: SuperscriptMark,
  },
};
export default bioBlockComponents;
