import type { INoteProps } from '../interfaces/index';

const EachNoteComponent = ({ index, content }: INoteProps): JSX.Element => {
  return (
    <div>
      <span>{index.toString()}</span>
      <span>{content}</span>
    </div>
  );
};

export default EachNoteComponent;
