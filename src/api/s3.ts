import axios from "axios";
import { axiosInstance } from "shared/axios/axiosInstance";

type Usage = "POST_IMAGE" | "USER_PROFILE_IMAGE";

interface PresignRequest {
  usage: Usage;
  pathPrefilx?: string;
  files: FileMeta[];
}

interface FileMeta {
  originalFileName: string;
  sizeBytes: number;
}

interface PresignResponse {
  key: string;
  presignedUrl: string;
  fileUrl: string;
  contentType: string;
  requiredHeaderOriginalName: string;
}

/**
 * 여러 파일에 대한 presigned URL 요청
 * @param usage - 파일 용도(ex: 'POST_IMAGE', 'USER_PROFILE_IMAGE' 등)
 * @param files - 업로드할 실제 File 객체 배열
 * @param pathPrefix - 경로 prefix (선택)
 */
export const getMultiplePresignedUrls = (
  usage: Usage,
  files: globalThis.File[],
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

export const putImagesOnS3 = async (presignedUrl: string, file: File) =>
  await axios.put(presignedUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
