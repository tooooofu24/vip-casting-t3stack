"use client";

import { genres } from "@/const/genre";
import { regions } from "@/const/region";
import type { Genre, Region } from "@/lib/prisma/generated";
import {
  Badge,
  Box,
  Button,
  Card,
  DataList,
  HStack,
  Icon,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuExternalLink, LuMessageSquare } from "react-icons/lu";

interface CompanyInfoCardProps {
  campaign: {
    company?: {
      information?: {
        displayName: string;
        websiteUrl: string;
        corporateNumber: string;
      } | null;
      business?: {
        genres: { genre: Genre }[];
        regions: { region: Region }[];
        productDescription: string | null;
        pastExperience: string | null;
      } | null;
    } | null;
  };
}

export function CompanyInfoCard({ campaign }: CompanyInfoCardProps) {
  return (
    <Card.Root>
      <Card.Body>
        <Card.Title mb={4}>企業情報</Card.Title>
        <VStack align="stretch" gap={6}>
          <Box>
            <DataList.Root>
              <DataList.Item>
                <DataList.ItemLabel>企業名</DataList.ItemLabel>
                <DataList.ItemValue>
                  {campaign.company?.information?.displayName ?? "企業名不明"}
                </DataList.ItemValue>
              </DataList.Item>

              {campaign.company?.business?.genres &&
                campaign.company.business.genres.length > 0 && (
                  <DataList.Item>
                    <DataList.ItemLabel>業界</DataList.ItemLabel>
                    <DataList.ItemValue>
                      <HStack flexWrap="wrap">
                        {campaign.company.business.genres.map(
                          (genreItem, index) => (
                            <Badge key={index} variant="outline">
                              {genres.find((g) => g.value === genreItem.genre)
                                ?.label ?? String(genreItem.genre)}
                            </Badge>
                          ),
                        )}
                      </HStack>
                    </DataList.ItemValue>
                  </DataList.Item>
                )}

              {campaign.company?.business?.regions &&
                campaign.company.business.regions.length > 0 && (
                  <DataList.Item>
                    <DataList.ItemLabel>対応地域</DataList.ItemLabel>
                    <DataList.ItemValue>
                      <HStack flexWrap="wrap">
                        {campaign.company.business.regions.map(
                          (regionItem, index) => (
                            <Badge key={index} variant="outline">
                              {regions.find(
                                (r) => r.value === regionItem.region,
                              )?.label ?? String(regionItem.region)}
                            </Badge>
                          ),
                        )}
                      </HStack>
                    </DataList.ItemValue>
                  </DataList.Item>
                )}

              {campaign.company?.information?.websiteUrl && (
                <DataList.Item>
                  <DataList.ItemLabel>ウェブサイト</DataList.ItemLabel>
                  <DataList.ItemValue>
                    <HStack>
                      <Icon as={LuExternalLink} color="blue.500" />
                      <Text color="blue.500" textDecoration="underline">
                        <a
                          href={campaign.company.information.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {campaign.company.information.websiteUrl}
                        </a>
                      </Text>
                    </HStack>
                  </DataList.ItemValue>
                </DataList.Item>
              )}

              {campaign.company?.business?.productDescription && (
                <DataList.Item>
                  <DataList.ItemLabel>商品・サービス</DataList.ItemLabel>
                  <DataList.ItemValue>
                    <Text>{campaign.company.business.productDescription}</Text>
                  </DataList.ItemValue>
                </DataList.Item>
              )}

              {campaign.company?.business?.pastExperience && (
                <DataList.Item>
                  <DataList.ItemLabel>マーケティング実績</DataList.ItemLabel>
                  <DataList.ItemValue>
                    <Text>{campaign.company.business.pastExperience}</Text>
                  </DataList.ItemValue>
                </DataList.Item>
              )}
            </DataList.Root>
          </Box>

          <Separator />

          <Box>
            <VStack align="stretch" gap={3}>
              <Button
                onClick={() => {
                  // TODO: チャット機能の実装
                  alert("チャット機能は準備中です");
                }}
              >
                <Icon as={LuMessageSquare} />
                チャットを開始
              </Button>
              <Text fontSize="xs" color="fg.muted">
                ※ 応募後にチャット機能が利用可能になります
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
