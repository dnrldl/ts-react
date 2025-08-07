// export interface Post {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// }

export interface Post {
  id: number;
  content: string;
  authorNickname: string;
  commentCount: number;
  likeCount: number;
  shareCount: number;
  isLiked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: number;
  content: string;
  authorNickname: string;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
}
