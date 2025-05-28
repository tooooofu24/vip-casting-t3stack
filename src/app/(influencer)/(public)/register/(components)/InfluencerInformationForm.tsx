"use client";

import { Box, Button, Card, Field, Input, VStack } from "@chakra-ui/react";

export function InfluencerInformationForm() {
  return (
    <Card.Root>
      <Card.Body p={{ base: 6, md: 8 }}>
        <VStack gap={8} align="stretch">
          <Field.Root required>
            <Field.Label>
              メールアドレス
              <Field.RequiredIndicator />
            </Field.Label>
            <Input type="email" placeholder="your@email.com" />
            <Field.HelperText>
              ※ビジネスメール推奨。連絡手段として使用します
            </Field.HelperText>
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              パスワード
              <Field.RequiredIndicator />
            </Field.Label>
            <Input type="password" placeholder="8文字以上の英数字" />
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              パスワード（確認）
              <Field.RequiredIndicator />
            </Field.Label>
            <Input type="password" placeholder="パスワードを再入力" />
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              公開名（活動名）
              <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="SNSなどで使用している名前" />
            <Field.HelperText>
              ※プロフィールページやメッセージで表示される名前です
            </Field.HelperText>
          </Field.Root>

          <Box mt={8}>
            <Button size="md" w="full">
              次へ
            </Button>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
