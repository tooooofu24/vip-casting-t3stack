"use client";

import { MOCK_CAMPAIGNS } from "@/app/(influencer)/campaigns/mock";
import CampaignDetailsDialog from "@/app/(influencer)/dashboard/(components)/CampaignDetailsDialog";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Heading,
  Icon,
  Input,
  InputGroup,
  Stack,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import { type CampaignStatus } from "@prisma/client";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useState } from "react";
import { LuFileText, LuMoveVertical, LuSearch } from "react-icons/lu";

const statusConfig: Record<
  CampaignStatus,
  { colorPalette: string; label: string }
> = {
  DRAFT: { colorPalette: "gray", label: "下書き" },
  IN_PROGRESS: { colorPalette: "green", label: "進行中" },
  PENDING: { colorPalette: "yellow", label: "確認待ち" },
  COMPLETED: { colorPalette: "blue", label: "完了" },
  CANCELLED: { colorPalette: "red", label: "キャンセル" },
};

const formatDate = (date: Date) => {
  return format(date, "yyyy年M月d日", { locale: ja });
};

export default function CampaignManagementPage() {
  const [selectedStatus, setSelectedStatus] = useState<CampaignStatus | "all">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  const handleCampaignClick = (campaignId: string) => {
    setSelectedCampaign(campaignId);
    setIsDialogOpen(true);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value as CampaignStatus | "all");
  };

  return (
    <Box py={6} px={6}>
      <Container maxW="container.xl">
        <Stack direction="row" justify="space-between" align="center" mb={6}>
          <Heading as="h1" fontSize="2xl" fontWeight="bold">
            案件管理
          </Heading>
          <Button>
            <Icon as={LuFileText} />
            レポート出力
          </Button>
        </Stack>

        {/* Active Campaigns */}
        <Card.Root>
          <Card.Body p={6}>
            <Heading as="h2" size="lg" fontWeight="semibold" mb={4}>
              対応中の案件
            </Heading>

            <Stack direction={{ base: "column", md: "row" }} gap={4} mb={6}>
              <InputGroup
                flex={1}
                startElement={<Icon as={LuSearch} color="gray.400" />}
              >
                <Input
                  placeholder="案件を検索"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                />
              </InputGroup>

              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                style={{
                  padding: "0.5rem",
                  borderRadius: "0.375rem",
                  border: "1px solid",
                  borderColor: "var(--chakra-colors-gray-200)",
                  width: "auto",
                }}
              >
                <option value="all">すべてのステータス</option>
                <option value="IN_PROGRESS">進行中</option>
                <option value="DRAFT">下書き</option>
                <option value="COMPLETED">完了</option>
                <option value="CANCELLED">中止</option>
              </select>
            </Stack>

            <Box overflowX="auto">
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>案件名</Table.ColumnHeader>
                    <Table.ColumnHeader>企業名</Table.ColumnHeader>
                    <Table.ColumnHeader>プラットフォーム</Table.ColumnHeader>
                    <Table.ColumnHeader>下書き提出</Table.ColumnHeader>
                    <Table.ColumnHeader>締切日</Table.ColumnHeader>
                    <Table.ColumnHeader>報酬</Table.ColumnHeader>
                    <Table.ColumnHeader>ステータス</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="right">
                      操作
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {MOCK_CAMPAIGNS.map((campaign) => (
                    <Table.Row
                      key={campaign.id}
                      onClick={() => handleCampaignClick(campaign.id)}
                      _hover={{ bg: "gray.50" }}
                      cursor="pointer"
                    >
                      <Table.Cell>
                        <VStack align="start" gap={1}>
                          <Text fontWeight="medium">{campaign.title}</Text>
                          <Text fontSize="sm" color="gray.600">
                            {campaign.platform}
                          </Text>
                        </VStack>
                      </Table.Cell>
                      <Table.Cell>{campaign.companyId}</Table.Cell>
                      <Table.Cell>{campaign.platform}</Table.Cell>
                      <Table.Cell>
                        {campaign.draftDeadline
                          ? formatDate(campaign.draftDeadline)
                          : "-"}
                      </Table.Cell>
                      <Table.Cell>{formatDate(campaign.deadline)}</Table.Cell>
                      <Table.Cell>
                        ¥{campaign.budgetFrom.toLocaleString()} ~ ¥
                        {campaign.budgetTo.toLocaleString()}
                      </Table.Cell>
                      <Table.Cell>
                        <Badge
                          size="sm"
                          variant="subtle"
                          colorPalette={
                            statusConfig[campaign.status].colorPalette
                          }
                        >
                          {statusConfig[campaign.status].label}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Implement edit functionality
                          }}
                        >
                          <Icon as={LuMoveVertical} />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>
          </Card.Body>
        </Card.Root>
      </Container>

      <CampaignDetailsDialog
        isOpen={isDialogOpen}
        onClose={(e) => {
          setIsDialogOpen(e.open);
          setSelectedCampaign(null);
        }}
        campaign={
          selectedCampaign
            ? (MOCK_CAMPAIGNS.find((c) => c.id === selectedCampaign) ?? null)
            : null
        }
      />
    </Box>
  );
}
