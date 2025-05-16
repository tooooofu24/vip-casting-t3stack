"use client";

import {
  Box,
  Card,
  Checkbox,
  CheckboxCard,
  CheckboxGroup,
  Field,
  GridItem,
  HStack,
  Input,
  NativeSelect,
  SimpleGrid,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";

const DUMMY_GENRES = [
  "美容",
  "ファッション",
  "旅行",
  "グルメ",
  "ライフスタイル",
];
const DUMMY_PLATFORMS = ["Instagram", "YouTube", "TikTok", "X（旧Twitter）"];

export function InfluencerFilterPanel() {
  return (
    <Card.Root mb={6}>
      <Card.Body>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
          {/* プラットフォーム */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              プラットフォーム
            </Text>
            <VStack align="start" gap={2}>
              {DUMMY_PLATFORMS.map((platform) => (
                <Checkbox.Root key={platform}>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>{platform}</Checkbox.Label>
                </Checkbox.Root>
              ))}
            </VStack>
          </Box>
          {/* フォロワー数 */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              フォロワー数
            </Text>
            <HStack gap={2}>
              <Input placeholder="最小" type="number" />
              <Text>〜</Text>
              <Input placeholder="最大" type="number" />
            </HStack>
          </Box>
          {/* エンゲージメント率 */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              エンゲージメント率 (%)
            </Text>
            <HStack gap={2}>
              <Input placeholder="最小" type="number" />
              <Text>〜</Text>
              <Input placeholder="最大" type="number" />
            </HStack>
          </Box>
          {/* 性別 */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              性別
            </Text>
            <NativeSelect.Root size="md" width="100%">
              <NativeSelect.Field defaultValue="all">
                <option value="all">指定なし</option>
                <option value="male">男性</option>
                <option value="female">女性</option>
                <option value="other">その他</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Box>
          {/* 年齢 */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              年齢
            </Text>
            <HStack gap={2}>
              <Input placeholder="最小" type="number" />
              <Text>〜</Text>
              <Input placeholder="最大" type="number" />
            </HStack>
          </Box>
          {/* 居住地域 */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              居住地域
            </Text>
            <NativeSelect.Root size="md" width="100%">
              <NativeSelect.Field defaultValue="東京都">
                <option value="東京都">東京都</option>
                <option value="大阪府">大阪府</option>
                <option value="北海道">北海道</option>
                <option value="福岡県">福岡県</option>
                <option value="愛知県">愛知県</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Box>
          {/* ジャンル */}
          <GridItem colSpan={{ base: 1, md: 3 }}>
            <Field.Root>
              <Field.Label>ジャンル</Field.Label>
              <CheckboxGroup>
                <Wrap gap={2}>
                  {DUMMY_GENRES.map((genre) => (
                    <CheckboxCard.Root
                      key={genre}
                      size="sm"
                      value={genre}
                      align="center"
                      flex={0}
                    >
                      <CheckboxCard.HiddenInput />
                      <CheckboxCard.Control>
                        <CheckboxCard.Label whiteSpace="nowrap">
                          {genre}
                        </CheckboxCard.Label>
                        <CheckboxCard.Indicator />
                      </CheckboxCard.Control>
                    </CheckboxCard.Root>
                  ))}
                </Wrap>
              </CheckboxGroup>
            </Field.Root>
          </GridItem>
          {/* 稼働状況 */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              稼働状況
            </Text>
            <VStack align="start" gap={2}>
              {["対応可能", "対応不可", "内容による"].map((status) => (
                <Checkbox.Root key={status}>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>{status}</Checkbox.Label>
                </Checkbox.Root>
              ))}
            </VStack>
          </Box>
          {/* 投稿頻度 */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              投稿頻度
            </Text>
            <NativeSelect.Root size="md" width="100%">
              <NativeSelect.Field defaultValue="all">
                <option value="all">指定なし</option>
                <option value="daily">毎日</option>
                <option value="weekly">週1回以上</option>
                <option value="monthly">月1回以上</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Box>
          {/* PR実績数 */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              PR実績数（最小）
            </Text>
            <Input placeholder="0" type="number" />
          </Box>
        </SimpleGrid>
      </Card.Body>
    </Card.Root>
  );
}
