"use client";

import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { LuBanknote, LuClock, LuPlus } from "react-icons/lu";

// モック用のPR募集データ
const mockPrListings = [
  {
    id: "1",
    title: "美容系インフルエンサーがスキンケア商品のPRを募集",
    status: "active",
    platforms: ["Instagram", "TikTok"],
    priceRange: { min: 50000, max: 100000 },
    period: { start: "2024-04-01", end: "2024-04-30" },
    applicants: 5,
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    title: "フィットネス系コンテンツでプロテイン商品のPRを募集",
    status: "active",
    platforms: ["YouTube", "Instagram"],
    priceRange: { min: 80000, max: 150000 },
    period: { start: "2024-04-15", end: "2024-05-15" },
    applicants: 3,
    createdAt: "2024-03-16",
  },
];

export default function PrListingListPage() {
  return (
    <Box py={8}>
      <Container maxW="4xl" px={4}>
        <Stack direction="row" justify="space-between" align="center" mb={6}>
          <Heading as="h1" fontSize="2xl" fontWeight="bold">
            PR募集一覧
          </Heading>
          <Link href="/influencer/dashboard/pr-listing/create">
            <Button as="span">
              <Icon as={LuPlus} />
              新規募集
            </Button>
          </Link>
        </Stack>

        <VStack gap={4} align="stretch">
          {mockPrListings.map((listing) => (
            <Link
              key={listing.id}
              href={`/influencer/dashboard/pr-listing/${listing.id}`}
            >
              <Card.Root as="span">
                <Card.Body p={6}>
                  <Stack gap={4}>
                    <Stack
                      direction="row"
                      justify="space-between"
                      align="start"
                    >
                      <Box>
                        <Text fontSize="lg" fontWeight="medium" mb={2}>
                          {listing.title}
                        </Text>
                        <HStack gap={4} color="gray.600" fontSize="sm">
                          <HStack gap={1}>
                            <Icon as={LuClock} />
                            <Text>
                              {listing.period.start} 〜 {listing.period.end}
                            </Text>
                          </HStack>
                          <HStack gap={1}>
                            <Icon as={LuBanknote} />
                            <Text>
                              ¥{listing.priceRange.min.toLocaleString()} 〜 ¥
                              {listing.priceRange.max.toLocaleString()}
                            </Text>
                          </HStack>
                        </HStack>
                      </Box>
                      <Stack align="flex-end">
                        <Badge colorScheme="green" mb={2}>
                          募集中
                        </Badge>
                        <Text fontSize="sm" color="gray.500">
                          応募数: {listing.applicants}件
                        </Text>
                      </Stack>
                    </Stack>
                    <HStack gap={2} wrap="wrap">
                      {listing.platforms.map((platform) => (
                        <Badge key={platform} variant="subtle">
                          {platform}
                        </Badge>
                      ))}
                    </HStack>
                  </Stack>
                </Card.Body>
              </Card.Root>
            </Link>
          ))}
        </VStack>
      </Container>
    </Box>
  );
}
