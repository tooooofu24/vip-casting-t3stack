"use client";

import { BreadcrumbSection } from "@/app/(components)/BreadcrumbSection";
import { campaignStatusColors, campaignStatuses } from "@/const/campaignStatus";
import { platforms } from "@/const/platform";
import type { CampaignStatus, Platform } from "@/lib/prisma/generated";
import { api } from "@/lib/trpc/react";
import {
  Badge,
  Box,
  Button,
  Link as ChakraLink,
  HStack,
  Spinner,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

const platformLabels = platforms.reduce(
  (acc, platform) => ({ ...acc, [platform.value]: platform.label }),
  {} as Record<Platform, string>,
);

const statusLabels = campaignStatuses.reduce(
  (acc, status) => ({ ...acc, [status.value]: status.label }),
  {} as Record<CampaignStatus, string>,
);

export default function CampaignManagementPage() {
  const { data, isLoading } = api.company.campaigns.get.useQuery(
    {},
    {
      refetchOnMount: "always",
    },
  );

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="400px"
      >
        <Spinner size="xl" color="purple.500" />
      </Box>
    );
  }

  const campaigns = data?.campaigns ?? [];

  return (
    <VStack gap={6} align="stretch">
      <BreadcrumbSection
        items={[{ label: "案件一覧" }]}
        title="案件一覧"
        description="登録済みの案件データを確認・管理できます。"
      />
      <Box bg="white" borderRadius="lg" boxShadow="sm" p={4}>
        <HStack justify="space-between" mb={4}>
          <Text fontWeight="bold" fontSize="lg">
            案件リスト
          </Text>
          <ChakraLink asChild>
            <Link href="/company/dashboard/campaigns/new">
              <Button colorScheme="purple">新規案件作成</Button>
            </Link>
          </ChakraLink>
        </HStack>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>案件名</Table.ColumnHeader>
              <Table.ColumnHeader>プラットフォーム</Table.ColumnHeader>
              <Table.ColumnHeader>応募期限</Table.ColumnHeader>
              <Table.ColumnHeader>投稿期限</Table.ColumnHeader>
              <Table.ColumnHeader>報酬</Table.ColumnHeader>
              <Table.ColumnHeader>ステータス</Table.ColumnHeader>
              <Table.ColumnHeader>操作</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {campaigns.map((campaign) => (
              <Table.Row key={campaign.id} _hover={{ bg: "gray.50" }}>
                <Table.Cell fontWeight="medium">{campaign.title}</Table.Cell>
                <Table.Cell>{platformLabels[campaign.platform]}</Table.Cell>
                <Table.Cell>
                  {new Date(campaign.applicationDue).toLocaleDateString(
                    "ja-JP",
                  )}
                </Table.Cell>
                <Table.Cell>
                  {new Date(campaign.postDue).toLocaleDateString("ja-JP")}
                </Table.Cell>
                <Table.Cell>
                  {campaign.rewardType === "FIXED"
                    ? `¥${campaign.rewardAmount.toLocaleString()}`
                    : `¥${campaign.rewardAmount.toLocaleString()}/フォロワー`}
                </Table.Cell>
                <Table.Cell>
                  <Badge colorPalette={campaignStatusColors[campaign.status]}>
                    {statusLabels[campaign.status]}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <ChakraLink asChild>
                    <Link
                      href={`/company/dashboard/campaigns/edit/${campaign.id}`}
                    >
                      <Button size="sm" variant="outline">
                        編集
                      </Button>
                    </Link>
                  </ChakraLink>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        {campaigns.length === 0 && (
          <Box py={12} textAlign="center" color="gray.400">
            案件がありません。
          </Box>
        )}
      </Box>
    </VStack>
  );
}
