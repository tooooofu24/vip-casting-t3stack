"use client";

import { InfluencerAvatarForm } from "@/app/influencer/(public)/register/(components)/InfluencerAvatarForm";
import { showErrorToast, showSuccessToast } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import { type CreateUploadSignedUrlRequest } from "@/server/api/routers/influencer/features/avatar/create-upload-url/validation";
import type { UploadCompleteRequest } from "@/server/api/routers/influencer/features/avatar/upload-complete/validation";
import { Tabs } from "@chakra-ui/react";
import { useState } from "react";

export default function AvatarPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadData, setUploadData] = useState<UploadCompleteRequest | null>(
    null,
  );

  // アバター画像取得
  const { data: avatar, refetch: refetchAvatar } =
    api.influencer.avatar.get.useQuery();

  // アップロード用URL生成
  const { mutateAsync: createUploadUrlMutation } =
    api.influencer.avatar.createUploadSignedUrl.useMutation({
      onError: (error) => {
        showErrorToast(
          `アップロードURLの取得に失敗しました: ${
            error instanceof Error
              ? error.message
              : "不明なエラーが発生しました"
          }`,
        );
        setIsLoading(false);
      },
    });

  // アップロード完了通知
  const { mutateAsync: uploadCompleteMutation } =
    api.influencer.avatar.uploadComplete.useMutation({
      onError: (error) => {
        showErrorToast(
          `保存に失敗しました: ${
            error instanceof Error
              ? error.message
              : "不明なエラーが発生しました"
          }`,
        );
        setIsLoading(false);
      },
      onSuccess: () => {
        void refetchAvatar();
        setUploadData(null);
        showSuccessToast("アバター画像を更新しました");
        setIsLoading(false);
      },
    });

  const handleFileUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    setIsLoading(true);

    try {
      // 1. アップロード用署名付きURL取得
      const uploadRequest: CreateUploadSignedUrlRequest = {
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
      };
      const uploadUrlResult = await createUploadUrlMutation(uploadRequest);

      // 2. Supabaseストレージに直接アップロード
      const uploadResponse = await fetch(uploadUrlResult.signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("アップロードに失敗しました");
      }

      // 3. アップロードデータを保存
      setUploadData({
        filePath: uploadUrlResult.filePath,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
      });

      showSuccessToast(
        "アップロード完了。保存ボタンを押して確定してください。",
      );
      setIsLoading(false);
    } catch (error) {
      showErrorToast(
        `アップロードに失敗しました: ${
          error instanceof Error ? error.message : "不明なエラーが発生しました"
        }`,
      );
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!uploadData) return;

    setIsLoading(true);
    await uploadCompleteMutation(uploadData);
  };

  return (
    <Tabs.Content value="avatar">
      <InfluencerAvatarForm
        onFileUpload={handleFileUpload}
        onSubmit={handleSubmit}
        submitButtonText="保存"
        defaultImageUrl={avatar?.signedUrl}
        isLoading={isLoading}
      />
    </Tabs.Content>
  );
}
