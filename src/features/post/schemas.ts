import { z } from "zod";

export const MAX_IMAGES = 10;
export const MAX_IMAGE_MB = 10;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const createPostSchema = z.object({
  content: z.string().trim().min(1, "내용은 필수입니다."),
  images: z
    .array(z.instanceof(File))
    .max(MAX_IMAGES, `이미지는 최대 ${MAX_IMAGES}장까지 업로드할 수 있습니다.`)
    .refine(
      (files) => files.every((f) => ACCEPTED_IMAGE_TYPES.includes(f.type)),
      "jpg, png, webp, gif만 업로드 가능합니다."
    )
    .refine(
      (files) => files.every((f) => f.size <= MAX_IMAGE_MB * 1024 * 1024),
      `이미지 용량은 파일당 최대 ${MAX_IMAGE_MB}MB입니다.`
    )
    .optional(),
});

export type CreatePostFormValues = z.infer<typeof createPostSchema>;
