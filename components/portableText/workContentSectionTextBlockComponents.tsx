import { typedObject } from '@/schemas';
import { PortableTextProps } from '@portabletext/react';
import { z } from 'zod';
import { Paragraph } from './blocks';
import { SuperscriptMark, LinkMark } from './marks';

interface IVideoEmbedProps {
  videoUrl: string;
}
const VideoEmbed = ({ videoUrl }: IVideoEmbedProps) => {
  // Test
  console.log(videoUrl);
  return (
    <div>
      <iframe
        src={videoUrl}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="SULLAE EXCERPT SINGLE-CHANNEL"
      ></iframe>
    </div>
  );
};

const workContentSectionTextComponent = z.discriminatedUnion('type', [
  typedObject.extend({ type: z.literal('videoEmbed'), videoUrl: z.string() }),
  typedObject.extend({ type: z.literal('test'), videoUr: z.string() }),
  // ...
]);

const workContentSectionTextBlockComponents: PortableTextProps['components'] = {
  marks: {
    externalLinkAnnotation: LinkMark,
    sup: SuperscriptMark,
  },
  block: {
    normal: (props) => <Paragraph align="left" {...props} />,
    normalAlignCenter: (props) => <Paragraph align="center" {...props} />,
  },
  types: {
    workContentSectionTextComponent: ({ value }) => {
      const { type, videoUrl } = workContentSectionTextComponent.parse(value);
      if (type === 'videoEmbed') return <VideoEmbed videoUrl={videoUrl} />;
      return null;
    },
  },
};
export default workContentSectionTextBlockComponents;
