"use client";

import { BreadcrumbSection } from "@/app/(components)/BreadcrumbSection";
import {
  Button,
  Card,
  Field,
  HStack,
  Icon,
  Input,
  InputGroup,
  NativeSelect,
  RadioGroup,
  SimpleGrid,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { LuSave } from "react-icons/lu";

const PLATFORMS = ["Instagram", "TikTok", "YouTube", "X", "Facebook"];

export default function PostCampaignPage() {
  return (
    <VStack gap={6} align="stretch">
      <BreadcrumbSection
        items={[
          { label: "案件一覧", href: "/company/dashboard/campaigns" },
          { label: "新規作成" },
        ]}
        title="新規案件作成"
        description="新しい案件を登録します。必要事項を入力してください。"
      />
      <Card.Root bg="white" as="form">
        <Card.Body>
          <VStack gap="6" align="stretch">
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

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="full">
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
                <InputGroup endElement="人">
                  <Input />
                </InputGroup>
              </Field.Root>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
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
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
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
                      <RadioGroup.ItemText>フォロワー単価</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  </HStack>
                </RadioGroup.Root>
              </Field.Root>
              <Field.Root>
                <Field.Label>報酬金額</Field.Label>
                <InputGroup endElement="円">
                  <Input />
                </InputGroup>
                <Field.HelperText>
                  フォロワー単価は1円から10円の間で設定できます。
                  例：フォロワー単価2円、フォロワー数10,000人の場合、報酬は20,000円となります。
                </Field.HelperText>
              </Field.Root>
            </SimpleGrid>

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

            <HStack justify="flex-end" mt={6}>
              <Button type="submit">
                保存する
                <Icon as={LuSave} />
              </Button>
            </HStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  );
}
