"use client";

import { genders } from "@/const/gender";
import {
  influencerInformationSchema,
  type InfluencerInformationRequest,
} from "@/server/api/routers/influencer/features/register/information";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues } from "react-hook-form";
import { LuPhone } from "react-icons/lu";

// Props型
export type InfluencerInformationFormProps = {
  defaultValues?: DefaultValues<InfluencerInformationRequest>;
  onSubmit: (data: InfluencerInformationRequest) => void;
};

export function InfluencerInformationForm({
  defaultValues,
  onSubmit,
}: InfluencerInformationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InfluencerInformationRequest>({
    resolver: zodResolver(influencerInformationSchema),
    defaultValues,
  });

  return (
    <Card.Root as="form" onSubmit={handleSubmit(onSubmit)}>
      <Card.Body p={{ base: 6, md: 8 }}>
        <VStack gap={8} align="stretch">
          {/* 本名・カナ・生年月日・性別 */}
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Field.Root required invalid={!!errors.lastName}>
                <Field.Label>姓（本名）</Field.Label>
                <Input
                  placeholder="山田"
                  required={false}
                  {...register("lastName")}
                />
                <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
              </Field.Root>
            </GridItem>
            <GridItem>
              <Field.Root required invalid={!!errors.firstName}>
                <Field.Label>名（本名）</Field.Label>
                <Input
                  placeholder="太郎"
                  required={false}
                  {...register("firstName")}
                />
                <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
              </Field.Root>
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Field.Root required invalid={!!errors.lastNameKana}>
                <Field.Label>姓（カナ）</Field.Label>
                <Input
                  placeholder="ヤマダ"
                  required={false}
                  {...register("lastNameKana")}
                />
                <Field.ErrorText>
                  {errors.lastNameKana?.message}
                </Field.ErrorText>
              </Field.Root>
            </GridItem>
            <GridItem>
              <Field.Root required invalid={!!errors.firstNameKana}>
                <Field.Label>名（カナ）</Field.Label>
                <Input
                  placeholder="タロウ"
                  required={false}
                  {...register("firstNameKana")}
                />
                <Field.ErrorText>
                  {errors.firstNameKana?.message}
                </Field.ErrorText>
              </Field.Root>
            </GridItem>
          </Grid>

          {/* 公開名（活動名） */}
          <Field.Root required invalid={!!errors.displayName}>
            <Field.Label>
              公開名（活動名）
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="SNSなどで使用している名前"
              required={false}
              {...register("displayName")}
            />
            <Field.HelperText>
              ※プロフィールページやメッセージで表示される名前です
            </Field.HelperText>
            <Field.ErrorText>{errors.displayName?.message}</Field.ErrorText>
          </Field.Root>

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Field.Root required invalid={!!errors.birthday}>
                <Field.Label>生年月日</Field.Label>
                <Input type="date" required={false} {...register("birthday")} />
                <Field.ErrorText>{errors.birthday?.message}</Field.ErrorText>
              </Field.Root>
            </GridItem>
            <GridItem>
              <Field.Root required invalid={!!errors.gender}>
                <Field.Label>性別</Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    placeholder="選択してください"
                    required={false}
                    {...register("gender")}
                  >
                    {genders.map((gender) => (
                      <option key={gender.value} value={gender.value}>
                        {gender.label}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
                <Field.ErrorText>{errors.gender?.message}</Field.ErrorText>
              </Field.Root>
            </GridItem>
          </Grid>

          {/* メールアドレス */}
          <Field.Root required invalid={!!errors.email}>
            <Field.Label>
              メールアドレス
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="email"
              placeholder="your@email.com"
              required={false}
              {...register("email")}
            />
            <Field.HelperText>
              ※ビジネスメール推奨。連絡手段として使用します
            </Field.HelperText>
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          {/* 電話番号 */}
          <Field.Root required invalid={!!errors.phone}>
            <Field.Label>電話番号</Field.Label>
            <InputGroup
              startElement={
                <Icon color="fg.muted">
                  <LuPhone />
                </Icon>
              }
            >
              <Input
                type="tel"
                placeholder="090-1234-5678"
                required={false}
                {...register("phone")}
              />
            </InputGroup>
            <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
          </Field.Root>

          <Box pt={4}>
            <Button w="full" type="submit">
              次へ
            </Button>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
