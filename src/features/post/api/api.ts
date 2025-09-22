import axios from "axios";
import { postEndpoints } from "features/post/api/endpoints";
import {
  CreatePostReqeust,
  ImageRegisterRequest,
  Post,
  PostCondition,
  PresignRequest,
  PresignResponse,
  Usage,
} from "features/post/types";
import { axiosInstance } from "shared/axios/axiosInstance";
import { Page } from "shared/types/common";
import { buildQueryString } from "utils/urlUtils";

//
export const fetchPostsApi = async (data: PostCondition): Promise<Page<Post>> =>
  axiosInstance.get(postEndpoints.fetchPosts.path + buildQueryString(data));

export const fetchPostDetailApi = async (postId: number): Promise<Post> =>
  axiosInstance.get(postEndpoints.fetchPostDetail.path(postId));

export const likePostApi = async (postId: number) =>
  axiosInstance.post(postEndpoints.likePost.path(postId));

export const unlikePostApi = async (postId: number) =>
  axiosInstance.post(postEndpoints.unlikePost.path(postId));

export const registerPostImageApi = (
  postId: number,
  payload: ImageRegisterRequest[]
) =>
  axiosInstance.post<void>(
    postEndpoints.registerPostImage.path(postId),
    payload
  );

// 게시글 생성
export const createPostApi = async (data: CreatePostReqeust) =>
  axiosInstance.post(postEndpoints.createPost.path, data);

/**
 * 여러 파일에 대한 presigned URL 요청
 * @param usage - 파일 용도(ex: 'POST_IMAGE', 'USER_PROFILE_IMAGE' 등)
 * @param files - 업로드할 실제 File 객체 배열
 * @param pathPrefix - 경로 prefix (선택)
 */
export const fetchPresignedUrlsApi = (
  usage: Usage,
  files: File[],
  pathPrefix?: string
) => {
  const request: PresignRequest = {
    usage,
    pathPrefilx: pathPrefix,
    files: files.map((file) => ({
      originalFileName: file.name,
      sizeBytes: file.size,
    })),
  };

  return axiosInstance.post<PresignResponse[]>("/uploads/presign", request);
};

export const uploadToS3 = async (presignedUrl: string, file: File) =>
  await axios.put(presignedUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
