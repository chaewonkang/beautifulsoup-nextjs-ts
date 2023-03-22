export interface IArtistBannerProps {
  name: string;
  pathname: string;
  isCurator: boolean;
  colorCode: string;
  curatorName: string;
}

export interface INoteProps {
  index: number;
  content: string;
}

export type TPageCommonProps = {
  //
};

// Prevent props type error
export type TRedirectProps = {
  redirect: true;
};
