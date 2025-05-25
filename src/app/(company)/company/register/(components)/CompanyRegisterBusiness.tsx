"use client";

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CheckboxCard,
  CheckboxGroup,
  Field,
  Heading,
  Icon,
  Input,
  InputGroup,
  NativeSelect,
  SimpleGrid,
  Textarea,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { LuDollarSign, LuUser } from "react-icons/lu";

const genres = [
  { label: "ビューティー", value: "beauty" },
  { label: "ファッション", value: "fashion" },
  { label: "フード", value: "food" },
  { label: "テクノロジー", value: "tech" },
  { label: "ライフスタイル", value: "lifestyle" },
  { label: "トラベル", value: "travel" },
  { label: "フィットネス", value: "fitness" },
  { label: "エンタメ", value: "entertainment" },
] as const;

const ageGroups = [
  { label: "10代", value: "10s" },
  { label: "20代前半", value: "early20s" },
  { label: "20代後半", value: "late20s" },
  { label: "30代前半", value: "early30s" },
  { label: "30代後半", value: "late30s" },
  { label: "40代以上", value: "over40s" },
] as const;

const regions = [
  { label: "全国", value: "all" },
  { label: "関東", value: "kanto" },
  { label: "関西", value: "kansai" },
  { label: "東海", value: "tokai" },
  { label: "北海道", value: "hokkaido" },
  { label: "東北", value: "tohoku" },
  { label: "中国", value: "chugoku" },
  { label: "四国", value: "shikoku" },
  { label: "九州", value: "kyushu" },
] as const;

const objectives = [
  { label: "認知拡大", value: "awareness" },
  { label: "商品販売促進", value: "sales" },
  { label: "ブランドイメージ向上", value: "brand" },
  { label: "エンゲージメント獲得", value: "engagement" },
  { label: "リード獲得", value: "leads" },
  { label: "サービス利用促進", value: "service" },
] as const;

export function CompanyRegisterBusiness() {
  return (
    <Card.Root>
      <Card.Body p={{ base: 6, md: 8 }}>
        <VStack gap={8} align="stretch">
          {/* Contact Person */}
          <Box>
            <Heading size="md" mb={4}>
              担当者情報
            </Heading>
            <VStack gap={4} align="stretch">
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <Field.Root>
                  <Field.Label>
                    担当者名
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <InputGroup
                    startElement={
                      <Icon color="fg.muted">
                        <LuUser />
                      </Icon>
                    }
                  >
                    <Input placeholder="山田 太郎" required={false} />
                  </InputGroup>
                </Field.Root>
                <Field.Root>
                  <Field.Label>
                    部署名
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <Input placeholder="マーケティング部" required={false} />
                </Field.Root>
              </SimpleGrid>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <Field.Root>
                  <Field.Label>役職</Field.Label>
                  <Input placeholder="マネージャー" required={false} />
                </Field.Root>
                <Field.Root>
                  <Field.Label>電話番号</Field.Label>
                  <Input
                    type="tel"
                    placeholder="03-1234-5678"
                    required={false}
                  />
                </Field.Root>
              </SimpleGrid>
              <Field.Root>
                <Field.Label>
                  メールアドレス
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  type="email"
                  placeholder="yamada@example.com"
                  required={false}
                />
              </Field.Root>
            </VStack>
          </Box>

          {/* Budget */}
          <Box>
            <Heading size="md" mb={4}>
              想定予算
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <Field.Root>
                <Field.Label>
                  最小予算（円）
                  <Field.RequiredIndicator />
                </Field.Label>
                <InputGroup
                  startElement={
                    <Icon color="fg.muted">
                      <LuDollarSign />
                    </Icon>
                  }
                >
                  <Input type="number" placeholder="30000" required={false} />
                </InputGroup>
              </Field.Root>
              <Field.Root>
                <Field.Label>
                  最大予算（円）
                  <Field.RequiredIndicator />
                </Field.Label>
                <InputGroup
                  startElement={
                    <Icon color="fg.muted">
                      <LuDollarSign />
                    </Icon>
                  }
                >
                  <Input type="number" placeholder="100000" required={false} />
                </InputGroup>
              </Field.Root>
            </SimpleGrid>
          </Box>

          {/* Target Demographics */}
          <Box>
            <Heading size="md" mb={4}>
              ターゲット層
            </Heading>
            <VStack gap={4} align="stretch">
              <Field.Root>
                <Field.Label>年齢層</Field.Label>
                <CheckboxGroup>
                  <Wrap gap={2}>
                    {ageGroups.map((age) => (
                      <CheckboxCard.Root
                        key={age.value}
                        value={age.value}
                        variant="outline"
                        size="sm"
                        align="center"
                        flex={0}
                      >
                        <CheckboxCard.HiddenInput />
                        <CheckboxCard.Control>
                          <CheckboxCard.Label whiteSpace="nowrap">
                            {age.label}
                          </CheckboxCard.Label>
                          <CheckboxCard.Indicator />
                        </CheckboxCard.Control>
                      </CheckboxCard.Root>
                    ))}
                  </Wrap>
                </CheckboxGroup>
              </Field.Root>

              <Field.Root>
                <Field.Label>性別</Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field placeholder="指定なし" required={false}>
                    <option value="">指定なし</option>
                    <option value="male">男性</option>
                    <option value="female">女性</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Field.Root>

              <Box>
                <Field.Root mb={2}>
                  <Field.Label>地域</Field.Label>
                </Field.Root>
                <CheckboxGroup>
                  <Wrap gap={2}>
                    {regions.map((region) => (
                      <CheckboxCard.Root
                        key={region.value}
                        value={region.value}
                        variant="outline"
                        size="sm"
                        align="center"
                        flex={0}
                      >
                        <CheckboxCard.HiddenInput />
                        <CheckboxCard.Control>
                          <CheckboxCard.Label whiteSpace="nowrap">
                            {region.label}
                          </CheckboxCard.Label>
                          <CheckboxCard.Indicator />
                        </CheckboxCard.Control>
                      </CheckboxCard.Root>
                    ))}
                  </Wrap>
                </CheckboxGroup>
              </Box>
            </VStack>
          </Box>

          {/* Target Genres */}
          <Box>
            <Heading size="md" mb={4}>
              希望するインフルエンサーのジャンル
            </Heading>
            <CheckboxGroup>
              <Wrap gap={2}>
                {genres.map((genre) => (
                  <CheckboxCard.Root
                    key={genre.value}
                    value={genre.value}
                    variant="outline"
                    size="sm"
                    align="center"
                    flex={0}
                  >
                    <CheckboxCard.HiddenInput />
                    <CheckboxCard.Control>
                      <CheckboxCard.Label whiteSpace="nowrap">
                        {genre.label}
                      </CheckboxCard.Label>
                      <CheckboxCard.Indicator />
                    </CheckboxCard.Control>
                  </CheckboxCard.Root>
                ))}
              </Wrap>
            </CheckboxGroup>
          </Box>

          {/* Campaign Objectives */}
          <Box>
            <Heading size="md" mb={4}>
              キャンペーンの目的
            </Heading>
            <CheckboxGroup>
              <Wrap>
                {objectives.map((objective) => (
                  <CheckboxCard.Root
                    key={objective.value}
                    value={objective.value}
                    variant="outline"
                    size="sm"
                    align="center"
                    flex={0}
                  >
                    <CheckboxCard.HiddenInput />
                    <CheckboxCard.Control>
                      <CheckboxCard.Label whiteSpace="nowrap">
                        {objective.label}
                      </CheckboxCard.Label>
                      <CheckboxCard.Indicator />
                    </CheckboxCard.Control>
                  </CheckboxCard.Root>
                ))}
              </Wrap>
            </CheckboxGroup>
          </Box>

          {/* Past Experience */}
          <Box>
            <Heading size="md" mb={4}>
              過去のインフルエンサーマーケティング実績
            </Heading>
            <Field.Root>
              <Textarea
                placeholder="過去に実施したキャンペーンの内容や成果について記載してください"
                rows={4}
              />
            </Field.Root>
          </Box>

          {/* Product Description */}
          <Box>
            <Heading size="md" mb={4}>
              PR希望商品・サービス概要
            </Heading>
            <Field.Root>
              <Textarea
                placeholder="PRしたい商品やサービスの特徴、セールスポイントなどを記載してください"
                rows={4}
              />
            </Field.Root>
          </Box>

          {/* Navigation Buttons */}
          <ButtonGroup w="full" justifyContent="space-between">
            <Button variant="outline">戻る</Button>
            <Button>次へ</Button>
          </ButtonGroup>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
