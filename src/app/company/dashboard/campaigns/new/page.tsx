"use client";

import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Field,
  HStack,
  Heading,
  Icon,
  Input,
  NativeSelect,
  NumberInput,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { LuSend } from "react-icons/lu";

const PLATFORMS = ["Instagram", "TikTok", "YouTube", "X", "Facebook"];

export default function PostCampaignPage() {
  const router = useRouter();

  return (
    <Box py="8" bg="gray.50">
      <Container maxW="4xl">
        <Heading as="h1" fontSize="2xl" fontWeight="bold" mb="6">
          新規案件作成
        </Heading>

        <form>
          <VStack gap="8">
            <Card.Root w="full">
              <Card.Body>
                <VStack gap="6">
                  <Field.Root required>
                    <Field.Label>
                      案件タイトル <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="案件のタイトルを入力" />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      案件詳細 <Field.RequiredIndicator />
                    </Field.Label>
                    <Textarea placeholder="案件の詳細を入力" rows={5} />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      プラットフォーム <Field.RequiredIndicator />
                    </Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field placeholder="プラットフォームを選択">
                        {PLATFORMS.map((platform) => (
                          <option key={platform} value={platform}>
                            {platform}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      募集人数 <Field.RequiredIndicator />
                    </Field.Label>
                    <NumberInput.Root min={1} defaultValue="1">
                      <NumberInput.Control />
                      <NumberInput.Input />
                    </NumberInput.Root>
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      応募期限 <Field.RequiredIndicator />
                    </Field.Label>
                    <Input type="date" />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      投稿期限 <Field.RequiredIndicator />
                    </Field.Label>
                    <Input type="date" />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      報酬形態 <Field.RequiredIndicator />
                    </Field.Label>
                    <RadioGroup.Root defaultValue="fixed">
                      <HStack gap="4">
                        <RadioGroup.Item value="fixed">
                          <RadioGroup.ItemHiddenInput />
                          <RadioGroup.ItemIndicator />
                          <RadioGroup.ItemText>固定報酬</RadioGroup.ItemText>
                        </RadioGroup.Item>
                        <RadioGroup.Item value="follower">
                          <RadioGroup.ItemHiddenInput />
                          <RadioGroup.ItemIndicator />
                          <RadioGroup.ItemText>
                            フォロワー単価
                          </RadioGroup.ItemText>
                        </RadioGroup.Item>
                      </HStack>
                    </RadioGroup.Root>

                    <Box mt="4">
                      <NumberInput.Root min={0} defaultValue="0">
                        <NumberInput.Control />
                        <NumberInput.Input placeholder="0" />
                      </NumberInput.Root>
                      <Text mt="2" fontSize="sm" color="gray.500">
                        フォロワー単価は1円から10円の間で設定できます。
                        例：フォロワー単価2円、フォロワー数10,000人の場合、報酬は20,000円となります。
                      </Text>
                    </Box>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>下書き確認</Field.Label>
                    <Stack>
                      <Checkbox.Root>
                        <Checkbox.Control />
                        <Checkbox.Label>下書き確認が必要</Checkbox.Label>
                      </Checkbox.Root>
                    </Stack>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>応募条件</Field.Label>
                    <Textarea
                      rows={4}
                      placeholder="各条件を改行で区切って入力してください"
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>備考</Field.Label>
                    <Textarea rows={4} placeholder="備考を入力" />
                  </Field.Root>
                </VStack>
              </Card.Body>
            </Card.Root>

            <HStack justify="flex-end" gap="4">
              <Button
                variant="ghost"
                onClick={() => router.push("/influencer/dashboard/campaigns")}
              >
                キャンセル
              </Button>
              <Button type="submit">
                <Icon as={LuSend} />
                公開する
              </Button>
            </HStack>
          </VStack>
        </form>
      </Container>
    </Box>
  );
}
