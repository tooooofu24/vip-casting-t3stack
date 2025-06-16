"use client";

import { InfluencerInformationForm } from "@/app/influencer/(public)/register/(components)/InfluencerInformationForm";
import { showSuccessToast } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import {
  influencerInformationDefaultValues,
  type InfluencerInformationRequest,
} from "@/server/api/routers/influencer/features/auth/register/validations/information";
import { Spinner, Tabs, VStack } from "@chakra-ui/react";

export default function InformationPage() {
  const { data: profile, isLoading } = api.influencer.profile.get.useQuery();

  const handleInformationUpdate = (data: InfluencerInformationRequest) => {
    // TODO: API実装時に更新ロジックを追加
    void data;
    showSuccessToast("基本情報を更新しました");
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
