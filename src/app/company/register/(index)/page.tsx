"use client";

import { RegistrationSteps } from "@/app/company/register/(components)/RegistrationSteps";
import {
  Box,
  Button,
  Card,
  Container,
  Field,
  Heading,
  Input,
  Portal,
  Select,
  SimpleGrid,
  Text,
  VStack,
  createListCollection,
} from "@chakra-ui/react";

const industries = createListCollection({
  items: [
    { label: "小売業", value: "retail" },
    { label: "製造業", value: "manufacturing" },
    { label: "サービス業", value: "service" },
    { label: "IT・通信", value: "it" },
    { label: "金融・保険", value: "finance" },
    { label: "不動産", value: "real_estate" },
    { label: "飲食業", value: "food" },
    { label: "エンターテインメント", value: "entertainment" },
    { label: "その他", value: "other" },
  ],
});

export default function CompanyRegisterPage() {
  return (
    <Box py={{ base: 8, md: 12 }}>
      <Container maxW="3xl">
        <VStack gap={12} align="stretch">
          {/* Header */}
          <VStack align="center" gap={2}>
            <Heading size="3xl" fontWeight="bold">
              企業アカウント登録
            </Heading>
            <Text color="fg.muted" fontSize="md">
              インフルエンサーマッチングを始めましょう
            </Text>
          </VStack>

          <VStack gap={4} align="stretch">
            <RegistrationSteps step={0} />

            {/* Form Content */}
            <Card.Root>
              <Card.Body p={{ base: 6, md: 8 }}>
                <VStack gap={6} align="stretch">
                  <Field.Root required>
                    <Field.Label>
                      法人名（正式名称）
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="株式会社〇〇" />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      クライアント名（プロフィール表示名）
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="〇〇ブランド" />
                    <Field.HelperText>
                      ※インフルエンサーに表示される名称です
                    </Field.HelperText>
                  </Field.Root>

                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    <Field.Root>
                      <Field.Label>法人番号</Field.Label>
                      <Input placeholder="1234567890123" />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>代表取締役氏名</Field.Label>
                      <Input />
                    </Field.Root>
                  </SimpleGrid>

                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    <Field.Root>
                      <Field.Label>設立年月日</Field.Label>
                      <Input type="date" />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>資本金</Field.Label>
                      <Input placeholder="1000万円" />
                    </Field.Root>
                  </SimpleGrid>

                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    <Field.Root>
                      <Field.Label>従業員数</Field.Label>
                      <Input placeholder="100名" />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>業種</Field.Label>
                      <Select.Root collection={industries}>
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
                              {industries.items.map((industry) => (
                                <Select.Item
                                  key={industry.value}
                                  item={industry}
                                >
                                  {industry.label}
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Portal>
                      </Select.Root>
                    </Field.Root>
                  </SimpleGrid>

                  <Field.Root>
                    <Field.Label>会社HP URL</Field.Label>
                    <Input type="url" placeholder="https://www.example.com" />
                  </Field.Root>
                </VStack>

                <Box mt={8}>
                  <Button size="md" w="full">
                    次へ
                  </Button>
                </Box>
              </Card.Body>
            </Card.Root>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
