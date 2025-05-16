"use client";

import { RegistrationSteps } from "@/app/(company)/company/register/(components)/RegistrationSteps";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Container,
  Field,
  Heading,
  Icon,
  Input,
  InputGroup,
  Portal,
  Select,
  Text,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import { LuMapPin, LuPhone } from "react-icons/lu";

const prefectures = createListCollection({
  items: [
    { label: "東京都", value: "tokyo" },
    { label: "大阪府", value: "osaka" },
    { label: "神奈川県", value: "kanagawa" },
    // 他の都道府県をここに追加
  ],
});

export default function CompanyContactPage() {
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
            <RegistrationSteps step={1} />

            {/* Form Content */}
            <Card.Root>
              <Card.Body p={{ base: 6, md: 8 }}>
                <VStack gap={6} align="stretch">
                  <Field.Root required>
                    <Field.Label>
                      郵便番号
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<Icon as={LuMapPin} />}>
                      <Input placeholder="123-4567" />
                    </InputGroup>
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      都道府県
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Select.Root collection={prefectures}>
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
                            {prefectures.items.map((prefecture) => (
                              <Select.Item
                                key={prefecture.value}
                                item={prefecture}
                              >
                                {prefecture.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      市区町村
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="渋谷区" />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      番地
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="道玄坂1-2-3" />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>建物名・階数</Field.Label>
                    <Input placeholder="〇〇ビル 5階" />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>電話番号</Field.Label>
                    <InputGroup startElement={<Icon as={LuPhone} />}>
                      <Input type="tel" placeholder="03-1234-5678" />
                    </InputGroup>
                  </Field.Root>
                </VStack>

                <ButtonGroup w="full" mt={8} justifyContent="space-between">
                  <Button variant="outline">戻る</Button>
                  <Button>次へ</Button>
                </ButtonGroup>
              </Card.Body>
            </Card.Root>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
