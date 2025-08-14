"use client";

import { InfluencerSnsForm } from "@/app/influencer/(public)/register/(components)/InfluencerSnsForm";
import { showErrorToast, showSuccessToast } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import { type UpdateSnsRequest } from "@/server/api/routers/influencer/features/profile/sns/update/validation";
import { Spinner, Tabs, VStack } from "@chakra-ui/react";

export default function SnsPage() {
  const {
    data: profile,
    isLoading,
    refetch,
  } = api.influencer.profile.get.useQuery();

  const { mutateAsync: updateSnsMutation } =
    api.influencer.profile.updateSns.useMutation({
      onError: (error) => {
        showErrorToast(error?.message ?? "SNS情報の更新に失敗しました。");
      },
      onSuccess: () => {
        void refetch();
        showSuccessToast("SNS情報を更新しました");
      },
    });

  const handleSnsUpdate = async (data: UpdateSnsRequest) => {
    await updateSnsMutation(data);
  };

  if (isLoading) {
    return (
      <VStack gap={4}>
        <Spinner size="lg" />
      </VStack>
    );
  }

  return (
    <Tabs.Content value="sns">
      <InfluencerSnsForm
        onSubmit={handleSnsUpdate}
        submitButtonText="保存"
        showBackButton={false}
        defaultValues={profile?.sns ?? undefined}
      />
    </Tabs.Content>
  );
}
