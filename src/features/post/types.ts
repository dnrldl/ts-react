export type SortByOption =
  | "createdAt"
  | "likeCount"
  | "commentCount"
  | "shareCount";

export type DirectionType = "asc" | "desc";

export interface PostCondition {
  page: number;
  size: number;
  mineOnly?: boolean;
  sortBy?: SortByOption;
  direction?: DirectionType;
}

export interface CreatePostReqeust {
  content: string;
}

export type ImageRegisterRequest = {
  storageKey: string;
  url: string;
  width?: number;
  height?: number;
  bytes?: number;
  mimeType?: string;
  orderIndex: number;
  isThumbnail: boolean;
};
