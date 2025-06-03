"use client";

import { BreadcrumbSection } from "@/app/(components)/BreadcrumbSection";
import {
  Box,
  Button,
  Link as ChakraLink,
  HStack,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

const mockCampaigns = [
  {
    id: "1",
    title: "美容系商品のPR募集",
    platform: "Instagram",
    draftDeadline: "2024-04-15",
    postDate: "2024-04-20",
    budget: "¥50,000",
    status: "募集中",
  },
  {
    id: "2",
    title: "食品系商品のレビュー",
    platform: "TikTok",
    draftDeadline: "2024-04-18",
    postDate: "2024-04-25",
    budget: "¥30,000",
    status: "募集中",
  },
];

export default function CampaignManagementPage() {
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
              <Table.ColumnHeader>下書き提出</Table.ColumnHeader>
              <Table.ColumnHeader>投稿日</Table.ColumnHeader>
              <Table.ColumnHeader>報酬</Table.ColumnHeader>
              <Table.ColumnHeader>ステータス</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {mockCampaigns.map((campaign) => (
              <Table.Row key={campaign.id} _hover={{ bg: "gray.50" }}>
                <Table.Cell fontWeight="medium">{campaign.title}</Table.Cell>
                <Table.Cell>{campaign.platform}</Table.Cell>
                <Table.Cell>{campaign.draftDeadline}</Table.Cell>
                <Table.Cell>{campaign.postDate}</Table.Cell>
                <Table.Cell>{campaign.budget}</Table.Cell>
                <Table.Cell>{campaign.status}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        {mockCampaigns.length === 0 && (
          <Box py={12} textAlign="center" color="gray.400">
            案件がありません。
          </Box>
        )}
      </Box>
    </VStack>
  );
}
