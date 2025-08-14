import { createTRPCRouter } from "@/server/api/trpc";
import { createUploadSignedUrl } from "@/server/api/routers/influencer/features/avatar/create-upload-url/api";
import { uploadComplete } from "@/server/api/routers/influencer/features/avatar/upload-complete/api";
import { getAvatar } from "@/server/api/routers/influencer/features/avatar/get/api";

export const avatarRouter = createTRPCRouter({
  createUploadSignedUrl: createUploadSignedUrl,
  uploadComplete: uploadComplete,
  get: getAvatar,
});
