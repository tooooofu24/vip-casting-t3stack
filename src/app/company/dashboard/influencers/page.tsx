"use client";

import { InfluencerFilterPanel } from "@/app/company/dashboard/influencers/(components)/InfluencerFilterPanel";
import {
  Accordion,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  SimpleGrid,
  Span,
  Stack,
  Stat,
  Tabs,
  Tag,
  Text,
} from "@chakra-ui/react";
import {
  LuCheck,
  LuLayoutGrid,
  LuSearch,
  LuStar,
  LuUsers,
} from "react-icons/lu";

const DUMMY_RESULTS = [
  {
    id: 1,
    name: "山田 花子",
    image: "/dummy-avatar.png",
    isVerified: true,
    rating: 4.8,
    bio: "美容・コスメが得意なインフルエンサー。フォロワー10万人。",
    genres: ["美容", "ファッション"],
    platforms: {
      Instagram: { followers: 100000, engagement: 3.2 },
      YouTube: { followers: 20000, engagement: 2.1 },
    },
  },
  {
    id: 2,
    name: "田中 太郎",
    image: "/dummy-avatar.png",
    isVerified: false,
    rating: 4.2,
    bio: "旅行・グルメ系の発信をしています。",
    genres: ["旅行", "グルメ"],
    platforms: {
      Instagram: { followers: 50000, engagement: 2.8 },
      TikTok: { followers: 30000, engagement: 4.0 },
    },
  },
];

const DUMMY_ADSLOTS = [
  {
    id: 1,
    influencer: {
      name: "山田 花子",
      image: "/dummy-avatar.png",
      rating: 4.8,
    },
    category: "美容",
    title: "コスメ新商品PR枠",
    description:
      "美容・コスメ系の新商品を紹介できるPR枠です。Instagramストーリーズ＋投稿対応。",
    followers: {
      Instagram: 100000,
      YouTube: 20000,
    },
    price: 50000,
  },
  {
    id: 2,
    influencer: {
      name: "田中 太郎",
      image: "/dummy-avatar.png",
      rating: 4.2,
    },
    category: "旅行",
    title: "旅行Vlog広告枠",
    description:
      "旅行系YouTubeチャンネルでのVlog広告枠。観光地・ホテル・グルメ紹介に最適。",
    followers: {
      YouTube: 30000,
      Instagram: 50000,
    },
    price: 80000,
  },
];

export default function InfluencersPage() {
  return (
    <Container maxW="6xl" py="8">
      <Stack direction="row" justify="space-between" align="center" mb={6}>
        <Heading as="h1" fontSize="2xl" fontWeight="bold">
          インフルエンサー検索
        </Heading>
      </Stack>
      <Tabs.Root defaultValue="influencer">
        <Tabs.List>
          <Tabs.Trigger value="influencer">
            <Icon as={LuUsers} />
            インフルエンサーを探す
          </Tabs.Trigger>
          <Tabs.Trigger value="adslot">
            <Icon as={LuLayoutGrid} />
            広告枠を探す
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="influencer">
          {/* 検索・フィルター */}
          <HStack gap={4} mb={6}>
            <Box flex={1}>
              <InputGroup startElement={<Icon as={LuSearch} />}>
                <Input placeholder="インフルエンサーを検索..." />
              </InputGroup>
            </Box>
          </HStack>
          <Accordion.Root collapsible defaultValue={[]} mb={6}>
            <Accordion.Item value="filter">
              <Accordion.ItemTrigger>
                <Span flex="1">絞り込み</Span>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  <InfluencerFilterPanel />
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion.Root>

          {/* 検索結果リスト（ダミー） */}
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6}>
            {DUMMY_RESULTS.map((influencer) => (
              <Card.Root key={influencer.id} bg="white" rounded="lg">
                <Card.Body p={6}>
                  <Stack gap={4}>
                    <HStack align="center" gap={4} mb={2}>
                      <Avatar.Root size="lg">
                        <Avatar.Image
                          src={influencer.image}
                          alt={influencer.name}
                        />
                        <Avatar.Fallback name={influencer.name} />
                      </Avatar.Root>
                      <Stack flex={1} gap={1}>
                        <HStack gap={2} align="center">
                          <Text fontWeight="bold" fontSize="lg">
                            {influencer.name}
                          </Text>
                          {influencer.isVerified && (
                            <Icon as={LuCheck} color="blue.500" boxSize={4} />
                          )}
                          <HStack gap={1} color="yellow.400">
                            <Icon as={LuStar} />
                            <Text fontSize="sm">{influencer.rating}</Text>
                          </HStack>
                        </HStack>
                        <Text color="fg.muted" fontSize="sm" lineClamp={2}>
                          {influencer.bio}
                        </Text>
                      </Stack>
                    </HStack>
                    <HStack gap={2} flexWrap="wrap" mb={2}>
                      {influencer.genres.map((genre) => (
                        <Tag.Root
                          key={genre}
                          variant="subtle"
                          colorPalette="purple"
                        >
                          <Tag.Label>{genre}</Tag.Label>
                        </Tag.Root>
                      ))}
                    </HStack>
                    <SimpleGrid
                      columns={{
                        base: 1,
                        sm: influencer.platforms
                          ? Object.keys(influencer.platforms).length
                          : 1,
                      }}
                      gap={8}
                    >
                      {Object.entries(influencer.platforms).map(
                        ([platform, data]) => {
                          const { followers, engagement } = data as {
                            followers: number;
                            engagement: number;
                          };
                          return (
                            <Stat.Root key={platform} minW="120px" px={0}>
                              <Stat.Label>{platform}</Stat.Label>
                              <Stat.ValueText fontSize="md">
                                {followers.toLocaleString()}人
                              </Stat.ValueText>
                              <Stat.HelpText color="fg.muted" fontSize="xs">
                                エンゲージメント率 {engagement}%
                              </Stat.HelpText>
                            </Stat.Root>
                          );
                        },
                      )}
                    </SimpleGrid>
                  </Stack>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        </Tabs.Content>
        <Tabs.Content value="adslot">
          <HStack gap={4} mb={6}>
            <Box flex={1}>
              <InputGroup startElement={<Icon as={LuSearch} />}>
                <Input placeholder="広告枠を検索..." />
              </InputGroup>
            </Box>
          </HStack>
          <Accordion.Root collapsible defaultValue={[]} mb={6}>
            <Accordion.Item value="filter">
              <Accordion.ItemTrigger>
                <Span flex="1">絞り込み</Span>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  <InfluencerFilterPanel />
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion.Root>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6}>
            {DUMMY_ADSLOTS.map((slot) => (
              <Card.Root key={slot.id} bg="white" rounded="lg">
                <Card.Body p={6}>
                  <Stack gap={2}>
                    <HStack align="center" gap={3} mb={2}>
                      <Avatar.Root size="md">
                        <Avatar.Image
                          src={slot.influencer.image}
                          alt={slot.influencer.name}
                        />
                        <Avatar.Fallback name={slot.influencer.name} />
                      </Avatar.Root>
                      <Stack gap={0}>
                        <Text fontWeight="bold">{slot.influencer.name}</Text>
                        <HStack gap={1} color="yellow.400" fontSize="sm">
                          <Icon as={LuStar} />
                          <Text>{slot.influencer.rating}</Text>
                        </HStack>
                      </Stack>
                    </HStack>
                    <Box>
                      <Tag.Root colorPalette="purple" size="sm">
                        <Tag.Label>{slot.category}</Tag.Label>
                      </Tag.Root>
                    </Box>
                    <Text fontWeight="medium" fontSize="md">
                      {slot.title}
                    </Text>
                    <Text color="fg.muted" fontSize="sm" lineClamp={2}>
                      {slot.description}
                    </Text>
                    <SimpleGrid columns={2} gap={4} fontSize="sm">
                      {Object.entries(slot.followers).map(
                        ([platform, count]) => (
                          <Stat.Root key={platform} px={0} gap={0}>
                            <Stat.Label fontSize="xs">
                              {platform === "twitter"
                                ? "X（旧Twitter）"
                                : platform}
                            </Stat.Label>
                            <Stat.ValueText fontSize="md">
                              {count.toLocaleString()}人
                            </Stat.ValueText>
                          </Stat.Root>
                        ),
                      )}
                    </SimpleGrid>
                    <HStack justify="space-between" mt={2}>
                      <Text color="purple.600" fontWeight="bold" fontSize="lg">
                        ¥{slot.price.toLocaleString()}
                      </Text>
                      <Button colorScheme="purple" size="sm">
                        詳細を見る
                      </Button>
                    </HStack>
                  </Stack>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  );
}
