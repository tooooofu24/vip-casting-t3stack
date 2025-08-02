"use client";

import { genderLabels } from "@/const/gender";
import { genreLabels } from "@/const/genre";
import { platformIcons } from "@/const/platform";
import { prefectureLabels } from "@/const/prefecture";
import { toaster } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import { differenceInYears } from "date-fns";
import { Platform } from "@/lib/prisma/generated";
import {
  Alert,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Spinner,
  Table,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function AdminDashboard() {
  const { data, isLoading, refetch, error } = api.admin.companies.get.useQuery({
    isApproved: false,
  });

  const { mutateAsync, isPending } = api.admin.companies.approve.useMutation({
    onError: (error) => {
      toaster.create({
        type: "error",
        title: error.message,
      });
    },
    onSuccess: () => {
      void refetch();
      toaster.create({
        type: "success",
        title: "会社を承認しました",
      });
    },
  });

  const {
    data: influencers,
    isLoading: isLoadingInfluencers,
    refetch: refetchInfluencers,
    error: errorInfluencers,
  } = api.admin.influencers.get.useQuery({
    isApproved: false,
  });

  const { mutateAsync: approveInfluencer, isPending: isPendingInfluencer } =
    api.admin.influencers.approve.useMutation({
      onError: (error) => {
        toaster.create({ type: "error", title: error.message });
      },
      onSuccess: () => {
        void refetchInfluencers();
        toaster.create({
          type: "success",
          title: "インフルエンサーを承認しました",
        });
      },
    });

  const getMainSns = (
    sns: {
      instagramName?: string | null;
      instagramFollowers?: number | null;
      youtubeName?: string | null;
      youtubeFollowers?: number | null;
      tiktokName?: string | null;
      tiktokFollowers?: number | null;
      xName?: string | null;
      xFollowers?: number | null;
    } | null,
  ) => {
    if (!sns) return "-";

    const snsData: { platform: Platform; name: string; followers: number }[] =
      [];
    if (sns.instagramName && sns.instagramFollowers) {
      snsData.push({
        platform: Platform.INSTAGRAM,
        name: sns.instagramName,
        followers: sns.instagramFollowers,
      });
    }
    if (sns.youtubeName && sns.youtubeFollowers) {
      snsData.push({
        platform: Platform.YOUTUBE,
        name: sns.youtubeName,
        followers: sns.youtubeFollowers,
      });
    }
    if (sns.tiktokName && sns.tiktokFollowers) {
      snsData.push({
        platform: Platform.TIKTOK,
        name: sns.tiktokName,
        followers: sns.tiktokFollowers,
      });
    }
    if (sns.xName && sns.xFollowers) {
      snsData.push({
        platform: Platform.X,
        name: sns.xName,
        followers: sns.xFollowers,
      });
    }

    // フォロワー数でソートして最も多いものを返す
    const mainSns = snsData.sort((a, b) => b.followers - a.followers)[0];
    if (!mainSns) return "-";

    const IconComponent = platformIcons[mainSns.platform];
    return (
      <HStack>
        <IconComponent size={16} />
        <Text fontSize="sm">{mainSns.followers.toLocaleString()}</Text>
      </HStack>
    );
  };

  return (
    <VStack align="stretch" gap={4} py={8} px={{ base: 2, md: 8 }}>
      <Heading size="lg">未承認会社一覧</Heading>
      <Box bg="white" borderRadius="md" boxShadow="sm" p={4} mb={8}>
        {isLoading ? (
          <Center h="100%" p={8}>
            <Spinner size="xl" />
          </Center>
        ) : error ? (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>エラーが発生しました</Alert.Title>
              <Alert.Description>{error.message}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        ) : !data || data.length === 0 ? (
          <Alert.Root status="success">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>未承認の会社はありません</Alert.Title>
              <Alert.Description>
                現在、承認待ちの会社はありません。
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        ) : (
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>会社名</Table.ColumnHeader>
                <Table.ColumnHeader>担当者</Table.ColumnHeader>
                <Table.ColumnHeader>メール</Table.ColumnHeader>
                <Table.ColumnHeader>所在地</Table.ColumnHeader>
                <Table.ColumnHeader>ジャンル</Table.ColumnHeader>
                <Table.ColumnHeader>申込日</Table.ColumnHeader>
                <Table.ColumnHeader>操作</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((company) => (
                <Table.Row key={company.id}>
                  <Table.Cell>
                    {company.information?.companyName ?? "-"}
                  </Table.Cell>
                  <Table.Cell>
                    {company.business ? company.business.contactName : "-"}
                  </Table.Cell>
                  <Table.Cell>
                    {company.business ? company.business.email : "-"}
                  </Table.Cell>
                  <Table.Cell>
                    {company.address
                      ? `${prefectureLabels[company.address.prefecture]} ${company.address.city} ${company.address.town}`
                      : "-"}
                  </Table.Cell>
                  <Table.Cell>
                    {company.business?.genres &&
                    company.business.genres.length > 0 ? (
                      <HStack wrap="wrap">
                        {company.business.genres.slice(0, 3).map((g) => (
                          <Tag.Root key={g.genre} size="sm" colorPalette="gray">
                            <Tag.Label>{genreLabels[g.genre]}</Tag.Label>
                          </Tag.Root>
                        ))}
                        {company.business.genres.length > 3 && (
                          <Text color="fg.muted" fontSize="xs">
                            +{company.business.genres.length - 3}
                          </Text>
                        )}
                      </HStack>
                    ) : (
                      "-"
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {company.createdAt.toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      size="sm"
                      colorScheme="teal"
                      loading={isPending}
                      onClick={() => mutateAsync({ companyId: company.id })}
                    >
                      承認
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Box>

      <Heading size="lg">未承認インフルエンサー一覧</Heading>
      <Box bg="white" borderRadius="md" boxShadow="sm" p={4}>
        {isLoadingInfluencers ? (
          <Center h="100%" p={8}>
            <Spinner size="xl" />
          </Center>
        ) : errorInfluencers ? (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>エラーが発生しました</Alert.Title>
              <Alert.Description>{errorInfluencers.message}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        ) : !influencers || influencers.length === 0 ? (
          <Alert.Root status="success">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>未承認のインフルエンサーはありません</Alert.Title>
              <Alert.Description>
                現在、承認待ちのインフルエンサーはありません。
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        ) : (
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>公開名</Table.ColumnHeader>
                <Table.ColumnHeader>メール</Table.ColumnHeader>
                <Table.ColumnHeader>性別・年齢</Table.ColumnHeader>
                <Table.ColumnHeader>住所</Table.ColumnHeader>
                <Table.ColumnHeader>主要SNS</Table.ColumnHeader>
                <Table.ColumnHeader>申込日</Table.ColumnHeader>
                <Table.ColumnHeader>操作</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {influencers.map((influencer) => (
                <Table.Row key={influencer.id}>
                  <Table.Cell>
                    {influencer.information?.displayName ?? "-"}
                  </Table.Cell>
                  <Table.Cell>
                    {influencer.information?.email ?? "-"}
                  </Table.Cell>
                  <Table.Cell>
                    {influencer.information
                      ? `${genderLabels[influencer.information.gender]} ${differenceInYears(new Date(), new Date(influencer.information.birthday))}歳`
                      : "-"}
                  </Table.Cell>
                  <Table.Cell>
                    {influencer.address
                      ? `${prefectureLabels[influencer.address.prefecture]} ${influencer.address.city}`
                      : "-"}
                  </Table.Cell>
                  <Table.Cell>{getMainSns(influencer.sns)}</Table.Cell>
                  <Table.Cell>
                    {new Date(influencer.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      size="sm"
                      colorScheme="teal"
                      loading={isPendingInfluencer}
                      onClick={() =>
                        approveInfluencer({ influencerId: influencer.id })
                      }
                    >
                      承認
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Box>
    </VStack>
  );
}
