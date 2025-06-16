"use client";

import { InfluencerWorkForm } from "@/app/influencer/(public)/register/(components)/InfluencerWorkForm";
import { showSuccessToast } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import {
  influencerWorkDefaultValues,
  type InfluencerWorkRequest,
} from "@/server/api/routers/influencer/features/auth/register/validations/work";
import { Spinner, Tabs, VStack } from "@chakra-ui/react";

export default function WorkPage() {
  const { data: profile, isLoading } = api.influencer.profile.get.useQuery();

  const handleWorkUpdate = (data: InfluencerWorkRequest) => {
    // TODO: API実装時に更新ロジックを追加
    void data;
    showSuccessToast("案件情報を更新しました");
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
        defaultValues={profile?.work ?? influencerWorkDefaultValues}
      />
    </Tabs.Content>
  );
}
