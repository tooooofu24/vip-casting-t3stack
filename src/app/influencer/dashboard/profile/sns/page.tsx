"use client";

import { InfluencerSnsForm } from "@/app/influencer/(public)/register/(components)/InfluencerSnsForm";
import { showSuccessToast } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import {
  influencerSnsDefaultValues,
  type InfluencerSnsRequest,
} from "@/server/api/routers/influencer/features/auth/register/validations/sns";
import { Spinner, Tabs, VStack } from "@chakra-ui/react";

export default function SnsPage() {
  const { data: profile, isLoading } = api.influencer.profile.get.useQuery();

  const handleSnsUpdate = (data: InfluencerSnsRequest) => {
    // TODO: API実装時に更新ロジックを追加
    void data;
    showSuccessToast("SNS情報を更新しました");
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
        defaultValues={profile?.sns ?? influencerSnsDefaultValues}
      />
    </Tabs.Content>
  );
}
