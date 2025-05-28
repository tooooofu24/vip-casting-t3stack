"use client";

import { RegistrationSteps } from "@/app/(influencer)/(public)/register/(components)/RegistrationSteps";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CheckboxCard,
  CheckboxGroup,
  CloseButton,
  Container,
  Field,
  Heading,
  Icon,
  Input,
  InputGroup,
  SimpleGrid,
  Tag,
  Text,
  Textarea,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { LuBuilding, LuDollarSign, LuPlus, LuSend } from "react-icons/lu";

const workTypeOptions = [
  "投稿作成",
  "動画制作",
  "ライブ配信",
  "イベント出演",
  "アンバサダー",
  "モデル撮影",
  "レビュー記事",
];

const areaOptions = [
  "全国対応可",
  "関東エリア",
  "関西エリア",
  "東海エリア",
  "北海道",
  "東北",
  "中国",
  "四国",
  "九州",
  "オンラインのみ",
];

export default function WorkInfoPage() {
  return (
    <Box py={{ base: 8, md: 12 }}>
      <Container maxW="3xl">
        <VStack gap={12} align="stretch">
          {/* Header */}
          <VStack align="center" gap={2}>
            <Heading size="3xl" fontWeight="bold">
              インフルエンサー登録
            </Heading>
            <Text color="fg.muted" fontSize="md">
              VIPキャスティングで、あなたのキャリアをさらなる高みへ
            </Text>
          </VStack>

          <VStack gap={4} align="stretch">
            <RegistrationSteps step={3} />

            {/* Form Content */}
            <Card.Root as="form">
              <Card.Body p={{ base: 6, md: 8 }}>
                <VStack gap={8} align="stretch">
                  {/* Past Works */}
                  <Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      mb={4}
                    >
                      <Heading size="md">過去のPR実績</Heading>
                      <Button variant="ghost" size="sm">
                        <Icon>
                          <LuPlus />
                        </Icon>
                        実績を追加
                      </Button>
                    </Box>
                    <VStack gap={4} align="stretch">
                      <Card.Root variant="outline">
                        <Card.Body position="relative">
                          <VStack gap={4}>
                            <Field.Root>
                              <Field.Label>企業名・ブランド名</Field.Label>
                              <InputGroup
                                startElement={
                                  <Icon color="fg.muted">
                                    <LuBuilding />
                                  </Icon>
                                }
                              >
                                <Input placeholder="企業名・ブランド名を入力" />
                              </InputGroup>
                            </Field.Root>
                            <Field.Root>
                              <Field.Label>実施内容</Field.Label>
                              <Textarea rows={2} />
                            </Field.Root>
                            <Field.Root>
                              <Field.Label>実施時期</Field.Label>
                              <Input placeholder="2023年10月" />
                            </Field.Root>
                          </VStack>
                          <CloseButton
                            position="absolute"
                            top={1}
                            right={1}
                            size="sm"
                            variant="ghost"
                          />
                        </Card.Body>
                      </Card.Root>
                    </VStack>
                  </Box>

                  {/* Desired Fee */}
                  <Box>
                    <Heading size="md" mb={4}>
                      希望報酬単価（税抜）
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                      <Field.Root>
                        <Field.Label>投稿1件あたり</Field.Label>
                        <InputGroup
                          startElement={
                            <Icon color="fg.muted">
                              <LuDollarSign />
                            </Icon>
                          }
                        >
                          <Input type="number" placeholder="30000" />
                        </InputGroup>
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>動画1本あたり</Field.Label>
                        <InputGroup
                          startElement={
                            <Icon color="fg.muted">
                              <LuDollarSign />
                            </Icon>
                          }
                        >
                          <Input type="number" placeholder="50000" />
                        </InputGroup>
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>ライブ配信1回あたり</Field.Label>
                        <InputGroup
                          startElement={
                            <Icon color="fg.muted">
                              <LuDollarSign />
                            </Icon>
                          }
                        >
                          <Input type="number" placeholder="100000" />
                        </InputGroup>
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>イベント出演1回あたり</Field.Label>
                        <InputGroup
                          startElement={
                            <Icon color="fg.muted">
                              <LuDollarSign />
                            </Icon>
                          }
                        >
                          <Input type="number" placeholder="150000" />
                        </InputGroup>
                      </Field.Root>
                    </SimpleGrid>
                  </Box>

                  {/* Work Types */}
                  <Box>
                    <Heading size="md" mb={4}>
                      対応可能な案件の種類
                    </Heading>
                    <CheckboxGroup>
                      <Wrap gap={2}>
                        {workTypeOptions.map((type) => (
                          <CheckboxCard.Root
                            key={type}
                            value={type}
                            variant="outline"
                            size="sm"
                            align="center"
                            flex={0}
                          >
                            <CheckboxCard.HiddenInput />
                            <CheckboxCard.Control>
                              <CheckboxCard.Label whiteSpace="nowrap">
                                {type}
                              </CheckboxCard.Label>
                              <CheckboxCard.Indicator />
                            </CheckboxCard.Control>
                          </CheckboxCard.Root>
                        ))}
                      </Wrap>
                    </CheckboxGroup>
                  </Box>

                  {/* Available Areas */}
                  <Box>
                    <Heading size="md" mb={4}>
                      活動可能エリア
                    </Heading>
                    <CheckboxGroup>
                      <Wrap gap={2}>
                        {areaOptions.map((area) => (
                          <CheckboxCard.Root
                            key={area}
                            value={area}
                            variant="outline"
                            size="sm"
                            align="center"
                            flex={0}
                          >
                            <CheckboxCard.HiddenInput />
                            <CheckboxCard.Control>
                              <CheckboxCard.Label whiteSpace="nowrap">
                                {area}
                              </CheckboxCard.Label>
                              <CheckboxCard.Indicator />
                            </CheckboxCard.Control>
                          </CheckboxCard.Root>
                        ))}
                      </Wrap>
                    </CheckboxGroup>
                  </Box>

                  {/* NG List */}
                  <Box>
                    <Heading size="md" mb={4}>
                      NG設定
                    </Heading>
                    <VStack gap={4}>
                      <Field.Root>
                        <Field.Label>NG商材（カンマ区切りで入力）</Field.Label>
                        <Input placeholder="例: タバコ, アダルト, ギャンブル" />
                        <Wrap gap={2} mt={1}>
                          <WrapItem>
                            <Tag.Root variant="subtle" colorScheme="red">
                              <Tag.Label>タバコ</Tag.Label>
                              <Tag.EndElement>
                                <Tag.CloseTrigger />
                              </Tag.EndElement>
                            </Tag.Root>
                          </WrapItem>
                        </Wrap>
                      </Field.Root>

                      <Field.Root>
                        <Field.Label>NG企業（カンマ区切りで入力）</Field.Label>
                        <Input placeholder="例: 〇〇株式会社, △△商事" />
                        <Wrap gap={2} mt={1}>
                          <WrapItem>
                            <Tag.Root variant="subtle" colorScheme="red">
                              <Tag.Label>〇〇株式会社</Tag.Label>
                              <Tag.EndElement>
                                <Tag.CloseTrigger />
                              </Tag.EndElement>
                            </Tag.Root>
                          </WrapItem>
                        </Wrap>
                      </Field.Root>

                      <Field.Root>
                        <Field.Label>その他のNG事項</Field.Label>
                        <Textarea
                          rows={3}
                          placeholder="例: マッチング成立前の名前開示NG、深夜の撮影NG など"
                        />
                      </Field.Root>
                    </VStack>
                  </Box>

                  {/* Navigation */}
                  <ButtonGroup
                    width="full"
                    justifyContent="space-between"
                    mt={4}
                  >
                    <Button variant="outline">戻る</Button>
                    <Button type="submit">
                      <Icon>
                        <LuSend />
                      </Icon>
                      登録する
                    </Button>
                  </ButtonGroup>
                </VStack>
              </Card.Body>
            </Card.Root>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
