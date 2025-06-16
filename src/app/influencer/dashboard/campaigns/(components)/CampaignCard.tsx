"use client";

import { platformIcons, platformLabels } from "@/const/platform";
import { rewardTypeLabels } from "@/const/rewardType";
import type { RouterOutputs } from "@/lib/trpc/react";
import {
  Box,
  Card,
  Icon,
  Image,
  LinkBox,
  LinkOverlay,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

type Campaign =
  RouterOutputs["influencer"]["campaigns"]["getCampaigns"]["campaigns"][number];

export type CampaignCardProps = {
  campaign: Campaign;
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <LinkBox>
      <Card.Root maxW="sm" overflow="hidden">
        <Box position="relative">
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt={campaign.title}
          />
          <Tag.Root position="absolute" bottom="2" left="2">
            <Icon as={platformIcons[campaign.platform]} />
            <Tag.Label>{platformLabels[campaign.platform]}</Tag.Label>
          </Tag.Root>
        </Box>
        <Card.Body gap="2">
          <Card.Title>
            <LinkOverlay asChild>
              <NextLink href={`/influencer/dashboard/campaigns/${campaign.id}`}>
                {campaign.title}
              </NextLink>
            </LinkOverlay>
          </Card.Title>
          <Card.Description lineClamp={2}>
            {campaign.description}
          </Card.Description>
          <Stack direction="row" gap="2" align="end">
            <Text textStyle="2xl">
              ¥{campaign.rewardAmount.toLocaleString()}
            </Text>
            <Text textStyle="lg" color="fg.muted" fontSize="sm">
              {rewardTypeLabels[campaign.rewardType]}
            </Text>
          </Stack>
        </Card.Body>
      </Card.Root>
    </LinkBox>
  );
}
