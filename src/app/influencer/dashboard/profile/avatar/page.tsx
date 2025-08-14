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
  const createUploadUrlMutation =
    api.influencer.avatar.createUploadSignedUrl.useMutation();

  // アップロード完了通知
  const uploadCompleteMutation =
    api.influencer.avatar.uploadComplete.useMutation();

  const handleFileUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    try {
      setIsLoading(true);

      // 1. アップロード用署名付きURL取得
      const uploadRequest: CreateUploadSignedUrlRequest = {
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
      };
      const uploadUrlResult =
        await createUploadUrlMutation.mutateAsync(uploadRequest);

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
    } catch (error) {
      showErrorToast(
        `アップロードに失敗しました: ${
          error instanceof Error ? error.message : "不明なエラーが発生しました"
        }`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!uploadData) return;

    try {
      setIsLoading(true);

      // DB保存通知
      await uploadCompleteMutation.mutateAsync(uploadData);

      // アバター情報を再取得してUIを更新
      await refetchAvatar();

      // アップロードデータをクリア
      setUploadData(null);

      showSuccessToast("アバター画像を更新しました");
    } catch (error) {
      showErrorToast(
        `保存に失敗しました: ${
          error instanceof Error ? error.message : "不明なエラーが発生しました"
        }`,
      );
    } finally {
      setIsLoading(false);
    }
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
