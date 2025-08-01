"use client";

import { ageGroups } from "@/const/ageGroup";
import { genders } from "@/const/gender";
import { genres } from "@/const/genre";
import { objectives } from "@/const/objective";
import { regions } from "@/const/region";
import { type Objective } from "@/lib/prisma/generated";
import {
  companyBusinessSchema,
  type CompanyBusinessRequest,
} from "@/server/api/routers/company/features/auth/register/validations/business";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CheckboxCard,
  Field,
  Heading,
  Icon,
  Input,
  InputGroup,
  NativeSelect,
  SimpleGrid,
  Textarea,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type DefaultValues } from "react-hook-form";
import { LuDollarSign, LuUser } from "react-icons/lu";

type Props = {
  defaultValues?: DefaultValues<CompanyBusinessRequest>;
  onSubmit: (data: CompanyBusinessRequest) => void;
  onBack?: () => void;
};

export function CompanyBusinessForm({
  defaultValues,
  onSubmit,
  onBack,
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CompanyBusinessRequest>({
    resolver: zodResolver(companyBusinessSchema),
    defaultValues,
  });

  return (
    <Card.Root as="form" onSubmit={handleSubmit(onSubmit)}>
      <Card.Body p={{ base: 6, md: 8 }}>
        <VStack gap={8} align="stretch">
          {/* Contact Person */}
          <Box>
            <Heading size="md" mb={4}>
              担当者情報
            </Heading>
            <VStack gap={4} align="stretch">
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <Field.Root required invalid={!!errors.contactName}>
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
                    <Input
                      placeholder="山田 太郎"
                      required={false}
                      {...register("contactName")}
                    />
                  </InputGroup>
                  <Field.ErrorText>
                    {errors.contactName?.message}
                  </Field.ErrorText>
                </Field.Root>
                <Field.Root required invalid={!!errors.department}>
                  <Field.Label>
                    部署名
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="マーケティング部"
                    required={false}
                    {...register("department")}
                  />
                  <Field.ErrorText>
                    {errors.department?.message}
                  </Field.ErrorText>
                </Field.Root>
              </SimpleGrid>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <Field.Root invalid={!!errors.position}>
                  <Field.Label>役職</Field.Label>
                  <Input
                    placeholder="マネージャー"
                    required={false}
                    {...register("position")}
                  />
                  <Field.ErrorText>{errors.position?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.phone}>
                  <Field.Label>電話番号</Field.Label>
                  <Input
                    type="tel"
                    placeholder="03-1234-5678"
                    required={false}
                    {...register("phone")}
                  />
                  <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
                </Field.Root>
              </SimpleGrid>
              <Field.Root required invalid={!!errors.email}>
                <Field.Label>
                  メールアドレス
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  type="email"
                  placeholder="yamada@example.com"
                  required={false}
                  {...register("email")}
                />
                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
              </Field.Root>
            </VStack>
          </Box>

          {/* Budget */}
          <Box>
            <Heading size="md" mb={4}>
              想定予算
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <Field.Root required invalid={!!errors.minBudget}>
                <Field.Label>
                  最小予算（円）
                  <Field.RequiredIndicator />
                </Field.Label>
                <InputGroup
                  startElement={
                    <Icon color="fg.muted">
                      <LuDollarSign />
                    </Icon>
                  }
                >
                  <Input
                    placeholder="30000"
                    required={false}
                    {...register("minBudget")}
                  />
                </InputGroup>
                <Field.ErrorText>{errors.minBudget?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root required invalid={!!errors.maxBudget}>
                <Field.Label>
                  最大予算（円）
                  <Field.RequiredIndicator />
                </Field.Label>
                <InputGroup
                  startElement={
                    <Icon color="fg.muted">
                      <LuDollarSign />
                    </Icon>
                  }
                >
                  <Input
                    placeholder="100000"
                    required={false}
                    {...register("maxBudget")}
                  />
                </InputGroup>
                <Field.ErrorText>{errors.maxBudget?.message}</Field.ErrorText>
              </Field.Root>
            </SimpleGrid>
          </Box>

          {/* Target Demographics */}
          <Box>
            <Heading size="md" mb={4}>
              ターゲット層
            </Heading>
            <VStack gap={4} align="stretch">
              <VStack gap={1.5} align="stretch">
                <Field.Root invalid={!!errors.ageGroups}>
                  <Field.Label as="p">年齢層</Field.Label>
                </Field.Root>
                <Controller
                  control={control}
                  name="ageGroups"
                  render={({
                    field: { value, onChange, ...field },
                    fieldState: { invalid },
                  }) => (
                    <Wrap gap={2}>
                      {ageGroups.map((age) => (
                        <CheckboxCard.Root
                          key={age.value}
                          value={age.value}
                          checked={value?.includes(age.value)}
                          invalid={invalid}
                          onChange={() => {
                            if (value?.includes(age.value)) {
                              onChange(value.filter((v) => v !== age.value));
                            } else {
                              onChange([...(value ?? []), age.value]);
                            }
                          }}
                          {...field}
                        >
                          <CheckboxCard.HiddenInput />
                          <CheckboxCard.Control>
                            <CheckboxCard.Label whiteSpace="nowrap">
                              {age.label}
                            </CheckboxCard.Label>
                            <CheckboxCard.Indicator />
                          </CheckboxCard.Control>
                        </CheckboxCard.Root>
                      ))}
                    </Wrap>
                  )}
                />
                {!!errors.ageGroups && (
                  <Field.Root invalid={!!errors.ageGroups}>
                    <Field.ErrorText>
                      {errors.ageGroups?.message}
                    </Field.ErrorText>
                  </Field.Root>
                )}
              </VStack>

              <Field.Root invalid={!!errors.gender}>
                <Field.Label>性別</Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    required={false}
                    placeholder="選択してください"
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

              <VStack gap={1.5} align="stretch">
                <Field.Root invalid={!!errors.regions}>
                  <Field.Label as="p">地域</Field.Label>
                </Field.Root>
                <Controller
                  control={control}
                  name="regions"
                  render={({
                    field: { value, onChange, ...field },
                    fieldState: { invalid },
                  }) => (
                    <Wrap gap={2}>
                      {regions.map((region) => (
                        <CheckboxCard.Root
                          key={region.value}
                          value={region.value}
                          checked={value?.includes(region.value)}
                          invalid={invalid}
                          onChange={() => {
                            if (value?.includes(region.value)) {
                              onChange(value.filter((v) => v !== region.value));
                            } else {
                              onChange([...(value ?? []), region.value]);
                            }
                          }}
                          {...field}
                        >
                          <CheckboxCard.HiddenInput />
                          <CheckboxCard.Control>
                            <CheckboxCard.Label whiteSpace="nowrap">
                              {region.label}
                            </CheckboxCard.Label>
                            <CheckboxCard.Indicator />
                          </CheckboxCard.Control>
                        </CheckboxCard.Root>
                      ))}
                    </Wrap>
                  )}
                />
                {!!errors.regions && (
                  <Field.Root invalid={!!errors.regions}>
                    <Field.ErrorText>{errors.regions?.message}</Field.ErrorText>
                  </Field.Root>
                )}
              </VStack>
            </VStack>
          </Box>

          {/* Target Genres */}
          <Box>
            <Heading size="md" mb={4}>
              希望するインフルエンサーのジャンル
            </Heading>
            <VStack gap={1.5} align="stretch">
              <Field.Root invalid={!!errors.genres}>
                <Field.Label as="p">ジャンル</Field.Label>
              </Field.Root>
              <Controller
                control={control}
                name="genres"
                render={({
                  field: { value, onChange, ...field },
                  fieldState: { invalid },
                }) => (
                  <Wrap gap={2}>
                    {genres.map((genre) => (
                      <CheckboxCard.Root
                        key={genre.value}
                        value={genre.value}
                        checked={value?.includes(genre.value)}
                        invalid={invalid}
                        onChange={() => {
                          if (value?.includes(genre.value)) {
                            onChange(value.filter((v) => v !== genre.value));
                          } else {
                            onChange([...(value ?? []), genre.value]);
                          }
                        }}
                        {...field}
                      >
                        <CheckboxCard.HiddenInput />
                        <CheckboxCard.Control>
                          <CheckboxCard.Label whiteSpace="nowrap">
                            {genre.label}
                          </CheckboxCard.Label>
                          <CheckboxCard.Indicator />
                        </CheckboxCard.Control>
                      </CheckboxCard.Root>
                    ))}
                  </Wrap>
                )}
              />
              {!!errors.genres && (
                <Field.Root invalid={!!errors.genres}>
                  <Field.ErrorText>{errors.genres?.message}</Field.ErrorText>
                </Field.Root>
              )}
            </VStack>
          </Box>

          {/* Campaign Objectives */}
          <Box>
            <Heading size="md" mb={4}>
              キャンペーンの目的
            </Heading>
            <VStack gap={1.5} align="stretch">
              <Field.Root invalid={!!errors.objectives}>
                <Field.Label as="p">目的</Field.Label>
              </Field.Root>
              <Controller
                control={control}
                name="objectives"
                render={({
                  field: { value, onChange, ...field },
                  fieldState: { invalid },
                }) => (
                  <Wrap>
                    {objectives.map((objective) => (
                      <CheckboxCard.Root
                        key={objective.value}
                        value={objective.value}
                        checked={value?.includes(objective.value)}
                        invalid={invalid}
                        onChange={() => {
                          if (value?.includes(objective.value)) {
                            onChange(
                              value.filter(
                                (v: Objective) => v !== objective.value,
                              ),
                            );
                          } else {
                            onChange([...(value ?? []), objective.value]);
                          }
                        }}
                        {...field}
                      >
                        <CheckboxCard.HiddenInput />
                        <CheckboxCard.Control>
                          <CheckboxCard.Label whiteSpace="nowrap">
                            {objective.label}
                          </CheckboxCard.Label>
                          <CheckboxCard.Indicator />
                        </CheckboxCard.Control>
                      </CheckboxCard.Root>
                    ))}
                  </Wrap>
                )}
              />
              {!!errors.objectives && (
                <Field.Root invalid={!!errors.objectives}>
                  <Field.ErrorText>
                    {errors.objectives?.message}
                  </Field.ErrorText>
                </Field.Root>
              )}
            </VStack>
          </Box>

          {/* Past Experience */}
          <Box>
            <Heading size="md" mb={4}>
              過去のインフルエンサーマーケティング実績
            </Heading>
            <Field.Root invalid={!!errors.pastExperience}>
              <Textarea
                placeholder="過去に実施したキャンペーンの内容や成果について記載してください"
                rows={4}
                {...register("pastExperience")}
              />
              <Field.ErrorText>
                {errors.pastExperience?.message}
              </Field.ErrorText>
            </Field.Root>
          </Box>

          {/* Product Description */}
          <Box>
            <Heading size="md" mb={4}>
              PR希望商品・サービス概要
            </Heading>
            <Field.Root invalid={!!errors.productDescription}>
              <Textarea
                placeholder="PRしたい商品やサービスの特徴、セールスポイントなどを記載してください"
                rows={4}
                {...register("productDescription")}
              />
              <Field.ErrorText>
                {errors.productDescription?.message}
              </Field.ErrorText>
            </Field.Root>
          </Box>

          {/* Navigation Buttons */}
          <ButtonGroup w="full" justifyContent="space-between">
            <Button variant="outline" type="button" onClick={onBack}>
              戻る
            </Button>
            <Button type="submit">次へ</Button>
          </ButtonGroup>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
