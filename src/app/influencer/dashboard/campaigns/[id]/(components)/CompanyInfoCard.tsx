"use client";

import { ApplyButton } from "@/app/influencer/dashboard/campaigns/[id]/(components)/ApplyButton";
import { genres } from "@/const/genre";
import { regions } from "@/const/region";
import { rewardTypeLabels } from "@/const/rewardType";
import type { RouterOutputs } from "@/lib/trpc/react";
import {
  Badge,
  Button,
  Card,
  DataList,
  HStack,
  Icon,
  Link,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  LuBuilding2,
  LuExternalLink,
  LuLink,
  LuMapPin,
  LuMessageSquare,
  LuPackage,
  LuTag,
  LuTrendingUp,
} from "react-icons/lu";

type CompanyInfoCardProps = {
  campaign: RouterOutputs["influencer"]["campaigns"]["getCampaignById"]["campaign"];
};

export function CompanyInfoCard({ campaign }: CompanyInfoCardProps) {
  const { company } = campaign;
  return (
    <VStack align="stretch" gap={6}>
      {/* 企業基本情報 */}
      <Card.Root>
        <Card.Body>
          <Card.Title mb={4}>企業情報</Card.Title>
          <DataList.Root>
            <DataList.Item>
              <DataList.ItemLabel>
                <HStack>
                  <Icon as={LuBuilding2} />
                  <Text>企業名</Text>
                </HStack>
              </DataList.ItemLabel>
              <DataList.ItemValue>
                <Text>{company?.information?.displayName ?? "企業名不明"}</Text>
              </DataList.ItemValue>
            </DataList.Item>

            {company?.information?.websiteUrl && (
              <DataList.Item>
                <DataList.ItemLabel>
                  <HStack>
                    <Icon as={LuLink} />
                    <Text>ウェブサイト</Text>
                  </HStack>
                </DataList.ItemLabel>
                <DataList.ItemValue>
                  <Link
                    href={company.information.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {company.information.websiteUrl}
                    <LuExternalLink />
                  </Link>
                </DataList.ItemValue>
              </DataList.Item>
            )}
            {company?.business?.genres &&
              company.business.genres.length > 0 && (
                <DataList.Item>
                  <DataList.ItemLabel>
                    <HStack>
                      <Icon as={LuTag} />
                      <Text>業界・ジャンル</Text>
                    </HStack>
                  </DataList.ItemLabel>
                  <DataList.ItemValue>
                    <HStack flexWrap="wrap">
                      {company.business.genres.map((genreItem, index) => (
                        <Badge key={index} variant="outline">
                          {genres.find((g) => g.value === genreItem.genre)
                            ?.label ?? String(genreItem.genre)}
                        </Badge>
                      ))}
                    </HStack>
                  </DataList.ItemValue>
                </DataList.Item>
              )}

            {company?.business?.regions &&
              company.business.regions.length > 0 && (
                <DataList.Item>
                  <DataList.ItemLabel>
                    <HStack>
                      <Icon as={LuMapPin} />
                      <Text>対応地域</Text>
                    </HStack>
                  </DataList.ItemLabel>
                  <DataList.ItemValue>
                    <HStack flexWrap="wrap">
                      {company.business.regions.map((regionItem, index) => (
                        <Badge key={index} variant="outline">
                          {regions.find((r) => r.value === regionItem.region)
                            ?.label ?? String(regionItem.region)}
                        </Badge>
                      ))}
                    </HStack>
                  </DataList.ItemValue>
                </DataList.Item>
              )}

            {company?.business?.productDescription && (
              <DataList.Item>
                <DataList.ItemLabel>
                  <HStack>
                    <Icon as={LuPackage} />
                    <Text>商品・サービス</Text>
                  </HStack>
                </DataList.ItemLabel>
                <DataList.ItemValue>
                  <Text>{company.business.productDescription}</Text>
                </DataList.ItemValue>
              </DataList.Item>
            )}

            {company?.business?.pastExperience && (
              <DataList.Item>
                <DataList.ItemLabel>
                  <HStack>
                    <Icon as={LuTrendingUp} />
                    <Text>マーケティング実績</Text>
                  </HStack>
                </DataList.ItemLabel>
                <DataList.ItemValue>
                  <Text>{company.business.pastExperience}</Text>
                </DataList.ItemValue>
              </DataList.Item>
            )}
          </DataList.Root>
        </Card.Body>
      </Card.Root>

      {/* 応募・コミュニケーション */}
      <Card.Root>
        <Card.Body>
          <Card.Title mb={6}>報酬金額</Card.Title>
          <VStack align="stretch" gap={4}>
            {/* 金額表示 */}
            <VStack align="center" gap={2}>
              <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                ¥{campaign.rewardAmount.toLocaleString()}
              </Text>
              <Text fontSize="sm" color="fg.muted">
                {rewardTypeLabels[campaign.rewardType]}報酬
              </Text>
            </VStack>

            {/* 区切り線 */}
            <Separator />

            {/* ボタンセクション */}
            <VStack align="stretch" gap={3}>
              <ApplyButton campaignId={campaign.id} />
              <Button
                colorPalette="blue"
                size="lg"
                variant="outline"
                width="100%"
                onClick={() => {
                  // TODO: チャット機能の実装
                  alert("チャット機能は準備中です");
                }}
              >
                <Icon as={LuMessageSquare} />
                チャットを開始
              </Button>
              <Text fontSize="xs" color="fg.muted" textAlign="center">
                ※ 応募後にチャット機能が利用可能になります
              </Text>
            </VStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  );
}
