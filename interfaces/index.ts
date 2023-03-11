export interface IArtistBannerProps {
  name: string;
  pathname: string;
  isCurator: boolean;
  colorCode: string;
}

export interface INoteProps {
  index: number;
  content: string;
}

export interface IParams {
  [key: string]: string;
}

export interface IPreviewData {
  previewToken: string;
}

export type TPageCommonProps = {
  previewToken: string | null;
};
