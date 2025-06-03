"use client";

import { BreadcrumbSection } from "@/app/(components)/BreadcrumbSection";
import { CompanyCampaignForm } from "@/app/company/dashboard/campaigns/new/(components)/CompanyCampaignForm";
import { companyCampaignDefaultValues } from "@/validations/company/campaign";
import { VStack } from "@chakra-ui/react";

export default function PostCampaignPage() {
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
      <CompanyCampaignForm
        onSubmit={(data) => {
          console.warn("submit", data);
        }}
        defaultValues={companyCampaignDefaultValues}
      />
    </VStack>
  );
}
