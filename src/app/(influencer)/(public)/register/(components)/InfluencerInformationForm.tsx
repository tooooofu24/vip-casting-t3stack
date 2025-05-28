"use client";

import {
  Box,
  Button,
  Card,
  Field,
  Grid,
  GridItem,
  Icon,
  Input,
  InputGroup,
  NativeSelect,
  VStack,
} from "@chakra-ui/react";
import { LuPhone, LuUser } from "react-icons/lu";

export function InfluencerInformationForm() {
  return (
    <Card.Root>
      <Card.Body p={{ base: 6, md: 8 }}>
        <VStack gap={8} align="stretch">
          {/* 本名・カナ・生年月日・性別 */}
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
                  <Input placeholder="山田" required={false} />
                </InputGroup>
              </Field.Root>
            </GridItem>
            <GridItem>
              <Field.Root required>
                <Field.Label>名（本名）</Field.Label>
                <Input placeholder="太郎" required={false} />
              </Field.Root>
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Field.Root required>
                <Field.Label>姓（カナ）</Field.Label>
                <Input placeholder="ヤマダ" required={false} />
              </Field.Root>
            </GridItem>
            <GridItem>
              <Field.Root required>
                <Field.Label>名（カナ）</Field.Label>
                <Input placeholder="タロウ" required={false} />
              </Field.Root>
            </GridItem>
          </Grid>

          {/* 公開名（活動名） */}
          <Field.Root required>
            <Field.Label>
              公開名（活動名）
              <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="SNSなどで使用している名前" required={false} />
            <Field.HelperText>
              ※プロフィールページやメッセージで表示される名前です
            </Field.HelperText>
          </Field.Root>

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Field.Root required>
                <Field.Label>生年月日</Field.Label>
                <Input type="date" required={false} />
              </Field.Root>
            </GridItem>
            <GridItem>
              <Field.Root required>
                <Field.Label>性別</Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field placeholder="選択してください">
                    <option value="male">男性</option>
                    <option value="female">女性</option>
                    <option value="other">その他</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Field.Root>
            </GridItem>
          </Grid>

          {/* 電話番号 */}
          <Field.Root required>
            <Field.Label>電話番号</Field.Label>
            <InputGroup
              startElement={
                <Icon color="fg.muted">
                  <LuPhone />
                </Icon>
              }
            >
              <Input type="tel" placeholder="090-1234-5678" required={false} />
            </InputGroup>
          </Field.Root>

          {/* メールアドレス */}
          <Field.Root required>
            <Field.Label>
              メールアドレス
              <Field.RequiredIndicator />
            </Field.Label>
            <Input type="email" placeholder="your@email.com" required={false} />
            <Field.HelperText>
              ※ビジネスメール推奨。連絡手段として使用します
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
