"use client";

import { showErrorToast } from "@/lib/chakra-ui/toaster";
import {
  Alert,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  FileUpload,
  List,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuUpload } from "react-icons/lu";

interface InfluencerAvatarFormProps {
  onFileUpload: (files: File[]) => Promise<void>;
  onSubmit: () => void;
  submitButtonText?: string;
  onBack?: () => void;
  defaultImageUrl?: string;
  isLoading?: boolean;
}

export function InfluencerAvatarForm({
  onFileUpload,
  onSubmit,
  submitButtonText = "保存",
  onBack,
  defaultImageUrl,
  isLoading = false,
}: InfluencerAvatarFormProps) {
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const handleFileUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    // ファイルサイズ・形式チェック
    if (file.size > 5 * 1024 * 1024) {
      showErrorToast("ファイルサイズは5MB以下にしてください。");
      return;
    }

    if (!file.type.startsWith("image/")) {
      showErrorToast("画像ファイルのみアップロード可能です。");
      return;
    }

    // プレビュー用のURLを生成
    const previewUrl = URL.createObjectURL(file);
    setPreviewImageUrl(previewUrl);

    await onFileUpload(files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  // コンポーネントがアンマウントされる時にプレビューURLをクリーンアップ
  useEffect(() => {
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  return (
    <Card.Root as="form" onSubmit={handleSubmit}>
      <Card.Body>
        <VStack gap={4}>
          {/* アバター表示 */}
          <VStack>
            <Avatar.Root w="200px" h="200px">
              <Avatar.Fallback fontSize="5xl" />
              {(previewImageUrl ?? defaultImageUrl) && (
                <Avatar.Image src={previewImageUrl ?? defaultImageUrl} />
              )}
            </Avatar.Root>
          </VStack>

          {/* ファイルアップロード */}
          <FileUpload.Root
            accept="image/*"
            maxFiles={1}
            onFileChange={({ acceptedFiles }) =>
              handleFileUpload(acceptedFiles)
            }
          >
            <FileUpload.HiddenInput />
            <FileUpload.Trigger asChild>
              <Button variant="outline" size="sm" w="full">
                <LuUpload /> ファイルを選択
              </Button>
            </FileUpload.Trigger>
            <FileUpload.List />
          </FileUpload.Root>

          {/* 使用ガイド */}
          <Alert.Root status="warning">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title mb={2}>アバター画像のガイドライン</Alert.Title>
              <Alert.Description>
                <List.Root listStylePosition="inside">
                  <List.Item>
                    顔がはっきりと見える写真を使用してください
                  </List.Item>
                  <List.Item>正方形の画像が最適です（1:1の比率）</List.Item>
                  <List.Item>
                    プロフェッショナルな印象を与える画像を選んでください
                  </List.Item>
                  <List.Item>ファイルサイズは5MB以下にしてください</List.Item>
                </List.Root>
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        </VStack>
        <Box mt={8}>
          {onBack ? (
            <ButtonGroup w="full" justifyContent="space-between">
              <Button
                variant="outline"
                onClick={onBack}
                type="button"
                disabled={isLoading}
              >
                戻る
              </Button>
              <Button type="submit" loading={isLoading}>
                {submitButtonText}
              </Button>
            </ButtonGroup>
          ) : (
            <Button
              w="full"
              type="submit"
              loading={isLoading}
              disabled={!previewImageUrl}
            >
              {submitButtonText}
            </Button>
          )}
        </Box>
      </Card.Body>
    </Card.Root>
  );
}
