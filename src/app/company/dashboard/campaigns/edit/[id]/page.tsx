"use client";

import { BreadcrumbSection } from "@/app/(components)/BreadcrumbSection";
import { CampaignForm } from "@/app/company/dashboard/campaigns/(components)/CampaignForm";
import { toaster } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import { updateCampaignSchema } from "@/server/api/routers/company/features/campaigns/validations/updateCampaign";
import { Card, Spinner, Text, VStack } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";

export default function EditCampaignPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  // キャンペーン詳細を取得
  const {
    data: campaign,
    isLoading,
    refetch,
  } = api.company.campaigns.getById.useQuery({
    id: params.id,
  });

  // キャンペーン更新のミューテーション
  const updateCampaign = api.company.campaigns.update.useMutation({
    onError: (error) => {
      toaster.create({ type: "error", title: error.message });
    },
    onSuccess: () => {
      toaster.create({
        type: "success",
        title: "キャンペーンを更新しました",
      });
      void refetch();
      router.push("/company/dashboard/campaigns");
    },
  });

  if (isLoading) {
    return (
      <VStack gap={6} align="stretch">
        <VStack>
          <Spinner size="xl" />
          <Text>読み込み中...</Text>
        </VStack>
      </VStack>
    );
  }

  if (!campaign) {
    return (
      <VStack gap={6} align="stretch">
        <Card.Root>
          <Card.Body>
            <Text>キャンペーンが見つかりません。</Text>
          </Card.Body>
        </Card.Root>
      </VStack>
    );
  }

  return (
    <VStack gap={6} align="stretch">
      <BreadcrumbSection
        items={[
          { label: "案件一覧", href: "/company/dashboard/campaigns" },
          { label: "編集" },
        ]}
        title="案件編集"
        description="案件の情報を編集します。必要事項を入力してください。"
      />
      <CampaignForm
        schema={updateCampaignSchema}
        defaultValues={{
          id: campaign.id,
          title: campaign.title,
          description: campaign.description,
          platform: campaign.platform,
          recruitment: campaign.recruitment,
          applicationDue: new Date(campaign.applicationDue)
            .toISOString()
            .split("T")[0],
          postDue: new Date(campaign.postDue).toISOString().split("T")[0],
          rewardType: campaign.rewardType,
          rewardAmount: campaign.rewardAmount,
          requirements: campaign.requirements ?? [],
          note: campaign.note ?? "",
        }}
        onSubmit={(data) => {
          updateCampaign.mutate({
            ...data,
            id: campaign.id,
          });
        }}
      />
    </VStack>
  );
}
