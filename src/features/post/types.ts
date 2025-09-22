export interface Post {
  id: number;
  content: string;
  thumbnailUrl?: string;
  imageUrls?: string[];
  authorNickname: string;
  commentCount: number;
  likeCount: number;
  shareCount: number;
  isLiked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostImage {
  storageKey: string;
  url: string;
  width?: number;
  height?: number;
  bytes?: number;
  mimeType?: string;
  orderIndex: number;
  isThumbnail: boolean;
}

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

export type Usage = "POST_IMAGE" | "USER_PROFILE_IMAGE";

export interface FileMeta {
  originalFileName: string;
  sizeBytes: number;
}

export interface PresignRequest {
  usage: Usage;
  pathPrefilx?: string;
  files: FileMeta[];
}

export interface PresignResponse {
  key: string;
  presignedUrl: string;
  fileUrl: string;
  contentType: string;
  requiredHeaderOriginalName: string;
}

// presigned URL이 PUT 방식이라고 가정
export interface UploadTarget {
  key: string; // s3 object key (서버가 생성)
  presignedUrl: string; // PUT URL
  contentType: string;
}

export type FileInputRef =
  | React.RefObject<HTMLInputElement | null>
  | React.MutableRefObject<HTMLInputElement | null>;
