"use client";

import { BreadcrumbSection } from "@/app/(components)/BreadcrumbSection";
import { Pagination } from "@/app/(components)/Pagination";
import { CampaignCard } from "@/app/influencer/dashboard/campaigns/(components)/CampaignCard";
import type { RouterOutputs } from "@/lib/trpc/react";
import { api } from "@/lib/trpc/react";
import { Box, SimpleGrid, Spinner, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

// Type for campaign data from the API
type CampaignData =
  RouterOutputs["influencer"]["campaigns"]["getCampaigns"]["campaigns"][number];

export default function CampaignsPage() {
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading, error } =
    api.influencer.campaigns.getCampaigns.useQuery({
      page,
      limit,
      offset: (page - 1) * limit,
    });

  const campaigns = data?.campaigns ?? [];
  const totalCount = data?.totalCount ?? 0;

  return (
    <VStack gap={6} align="stretch">
      {/* Breadcrumb Section */}
      <BreadcrumbSection
        items={[{ label: "案件検索" }]}
        title="限定案件を探す"
        description="VIPキャスティングだけの、厳選された高単価案件をご紹介します。"
      />

      {/* Loading State */}
      {isLoading && (
        <Box py={12} textAlign="center">
          <Spinner size="lg" />
          <Text mt={4} color="fg.muted">
            案件を読み込み中...
          </Text>
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Box py={12} textAlign="center" color="red.500">
          <Text>案件の読み込みに失敗しました。</Text>
        </Box>
      )}

      {/* Campaign Grid */}
      {!isLoading && !error && (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {campaigns.map((campaign: CampaignData) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </SimpleGrid>

          {/* Pagination */}
          <Pagination
            totalCount={totalCount}
            pageSize={limit}
            currentPage={page}
            onPageChange={setPage}
          />

          {/* Empty State */}
          {campaigns.length === 0 && (
            <Box py={12} textAlign="center" color="fg.muted">
              条件に一致する案件が見つかりませんでした。
            </Box>
          )}
        </>
      )}
    </VStack>
  );
}
