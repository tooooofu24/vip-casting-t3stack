"use client";

import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CheckboxCard,
  CheckboxGroup,
  Container,
  Grid,
  Heading,
  Icon,
  Input,
  Link,
  Stack,
  Text,
  Textarea,
  Timeline,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  LuFacebook,
  LuInstagram,
  LuLink,
  LuMedal,
  LuTwitter,
  LuYoutube,
} from "react-icons/lu";

const ALL_GENRES = [
  "美容",
  "ファッション",
  "グルメ",
  "ライフスタイル",
  "旅行",
  "店舗",
  "フィットネス",
  "エンタメ",
  "その他",
];

const MOCK_SOCIAL_LINKS = [
  {
    platform: "Instagram",
    username: "@beauty_life",
    url: "https://instagram.com/beauty_life",
    followers: 15000,
  },
  {
    platform: "Twitter",
    username: "@beauty_life",
    url: "https://twitter.com/beauty_life",
    followers: 8000,
  },
  {
    platform: "Youtube",
    username: "Beauty Life Channel",
    url: "https://youtube.com/c/beautylife",
    followers: 5000,
  },
];

const MOCK_ACHIEVEMENTS = [
  {
    id: "1",
    title: "化粧品ブランドAのアンバサダー就任",
    date: "2024-01",
    description: "年間を通じて商品開発やプロモーションに参加",
  },
  {
    id: "2",
    title: "ビューティーアワード2023受賞",
    date: "2023-12",
    description: "インフルエンサー部門で優秀賞を受賞",
  },
];

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case "Instagram":
      return LuInstagram;
    case "Twitter":
      return LuTwitter;
    case "Youtube":
      return LuYoutube;
    case "Facebook":
      return LuFacebook;
    default:
      return LuLink;
  }
};

export default function ProfilePage() {
  // 編集用の状態管理
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "山田 花子",
    username: "beauty_life",
    bio: "美容とライフスタイルに関する情報を発信しています。自然派コスメと持続可能なライフスタイルに興味があります。",
    genres: ["美容", "ライフスタイル", "サステナビリティ"],
    email: "hanako.yamada@example.com",
    phone: "090-1234-5678",
    area: "東京都",
    address: "",
    socialLinks: MOCK_SOCIAL_LINKS,
    achievements: MOCK_ACHIEVEMENTS,
    engagementRate: "",
  });

  // 編集用のハンドラ
  type ProfileKey = keyof typeof profile;
  const handleChange = (field: ProfileKey, value: string | string[]) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box py={8} bg="gray.50">
      <Container maxW="4xl">
        <Card.Root overflow="hidden">
          {/* Header */}
          <Box
            position="relative"
            h="48"
            bgGradient="to-r"
            gradientFrom="purple.600"
            gradientTo="purple.900"
          >
            <Box position="absolute" bottom="-16" left="8">
              <Avatar.Root h="32" w="32">
                <Avatar.Fallback name={profile.name} />
                <Avatar.Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" />
              </Avatar.Root>
            </Box>
            <Box position="absolute" top="4" right="4">
              <Button
                onClick={() => setIsEditing((prev) => !prev)}
                bg="white"
                color="purple.600"
                _hover={{ bg: "purple.50" }}
              >
                {isEditing ? "保存" : "編集"}
              </Button>
            </Box>
          </Box>

          {/* Profile Info */}
          <Box pt="20" px="8" pb="8">
            <VStack align="stretch" gap={8}>
              {/* 名前・ユーザー名・自己紹介 */}
              <Stack gap={2}>
                {isEditing ? (
                  <>
                    <Input
                      value={profile.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="名前"
                      mb={2}
                    />
                    <Input
                      value={profile.username}
                      onChange={(e) => handleChange("username", e.target.value)}
                      placeholder="ユーザー名"
                      mb={2}
                    />
                    <Textarea
                      value={profile.bio}
                      onChange={(e) => handleChange("bio", e.target.value)}
                      placeholder="自己紹介"
                    />
                  </>
                ) : (
                  <>
                    <Heading as="h1" fontSize="2xl">
                      {profile.name}
                    </Heading>
                    <Text color="gray.500">@{profile.username}</Text>
                    <Text color="gray.600">{profile.bio}</Text>
                  </>
                )}
              </Stack>

              {/* カテゴリー */}
              <Stack gap={4}>
                <Heading as="h2" fontSize="lg" fontWeight="semibold">
                  カテゴリー
                </Heading>
                {isEditing ? (
                  <CheckboxGroup value={profile.genres}>
                    <Stack direction="row" flexWrap="wrap" gap={2}>
                      {ALL_GENRES.map((category) => (
                        <CheckboxCard.Root
                          key={category}
                          size="sm"
                          value={category}
                          align="center"
                          flex={0}
                        >
                          <CheckboxCard.HiddenInput />
                          <CheckboxCard.Control>
                            <CheckboxCard.Label whiteSpace="nowrap">
                              {category}
                            </CheckboxCard.Label>
                            <CheckboxCard.Indicator />
                          </CheckboxCard.Control>
                        </CheckboxCard.Root>
                      ))}
                    </Stack>
                  </CheckboxGroup>
                ) : (
                  <Stack direction="row" flexWrap="wrap" gap={2}>
                    {profile.genres.map((category) => (
                      <Badge
                        key={category}
                        variant="subtle"
                        px={3}
                        py={1}
                        rounded="full"
                      >
                        {category}
                      </Badge>
                    ))}
                  </Stack>
                )}
              </Stack>

              {/* 連絡先情報・住所 */}
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
                <Stack gap={4}>
                  <Heading as="h2" fontSize="lg" fontWeight="semibold">
                    連絡先情報
                  </Heading>
                  {isEditing ? (
                    <>
                      <Input
                        value={profile.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="メールアドレス"
                        mb={2}
                      />
                      <Input
                        value={profile.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="電話番号"
                        mb={2}
                      />
                      <Input
                        value={profile.area}
                        onChange={(e) => handleChange("area", e.target.value)}
                        placeholder="活動地域"
                        mb={2}
                      />
                      <Input
                        value={profile.address}
                        onChange={(e) =>
                          handleChange("address", e.target.value)
                        }
                        placeholder="住所（任意）"
                        mb={2}
                      />
                    </>
                  ) : (
                    <>
                      <Stack gap={1}>
                        <Text fontSize="sm" color="gray.600">
                          メールアドレス
                        </Text>
                        <Text>{profile.email}</Text>
                      </Stack>
                      <Stack gap={1}>
                        <Text fontSize="sm" color="gray.600">
                          電話番号
                        </Text>
                        <Text>{profile.phone}</Text>
                      </Stack>
                      <Stack gap={1}>
                        <Text fontSize="sm" color="gray.600">
                          活動地域
                        </Text>
                        <Text>{profile.area}</Text>
                      </Stack>
                      {profile.address && (
                        <Stack gap={1}>
                          <Text fontSize="sm" color="gray.600">
                            住所
                          </Text>
                          <Text>{profile.address}</Text>
                        </Stack>
                      )}
                    </>
                  )}
                </Stack>
              </Grid>

              {/* SNSアカウント */}
              <Stack gap={4}>
                <Heading as="h2" fontSize="lg" fontWeight="semibold">
                  SNSアカウント
                </Heading>
                {/* 編集UIは省略（モック段階） */}
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  {profile.socialLinks.map((link, index) => (
                    <Card.Root key={index} variant="outline">
                      <Card.Body>
                        <Stack direction="row" gap={4}>
                          <Icon
                            as={getSocialIcon(link.platform)}
                            color="purple.600"
                          />
                          <Stack gap={1}>
                            <Link
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              fontWeight="medium"
                              _hover={{ color: "purple.600" }}
                            >
                              {link.username}
                            </Link>
                            <Text fontSize="sm" color="gray.500">
                              フォロワー: {link.followers.toLocaleString()}
                            </Text>
                          </Stack>
                        </Stack>
                      </Card.Body>
                    </Card.Root>
                  ))}
                </Grid>
              </Stack>

              {/* 実績 */}
              <Stack gap={4}>
                <Heading as="h2" fontSize="lg" fontWeight="semibold">
                  実績
                </Heading>
                <Timeline.Root size="lg" variant="solid">
                  {profile.achievements.map((achievement) => (
                    <Timeline.Item key={achievement.id}>
                      <Timeline.Connector>
                        <Timeline.Separator />
                        <Timeline.Indicator>
                          <Icon as={LuMedal} />
                        </Timeline.Indicator>
                      </Timeline.Connector>
                      <Timeline.Content gap={2}>
                        <Timeline.Title fontWeight="medium">
                          {achievement.title}
                        </Timeline.Title>
                        <Timeline.Description color="gray.500">
                          {achievement.date}
                        </Timeline.Description>
                        <Text color="gray.600">{achievement.description}</Text>
                      </Timeline.Content>
                    </Timeline.Item>
                  ))}
                </Timeline.Root>
              </Stack>
            </VStack>
          </Box>
        </Card.Root>
      </Container>
    </Box>
  );
}
