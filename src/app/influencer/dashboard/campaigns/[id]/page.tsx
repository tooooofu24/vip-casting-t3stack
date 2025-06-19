"use client";

import { BreadcrumbSection } from "@/app/(components)/BreadcrumbSection";
import { CampaignDetailsCard } from "@/app/influencer/dashboard/campaigns/[id]/(components)/CampaignDetailsCard";
import { CompanyInfoCard } from "@/app/influencer/dashboard/campaigns/[id]/(components)/CompanyInfoCard";
import { api } from "@/lib/trpc/react";
import { Box, Grid, GridItem, Spinner, Text, VStack } from "@chakra-ui/react";
import { useParams } from "next/navigation";

export default function CampaignDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } =
    api.influencer.campaigns.getCampaignById.useQuery({
      id,
    });

  if (isLoading) {
    return (
      <VStack gap={6} align="stretch">
        <BreadcrumbSection
          items={[
            { label: "案件一覧", href: "/influencer/dashboard/campaigns" },
            { label: "読み込み中..." },
          ]}
          title="案件詳細"
          description="案件の詳細情報を確認できます。"
        />
        <Box py={12} textAlign="center">
          <Spinner size="lg" />
          <Text mt={4} color="fg.muted">
            案件を読み込み中...
          </Text>
        </Box>
      </VStack>
    );
  }

  if (error || !data?.campaign) {
    return (
      <VStack gap={6} align="stretch">
        <BreadcrumbSection
          items={[
            { label: "案件一覧", href: "/influencer/dashboard/campaigns" },
            { label: "エラー" },
          ]}
          title="案件詳細"
          description="案件の詳細情報を確認できます。"
        />
        <Box py={12} textAlign="center" color="red.500">
          <Text>案件の読み込みに失敗しました。</Text>
        </Box>
      </VStack>
    );
  }

  const campaign = data?.campaign;

  if (!campaign) {
    return (
      <VStack gap={6} align="stretch">
        <BreadcrumbSection
          items={[
            { label: "案件一覧", href: "/influencer/dashboard/campaigns" },
            { label: "エラー" },
          ]}
          title="案件詳細"
          description="案件の詳細情報を確認できます。"
        />
        <Box py={12} textAlign="center" color="red.500">
          <Text>案件が見つかりませんでした。</Text>
        </Box>
      </VStack>
    );
  }
  return (
    <VStack align="stretch">
      <BreadcrumbSection
        items={[
          { label: "案件一覧", href: "/influencer/dashboard/campaigns" },
          { label: campaign.title },
        ]}
        title={campaign.title}
        description={`${campaign.company?.information?.displayName ?? "企業名不明"}`}
      />

      <Grid templateColumns="2fr 1fr" gap={6} alignItems="start">
        <GridItem>
          <CampaignDetailsCard campaign={campaign} />
        </GridItem>

        <GridItem alignSelf="start">
          <CompanyInfoCard campaign={campaign} />
        </GridItem>
      </Grid>
    </VStack>
  );
}
