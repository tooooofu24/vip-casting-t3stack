"use client";

import { InfluencerAddressForm } from "@/app/influencer/(public)/register/(components)/InfluencerAddressForm";
import { showErrorToast, showSuccessToast } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import { type InfluencerAddressRequest } from "@/server/api/routers/influencer/features/profile/address/update/validation";
import { Spinner, Tabs, VStack } from "@chakra-ui/react";

export default function AddressPage() {
  const {
    data: profile,
    isLoading,
    refetch,
  } = api.influencer.profile.get.useQuery();

  const { mutateAsync: updateAddressMutation } =
    api.influencer.profile.updateAddress.useMutation({
      onError: (error) => {
        showErrorToast(
          `住所情報の更新に失敗しました: ${
            error instanceof Error
              ? error.message
              : "不明なエラーが発生しました"
          }`,
        );
      },
      onSuccess: () => {
        void refetch();
        showSuccessToast("住所情報を更新しました");
      },
    });

  const handleAddressUpdate = async (data: InfluencerAddressRequest) => {
    await updateAddressMutation(data);
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
        defaultValues={profile?.address ?? undefined}
      />
    </Tabs.Content>
  );
}
