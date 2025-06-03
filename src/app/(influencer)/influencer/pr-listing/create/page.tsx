"use client";

import {
  Box,
  Button,
  Card,
  CheckboxCard,
  CheckboxGroup,
  Container,
  Field,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  Text,
  Textarea,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import Link from "next/link";
import { LuSend } from "react-icons/lu";

// 一時的なモックデータ
const PLATFORMS = ["Instagram", "TikTok", "YouTube", "X"] as const;
const GENRES = ["ファッション", "グルメ", "ビューティー", "旅行"] as const;

type Platform = (typeof PLATFORMS)[number];
type Genre = (typeof GENRES)[number];

// モックデータ
const mockFormData = {
  title: "【Instagram】ファッションアイテムのPR募集",
  description:
    "20代向けファッションアイテムのPRを募集しています。\n自然な形での商品紹介をお願いします。",
  platforms: ["Instagram"] as Platform[],
  genres: ["ファッション"] as Genre[],
  postCount: 2,
  price: "50000",
  availableDates: {
    start: "2024-04-01",
    end: "2024-04-30",
  },
  ngCategories: "健康食品\nギャンブル関連\n投資関連",
  additionalNotes: "撮影は屋外での自然光での撮影を推奨します。",
};

export default function CreatePrListingPage() {
  return (
    <Box py={8} bg="gray.50">
      <Container maxW="4xl" px={4}>
        <Heading as="h1" fontSize="2xl" fontWeight="bold" mb={6}>
          PR募集を作成
        </Heading>

        <VStack gap={8}>
          <Card.Root w="full">
            {/* 基本情報 */}
            <Card.Body gap={6}>
              <Heading as="h2" fontSize="lg" fontWeight="semibold">
                基本情報
              </Heading>

              <Field.Root required>
                <Field.Label>タイトル</Field.Label>
                <Input value={mockFormData.title} readOnly />
              </Field.Root>

              <Field.Root required>
                <Field.Label>説明</Field.Label>
                <Textarea value={mockFormData.description} rows={5} readOnly />
              </Field.Root>

              <Field.Root required>
                <Field.Label>プラットフォーム</Field.Label>
                <CheckboxGroup defaultValue={mockFormData.platforms}>
                  <Wrap gap={2}>
                    {PLATFORMS.map((platform) => (
                      <CheckboxCard.Root
                        key={platform}
                        size="sm"
                        value={platform}
                        align="center"
                        flex={0}
                      >
                        <CheckboxCard.HiddenInput />
                        <CheckboxCard.Control>
                          <CheckboxCard.Label whiteSpace="nowrap">
                            {platform}
                          </CheckboxCard.Label>
                          <CheckboxCard.Indicator />
                        </CheckboxCard.Control>
                      </CheckboxCard.Root>
                    ))}
                  </Wrap>
                </CheckboxGroup>
              </Field.Root>

              <Field.Root required>
                <Field.Label>ジャンル</Field.Label>
                <CheckboxGroup defaultValue={mockFormData.genres}>
                  <Wrap gap={2}>
                    {GENRES.map((genre) => (
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

              <Field.Root required>
                <Field.Label>投稿回数</Field.Label>
                <Input value={mockFormData.postCount} readOnly />
              </Field.Root>

              <Field.Root required>
                <Field.Label>報酬</Field.Label>
                <InputGroup startElement="¥" endElement="円">
                  <Input
                    value={parseInt(mockFormData.price).toLocaleString()}
                    readOnly
                  />
                </InputGroup>
              </Field.Root>

              <Field.Root required>
                <Field.Label>募集期間</Field.Label>
                <HStack gap={2}>
                  <Input
                    type="date"
                    value={mockFormData.availableDates.start}
                    readOnly
                  />
                  <Text>〜</Text>
                  <Input
                    type="date"
                    value={mockFormData.availableDates.end}
                    readOnly
                  />
                </HStack>
              </Field.Root>
            </Card.Body>

            {/* その他の情報 */}
            <Card.Body borderTop="1px" borderColor="border.emphasized" gap={6}>
              <Heading as="h2" fontSize="lg" fontWeight="semibold">
                その他の情報
              </Heading>

              <Field.Root>
                <Field.Label>NG業種・商材</Field.Label>
                <Textarea
                  value={mockFormData.ngCategories}
                  rows={3}
                  placeholder="PRを受け付けない業種や商材"
                  readOnly
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>備考</Field.Label>
                <Textarea
                  value={mockFormData.additionalNotes}
                  rows={3}
                  readOnly
                />
              </Field.Root>
            </Card.Body>
          </Card.Root>

          {/* Submit Buttons */}
          <HStack justify="flex-end" gap={4} w="full">
            <Link href="/influencer/pr-listing">
              <Button as="span" variant="ghost">
                キャンセル
              </Button>
            </Link>
            <Link href="/influencer/pr-listing">
              <Button as="span">
                <Icon as={LuSend} />
                公開する
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}
