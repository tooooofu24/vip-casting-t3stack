"use client";

import { BreadcrumbSection } from "@/app/(components)/BreadcrumbSection";
import { CampaignForm } from "@/app/company/dashboard/campaigns/(components)/CampaignForm";
import { toaster } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import {
  createCampaignDefaultValues,
  createCampaignSchema,
} from "@/validations/company/campaign/createCampaign";
import { VStack } from "@chakra-ui/react";

export default function PostCampaignPage() {
  const { mutateAsync } = api.company.campaigns.create.useMutation({
    onError: (error) => {
      toaster.create({ type: "error", title: error.message });
    },
    onSuccess: () => {
      toaster.create({
        type: "success",
        title: "キャンペーンを登録しました",
      });
    },
  });

  return (
    <VStack gap={6} align="stretch">
      <BreadcrumbSection
        items={[
          { label: "案件一覧", href: "/company/dashboard/campaigns" },
          { label: "新規作成" },
        ]}
        title="新規案件作成"
        description="新しい案件を登録します。必要事項を入力してください。"
      />
      <CampaignForm
        onSubmit={mutateAsync}
        defaultValues={createCampaignDefaultValues}
        schema={createCampaignSchema}
      />
    </VStack>
  );
}
