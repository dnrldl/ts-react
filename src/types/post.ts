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
