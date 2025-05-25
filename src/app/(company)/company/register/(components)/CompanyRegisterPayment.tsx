"use client";

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Field,
  Heading,
  Icon,
  Input,
  InputGroup,
  NativeSelect,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { LuCreditCard, LuMapPin, LuSend, LuUser } from "react-icons/lu";

export function CompanyRegisterPayment() {
  return (
    <Card.Root>
      <Card.Body p={{ base: 6, md: 8 }}>
        <VStack gap={8} align="stretch">
          {/* Bank Account Information */}
          <Box>
            <Heading size="md" mb={4}>
              銀行口座情報
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <Field.Root required>
                <Field.Label>
                  銀行名
                  <Field.RequiredIndicator />
                </Field.Label>
                <InputGroup
                  startElement={
                    <Icon color="fg.muted">
                      <LuCreditCard />
                    </Icon>
                  }
                >
                  <Input placeholder="銀行名を入力" required={false} />
                </InputGroup>
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  支店名
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="支店名を入力" required={false} />
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  口座種別
                  <Field.RequiredIndicator />
                </Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    placeholder="選択してください"
                    required={false}
                  >
                    <option value="ordinary">普通</option>
                    <option value="current">当座</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  口座番号
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="口座番号を入力" required={false} />
              </Field.Root>

              <Field.Root required gridColumn="span 2">
                <Field.Label>
                  口座名義（カナ）
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="口座名義を入力" required={false} />
              </Field.Root>
            </SimpleGrid>
          </Box>

          {/* Billing Address */}
          <Box>
            <Heading size="md" mb={4}>
              請求書送付先情報
            </Heading>
            <VStack gap={4} align="stretch">
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <Field.Root required>
                  <Field.Label>
                    郵便番号
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <InputGroup
                    startElement={
                      <Icon color="fg.muted">
                        <LuMapPin />
                      </Icon>
                    }
                  >
                    <Input placeholder="123-4567" required={false} />
                  </InputGroup>
                </Field.Root>

                <Field.Root required>
                  <Field.Label>
                    都道府県
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      placeholder="選択してください"
                      required={false}
                    >
                      <option value="tokyo">東京都</option>
                      <option value="osaka">大阪府</option>
                      {/* 他の都道府県をここに追加 */}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>
              </SimpleGrid>

              <Field.Root required>
                <Field.Label>
                  市区町村
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="市区町村を入力" required={false} />
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  番地
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="番地を入力" required={false} />
              </Field.Root>

              <Field.Root>
                <Field.Label>
                  建物名・階数
                  <Field.RequiredIndicator
                    fallback={
                      <Text as="span" fontSize="xs" color="fg.muted">
                        （任意）
                      </Text>
                    }
                  />
                </Field.Label>
                <Input placeholder="建物名・階数を入力" required={false} />
              </Field.Root>

              <Field.Root required>
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
                  <Input placeholder="担当者名を入力" required={false} />
                </InputGroup>
              </Field.Root>
            </VStack>
          </Box>

          {/* Additional Information */}
          <Box>
            <Heading size="md" mb={4}>
              その他
            </Heading>
            <VStack gap={4} align="stretch">
              <Field.Root>
                <Field.Label>
                  プラットフォーム利用目的
                  <Field.RequiredIndicator
                    fallback={
                      <Text as="span" fontSize="xs" color="fg.muted">
                        （任意）
                      </Text>
                    }
                  />
                </Field.Label>
                <Textarea
                  placeholder="プラットフォームの利用目的を入力"
                  rows={3}
                  required={false}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>
                  備考
                  <Field.RequiredIndicator
                    fallback={
                      <Text as="span" fontSize="xs" color="fg.muted">
                        （任意）
                      </Text>
                    }
                  />
                </Field.Label>
                <Textarea placeholder="備考を入力" rows={3} required={false} />
              </Field.Root>
            </VStack>
          </Box>

          {/* Navigation Buttons */}
          <ButtonGroup w="full" justifyContent="space-between">
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
  );
}
