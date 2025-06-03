"use client";

import type { Campaign } from "@/app/company/dashboard/campaigns/mock";
import { Box, Card, HStack, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";

interface Props {
  campaign: Campaign;
  hideApplyButton?: boolean;
}

export function CampaignCard({ campaign, hideApplyButton = false }: Props) {
  return (
    <Card.Root
      bg="white"
      rounded="lg"
      shadow="sm"
      overflow="hidden"
      _hover={{ shadow: "md" }}
      transition="all 0.2s"
      role="group"
    >
      <Box p="6">
        <Text fontSize="sm" color="gray.500" mb="2">
          {campaign.platform}
        </Text>
        <Text
          fontSize="lg"
          fontWeight="semibold"
          mb="3"
          _groupHover={{ color: "purple.600" }}
          transition="colors 0.2s"
        >
          {campaign.title}
        </Text>
        <Stack gap="2" mb="4">
          <Text>開始日: {campaign.startDate}</Text>
          <Text>終了日: {campaign.endDate}</Text>
          <Text>下書き提出期限: {campaign.draftDeadline}</Text>
          <Text>投稿日: {campaign.postDate}</Text>
        </Stack>
        <HStack justify="space-between">
          <Text color="purple.600" fontWeight="semibold">
            {campaign.budget}
          </Text>
          {!hideApplyButton && (
            <Link
              as={NextLink}
              href={`/campaigns/${campaign.id}`}
              bg="purple.600"
              color="white"
              px="4"
              py="2"
              rounded="lg"
              fontSize="sm"
              _hover={{ bg: "purple.500" }}
              transition="background 0.2s"
            >
              詳細を見る
            </Link>
          )}
        </HStack>
      </Box>
    </Card.Root>
  );
}
