"use client";

import { InfluencerInformationForm } from "@/app/influencer/(public)/register/(components)/InfluencerInformationForm";
import { showErrorToast, showSuccessToast } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import {
  influencerInformationDefaultValues,
  type InfluencerInformationRequest,
} from "@/server/api/routers/influencer/features/auth/register/validations/information";
import { Spinner, Tabs, VStack } from "@chakra-ui/react";

export default function InformationPage() {
  const {
    data: profile,
    isLoading,
    refetch,
  } = api.influencer.profile.get.useQuery();

  const { mutateAsync: updateInformationMutation } =
    api.influencer.profile.updateInformation.useMutation({
      onError: (error) => {
        showErrorToast(
          `更新に失敗しました: ${
            error instanceof Error
              ? error.message
              : "不明なエラーが発生しました"
          }`,
        );
      },
      onSuccess: () => {
        void refetch();
        showSuccessToast("基本情報を更新しました");
      },
    });

  const handleInformationUpdate = async (
    data: InfluencerInformationRequest,
  ) => {
    await updateInformationMutation(data);
  };

  if (isLoading) {
    return (
      <VStack gap={4}>
        <Spinner size="lg" />
      </VStack>
    );
  }

  return (
    <Tabs.Content value="information">
      <InfluencerInformationForm
        onSubmit={handleInformationUpdate}
        submitButtonText="保存"
        showBackButton={false}
        defaultValues={
          profile?.information ?? influencerInformationDefaultValues
        }
      />
    </Tabs.Content>
  );
}
