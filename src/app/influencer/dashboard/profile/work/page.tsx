"use client";

import { InfluencerWorkForm } from "@/app/influencer/(public)/register/(components)/InfluencerWorkForm";
import { showErrorToast, showSuccessToast } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import { type UpdateWorkRequest } from "@/server/api/routers/influencer/features/profile/work/update/validation";
import { Spinner, Tabs, VStack } from "@chakra-ui/react";

export default function WorkPage() {
  const {
    data: profile,
    isLoading,
    refetch,
  } = api.influencer.profile.get.useQuery();

  const { mutateAsync: updateWorkMutation } =
    api.influencer.profile.updateWork.useMutation({
      onError: (error) => {
        console.error("案件情報更新エラー:", error);
        showErrorToast(error?.message ?? "案件情報の更新に失敗しました。");
      },
      onSuccess: () => {
        void refetch();
        showSuccessToast("案件情報を更新しました");
      },
    });

  const handleWorkUpdate = async (data: UpdateWorkRequest) => {
    await updateWorkMutation(data);
  };

  if (isLoading) {
    return (
      <VStack gap={4}>
        <Spinner size="lg" />
      </VStack>
    );
  }

  return (
    <Tabs.Content value="work">
      <InfluencerWorkForm
        onSubmit={handleWorkUpdate}
        submitButtonText="保存"
        submitButtonIcon={null}
        showBackButton={false}
        defaultValues={profile?.work ?? undefined}
      />
    </Tabs.Content>
  );
}
