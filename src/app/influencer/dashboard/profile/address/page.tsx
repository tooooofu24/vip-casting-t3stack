"use client";

import { InfluencerAddressForm } from "@/app/influencer/(public)/register/(components)/InfluencerAddressForm";
import { showSuccessToast } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import {
  influencerAddressDefaultValues,
  type InfluencerAddressRequest,
} from "@/server/api/routers/influencer/features/auth/register/validations/address";
import { Spinner, Tabs, VStack } from "@chakra-ui/react";

export default function AddressPage() {
  const { data: profile, isLoading } = api.influencer.profile.get.useQuery();

  const handleAddressUpdate = (data: InfluencerAddressRequest) => {
    // TODO: API実装時に更新ロジックを追加
    void data;
    showSuccessToast("住所情報を更新しました");
  };

  if (isLoading) {
    return (
      <VStack gap={4}>
        <Spinner size="lg" />
      </VStack>
    );
  }

  return (
    <Tabs.Content value="address">
      <InfluencerAddressForm
        onSubmit={handleAddressUpdate}
        submitButtonText="保存"
        showBackButton={false}
        defaultValues={profile?.address ?? influencerAddressDefaultValues}
      />
    </Tabs.Content>
  );
}
