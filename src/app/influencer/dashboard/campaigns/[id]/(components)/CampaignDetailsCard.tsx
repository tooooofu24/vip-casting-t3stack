"use client";

import {
  campaignStatusColors,
  campaignStatusLabels,
} from "@/const/campaignStatus";
import { genres } from "@/const/genre";
import { platformIcons, platformLabels } from "@/const/platform";
import { rewardTypeLabels } from "@/const/rewardType";
import type { RouterOutputs } from "@/lib/trpc/react";
import {
  Badge,
  Box,
  Card,
  DataList,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import {
  LuActivity,
  LuBadgePercent,
  LuBanknote,
  LuCalendar,
  LuClock,
  LuFileText,
  LuStickyNote,
  LuTrendingUp,
  LuUsers,
} from "react-icons/lu";

type CampaignDetailsCardProps = {
  campaign: RouterOutputs["influencer"]["campaigns"]["getCampaignById"]["campaign"];
};

export function CampaignDetailsCard({ campaign }: CampaignDetailsCardProps) {
  return (
    <Card.Root overflow="hidden">
      <Box position="relative">
        <Image
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=500"
          alt={campaign.title}
          h="300px"
          w="full"
          objectFit="cover"
        />
        <Stack direction="row" position="absolute" bottom="3" left="3">
          <Badge>
            <Icon as={platformIcons[campaign.platform]} />
            {platformLabels[campaign.platform]}
          </Badge>
          {campaign.company?.business?.genres &&
            campaign.company.business.genres.length > 0 && (
              <Badge>
                {
                  genres.find(
                    (g) =>
                      g.value === campaign.company?.business?.genres[0]?.genre,
                  )?.label
                }
              </Badge>
            )}
        </Stack>
      </Box>
      <Card.Body>
        <VStack align="stretch" gap={6}>
          {/* ヘッダー部分 */}
          <VStack align="stretch" gap={0}>
            <Card.Title>{campaign.title}</Card.Title>
            <Text color="fg.muted" fontSize="sm">
              {campaign.company?.information?.displayName ?? "企業名不明"}
            </Text>
          </VStack>

          {/* キャンペーン詳細 */}
          <VStack align="stretch" gap={4}>
            <DataList.Root orientation="horizontal">
              <DataList.Item>
                <DataList.ItemLabel flex={1}>
                  <HStack>
                    <Icon as={LuTrendingUp} />
                    <Text>プラットフォーム</Text>
                  </HStack>
                </DataList.ItemLabel>
                <DataList.ItemValue flex={3}>
                  <Badge colorPalette="blue">
                    <Icon as={platformIcons[campaign.platform]} />
                    {platformLabels[campaign.platform]}
                  </Badge>
                </DataList.ItemValue>
              </DataList.Item>

              <DataList.Item>
                <DataList.ItemLabel flex={1}>
                  <HStack>
                    <Icon as={LuUsers} />
                    <Text>募集人数</Text>
                  </HStack>
                </DataList.ItemLabel>
                <DataList.ItemValue flex={3}>
                  <Badge colorPalette="purple" variant="subtle">
                    {campaign.recruitment}名
                  </Badge>
                </DataList.ItemValue>
              </DataList.Item>

              <DataList.Item>
                <DataList.ItemLabel flex={1}>
                  <HStack>
                    <Icon as={LuActivity} />
                    <Text>ステータス</Text>
                  </HStack>
                </DataList.ItemLabel>
                <DataList.ItemValue flex={3}>
                  <Badge colorPalette={campaignStatusColors[campaign.status]}>
                    {campaignStatusLabels[campaign.status]}
                  </Badge>
                </DataList.ItemValue>
              </DataList.Item>

              <DataList.Item>
                <DataList.ItemLabel flex={1}>
                  <HStack>
                    <Icon as={LuBadgePercent} />
                    <Text>報酬タイプ</Text>
                  </HStack>
                </DataList.ItemLabel>
                <DataList.ItemValue flex={3}>
                  <Badge colorPalette="orange" variant="outline">
                    {rewardTypeLabels[campaign.rewardType]}
                  </Badge>
                </DataList.ItemValue>
              </DataList.Item>

              <DataList.Item>
                <DataList.ItemLabel flex={1}>
                  <HStack>
                    <Icon as={LuBanknote} />
                    <Text>報酬金額</Text>
                  </HStack>
                </DataList.ItemLabel>
                <DataList.ItemValue flex={3}>
                  <Text fontWeight="bold" color="purple.600">
                    ¥{campaign.rewardAmount.toLocaleString()}
                  </Text>
                </DataList.ItemValue>
              </DataList.Item>

              <DataList.Item>
                <DataList.ItemLabel flex={1}>
                  <HStack>
                    <Icon as={LuClock} />
                    <Text>応募締切</Text>
                  </HStack>
                </DataList.ItemLabel>
                <DataList.ItemValue flex={3}>
                  {campaign.applicationDue
                    ? format(
                        new Date(campaign.applicationDue),
                        "yyyy年MM月dd日 HH:mm",
                        { locale: ja },
                      )
                    : "未定"}
                </DataList.ItemValue>
              </DataList.Item>

              <DataList.Item>
                <DataList.ItemLabel flex={1}>
                  <HStack>
                    <Icon as={LuCalendar} />
                    <Text>投稿期限</Text>
                  </HStack>
                </DataList.ItemLabel>
                <DataList.ItemValue flex={3}>
                  {campaign.postDue
                    ? format(
                        new Date(campaign.postDue),
                        "yyyy年MM月dd日 HH:mm",
                        {
                          locale: ja,
                        },
                      )
                    : "未定"}
                </DataList.ItemValue>
              </DataList.Item>

              <DataList.Item>
                <DataList.ItemLabel flex={1}>
                  <HStack>
                    <Icon as={LuFileText} />
                    <Text>作成日</Text>
                  </HStack>
                </DataList.ItemLabel>
                <DataList.ItemValue flex={3}>
                  {format(new Date(campaign.createdAt), "yyyy年MM月dd日", {
                    locale: ja,
                  })}
                </DataList.ItemValue>
              </DataList.Item>

              <DataList.Item>
                <DataList.ItemLabel flex={1}>
                  <HStack>
                    <Icon as={LuFileText} />
                    <Text>更新日</Text>
                  </HStack>
                </DataList.ItemLabel>
                <DataList.ItemValue flex={3}>
                  {format(new Date(campaign.updatedAt), "yyyy年MM月dd日", {
                    locale: ja,
                  })}
                </DataList.ItemValue>
              </DataList.Item>

              {campaign.note && (
                <DataList.Item>
                  <DataList.ItemLabel flex={1}>
                    <HStack>
                      <Icon as={LuStickyNote} />
                      <Text>備考</Text>
                    </HStack>
                  </DataList.ItemLabel>
                  <DataList.ItemValue flex={3}>
                    {campaign.note}
                  </DataList.ItemValue>
                </DataList.Item>
              )}
            </DataList.Root>
          </VStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
