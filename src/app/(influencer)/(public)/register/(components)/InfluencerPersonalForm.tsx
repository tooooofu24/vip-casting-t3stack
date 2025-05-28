"use client";

import {
  Button,
  ButtonGroup,
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
import { LuMapPin, LuPhone, LuUser } from "react-icons/lu";

export function InfluencerPersonalForm() {
  return (
    <Card.Root>
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
            <NativeSelect.Root>
              <NativeSelect.Field placeholder="選択してください">
                <option value="tokyo">東京都</option>
                <option value="osaka">大阪府</option>
                {/* 他の都道府県も追加可 */}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>

          <Field.Root required>
            <Field.Label>住所</Field.Label>
            <Input placeholder="○○区○○町1-2-3" />
          </Field.Root>

          <Field.Root>
            <Field.Label>建物名・部屋番号</Field.Label>
            <Input placeholder="○○マンション101" />
          </Field.Root>

          <ButtonGroup width="full" justifyContent="space-between" mt={4}>
            <Button variant="outline">戻る</Button>
            <Button>次へ</Button>
          </ButtonGroup>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
