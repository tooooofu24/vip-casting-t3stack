"use client";

import { BreadcrumbSection } from "@/app/(components)/BreadcrumbSection";
import { ApplyButton } from "@/app/influencer/dashboard/campaigns/[id]/components/ApplyButton";
import { platformLabels } from "@/const/platform";
import { rewardTypeLabels } from "@/const/rewardType";
import { api } from "@/lib/trpc/react";
import {
  Badge,
  Box,
  Card,
  HStack,
  Icon,
  Image,
  List,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useParams } from "next/navigation";
import { LuCalendar, LuCircleAlert } from "react-icons/lu";

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

      <Card.Root>
        <Image
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=500"
          alt={campaign.title}
          h="300px"
          objectFit="cover"
        />

        <Card.Body>
          <Stack>
            <HStack>
              <Badge>{platformLabels[campaign.platform]}</Badge>
              {campaign.company?.business?.genres &&
                campaign.company.business.genres.length > 0 && (
                  <Badge>
                    {String(campaign.company.business.genres[0]?.genre)}
                  </Badge>
                )}
            </HStack>

            <Card.Title>{campaign.title}</Card.Title>
            <Text color="fg.muted">
              {campaign.company?.information?.displayName ?? "企業名不明"}
            </Text>

            <Card.Description>{campaign.description}</Card.Description>

            <Stack>
              <HStack>
                <Icon as={LuCalendar} />
                <Text>
                  投稿期限:{" "}
                  {campaign.postDue
                    ? format(new Date(campaign.postDue), "yyyy年MM月dd日", {
                        locale: ja,
                      })
                    : "未定"}
                </Text>
              </HStack>

              <Text>募集人数: {campaign.recruitment}名</Text>

              <Text>
                応募締切:{" "}
                {campaign.applicationDue
                  ? format(
                      new Date(campaign.applicationDue),
                      "yyyy年MM月dd日",
                      { locale: ja },
                    )
                  : "未定"}
              </Text>
            </Stack>

            {campaign.requirements.length > 0 && (
              <Box>
                <Text fontWeight="semibold">応募条件・注意事項</Text>
                <List.Root>
                  {campaign.requirements.map((requirement, index) => (
                    <List.Item key={index}>
                      <Icon as={LuCircleAlert} />
                      {requirement}
                    </List.Item>
                  ))}
                </List.Root>
              </Box>
            )}

            <HStack justify="space-between">
              <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                ¥{campaign.rewardAmount.toLocaleString()} (
                {rewardTypeLabels[campaign.rewardType]})
              </Text>
              <ApplyButton />
            </HStack>
          </Stack>
        </Card.Body>
      </Card.Root>
    </VStack>
  );
}
