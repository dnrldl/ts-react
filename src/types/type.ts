// export interface Post {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// }

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

export interface Comment {
  id: number;
  content: string;
  authorNickname: string;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
}
