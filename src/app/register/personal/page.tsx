"use client";

import { RegistrationSteps } from "@/app/register/(components)/RegistrationSteps";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Container,
  createListCollection,
  Field,
  Grid,
  GridItem,
  Heading,
  Icon,
  Input,
  InputGroup,
  Portal,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuMapPin, LuPhone, LuUser } from "react-icons/lu";

export default function PersonalInfoPage() {
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
            <RegistrationSteps step={1} />

            {/* Form Content */}
            <Card.Root as="form">
              <Card.Body p={{ base: 6, md: 8 }}>
                <VStack gap={6} align="stretch">
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <GridItem>
                      <Field.Root required>
                        <Field.Label>姓（本名）</Field.Label>
                        <InputGroup
                          startElement={
                            <Icon color="fg.muted">
                              <LuUser />
                            </Icon>
                          }
                        >
                          <Input placeholder="山田" />
                        </InputGroup>
                      </Field.Root>
                    </GridItem>
                    <GridItem>
                      <Field.Root required>
                        <Field.Label>名（本名）</Field.Label>
                        <Input placeholder="太郎" />
                      </Field.Root>
                    </GridItem>
                  </Grid>

                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <GridItem>
                      <Field.Root required>
                        <Field.Label>姓（カナ）</Field.Label>
                        <Input placeholder="ヤマダ" />
                      </Field.Root>
                    </GridItem>
                    <GridItem>
                      <Field.Root required>
                        <Field.Label>名（カナ）</Field.Label>
                        <Input placeholder="タロウ" />
                      </Field.Root>
                    </GridItem>
                  </Grid>

                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <GridItem>
                      <Field.Root required>
                        <Field.Label>生年月日</Field.Label>
                        <Input type="date" />
                      </Field.Root>
                    </GridItem>
                    <GridItem>
                      <Field.Root required>
                        <Field.Label>性別</Field.Label>
                        <Select.Root
                          collection={createListCollection({
                            items: [
                              { label: "男性", value: "male" },
                              { label: "女性", value: "female" },
                              { label: "その他", value: "other" },
                            ],
                          })}
                        >
                          <Select.HiddenSelect />
                          <Select.Control>
                            <Select.Trigger>
                              <Select.ValueText placeholder="選択してください" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Portal>
                            <Select.Positioner>
                              <Select.Content>
                                <Select.Item
                                  item={{ label: "男性", value: "male" }}
                                >
                                  男性
                                  <Select.ItemIndicator />
                                </Select.Item>
                                <Select.Item
                                  item={{ label: "女性", value: "female" }}
                                >
                                  女性
                                  <Select.ItemIndicator />
                                </Select.Item>
                                <Select.Item
                                  item={{ label: "その他", value: "other" }}
                                >
                                  その他
                                  <Select.ItemIndicator />
                                </Select.Item>
                              </Select.Content>
                            </Select.Positioner>
                          </Portal>
                        </Select.Root>
                      </Field.Root>
                    </GridItem>
                  </Grid>

                  <Field.Root required>
                    <Field.Label>電話番号</Field.Label>
                    <InputGroup
                      startElement={
                        <Icon color="fg.muted">
                          <LuPhone />
                        </Icon>
                      }
                    >
                      <Input type="tel" placeholder="090-1234-5678" />
                    </InputGroup>
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>郵便番号</Field.Label>
                    <InputGroup
                      startElement={
                        <Icon color="fg.muted">
                          <LuMapPin />
                        </Icon>
                      }
                    >
                      <Input placeholder="123-4567" />
                    </InputGroup>
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>都道府県</Field.Label>
                    <Select.Root
                      collection={createListCollection({
                        items: [
                          { label: "東京都", value: "tokyo" },
                          { label: "大阪府", value: "osaka" },
                          // TODO: 他の都道府県を追加
                        ],
                      })}
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText placeholder="選択してください" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content>
                            <Select.Item
                              item={{ label: "東京都", value: "tokyo" }}
                            >
                              東京都
                              <Select.ItemIndicator />
                            </Select.Item>
                            <Select.Item
                              item={{ label: "大阪府", value: "osaka" }}
                            >
                              大阪府
                              <Select.ItemIndicator />
                            </Select.Item>
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>住所</Field.Label>
                    <Input placeholder="○○区○○町1-2-3" />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>建物名・部屋番号</Field.Label>
                    <Input placeholder="○○マンション101" />
                  </Field.Root>

                  {/* Navigation */}
                  <ButtonGroup
                    width="full"
                    justifyContent="space-between"
                    mt={4}
                  >
                    <Button variant="outline">戻る</Button>
                    <Button type="submit">次へ</Button>
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
