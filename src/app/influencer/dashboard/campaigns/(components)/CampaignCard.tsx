"use client";

import { platformIcons, platformLabels } from "@/const/platform";
import { rewardTypeLabels } from "@/const/rewardType";
import type { RouterOutputs } from "@/lib/trpc/react";
import {
  Badge,
  Box,
  Card,
  HStack,
  Icon,
  Image,
  LinkBox,
  LinkOverlay,
  Stack,
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
          <Stack direction="row" position="absolute" bottom="3" left="3">
            <Badge>
              <Icon as={platformIcons[campaign.platform]} boxSize={3} />
              {platformLabels[campaign.platform]}
            </Badge>
            <Badge size="sm" variant="subtle">
              募集中
            </Badge>
          </Stack>
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
          <HStack align="baseline" gap={3}>
            <Text fontSize="2xl" fontWeight="bold">
              ¥{campaign.rewardAmount.toLocaleString()}
            </Text>
            <Text fontSize="sm" color="fg.muted">
              {rewardTypeLabels[campaign.rewardType]}
            </Text>
          </HStack>
        </Card.Body>
      </Card.Root>
    </LinkBox>
  );
}
