"use client";

import {
  Badge,
  Box,
  Card,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { type Campaign } from "@prisma/client";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import NextLink from "next/link";
import { LuCalendar, LuCrown, LuFileText, LuUsers } from "react-icons/lu";

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
      <Box position="relative" h="48">
        <Image
          src={campaign.image}
          alt={campaign.title}
          width="100%"
          height="100%"
          objectFit="cover"
          loading="lazy"
          _groupHover={{ transform: "scale(1.05)" }}
          transition="transform 0.3s"
        />
        <HStack position="absolute" top="4" left="4" gap="2">
          <Badge
            bg="purple.600"
            color="white"
            px="3"
            py="1"
            rounded="full"
            fontSize="sm"
          >
            {campaign.platform}
          </Badge>
          <Badge
            bg="purple.600"
            color="white"
            px="3"
            py="1"
            rounded="full"
            fontSize="sm"
          >
            {campaign.genre}
          </Badge>
        </HStack>
        {campaign.isVip && (
          <HStack
            position="absolute"
            top="4"
            right="4"
            bg="yellow.500"
            color="white"
            px="3"
            py="1"
            rounded="full"
            fontSize="sm"
            gap="1"
          >
            <Icon as={LuCrown} />
            <Text>VIP</Text>
          </HStack>
        )}
      </Box>

      <Box p="6">
        <Text fontSize="sm" color="gray.500" mb="2">
          {campaign.companyId}
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
          <HStack color="gray.600" fontSize="sm">
            <Icon as={LuUsers} />
            <Text>必要フォロワー数: {campaign.followers.toLocaleString()}</Text>
          </HStack>
          <HStack color="gray.600" fontSize="sm">
            <Icon as={LuCalendar} />
            <Text>
              応募締切:{" "}
              {format(campaign.deadline, "yyyy年MM月dd日", { locale: ja })}
            </Text>
          </HStack>
          {campaign.requiresDraft && campaign.draftDeadline && (
            <HStack color="gray.600" fontSize="sm">
              <Icon as={LuFileText} />
              <Text>
                下書き提出期限:{" "}
                {format(campaign.draftDeadline, "yyyy年MM月dd日", {
                  locale: ja,
                })}
              </Text>
            </HStack>
          )}
        </Stack>

        <HStack justify="space-between">
          <Text color="purple.600" fontWeight="semibold">
            ¥{campaign.budgetFrom.toLocaleString()} 〜 ¥
            {campaign.budgetTo.toLocaleString()}
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
