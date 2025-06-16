"use client";

import { TagInputField } from "@/app/(components)/fields/TagInputField";
import { InfluencerPrResultsField } from "@/app/influencer/(public)/register/(components)/fields/InfluencerPrResultsField";
import { regions } from "@/const/region";
import { workTypes } from "@/const/workType";
import {
  influencerWorkDefaultValues,
  influencerWorkSchema,
  type InfluencerWorkRequest,
} from "@/server/api/routers/influencer/features/auth/register/validations/work";
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
  SimpleGrid,
  Textarea,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type DefaultValues } from "react-hook-form";
import { LuSend } from "react-icons/lu";
import type React from "react";

export type InfluencerWorkFormProps = {
  defaultValues?: DefaultValues<InfluencerWorkRequest>;
  onSubmit?: (data: InfluencerWorkRequest) => void;
  submitButtonText?: string;
  submitButtonIcon?: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
};

export function InfluencerWorkForm({
  defaultValues = influencerWorkDefaultValues,
  onSubmit = () => undefined,
  submitButtonText = "登録する",
  submitButtonIcon = <LuSend />,
  showBackButton = true,
  onBack,
}: InfluencerWorkFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InfluencerWorkRequest>({
    resolver: zodResolver(influencerWorkSchema),
    defaultValues,
  });

  return (
    <Card.Root as="form" onSubmit={handleSubmit(onSubmit)}>
      <Card.Body p={{ base: 6, md: 8 }}>
        <VStack gap={8} align="stretch">
          {/* Desired Fee */}
          <Box>
            <Heading size="md" mb={4}>
              希望報酬単価（税抜）
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <Field.Root invalid={!!errors.postFee}>
                <Field.Label>投稿1件あたり</Field.Label>
                <InputGroup startElement="¥">
                  <Input
                    placeholder="30000"
                    {...register("postFee", {
                      setValueAs: (v) => (v === "" ? undefined : Number(v)),
                    })}
                  />
                </InputGroup>
                <Field.ErrorText>{errors.postFee?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.videoFee}>
                <Field.Label>動画1本あたり</Field.Label>
                <InputGroup startElement="¥">
                  <Input
                    placeholder="50000"
                    {...register("videoFee", {
                      setValueAs: (v) => (v === "" ? undefined : Number(v)),
                    })}
                  />
                </InputGroup>
                <Field.ErrorText>{errors.videoFee?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.liveFee}>
                <Field.Label>ライブ配信1回あたり</Field.Label>
                <InputGroup startElement="¥">
                  <Input
                    placeholder="100000"
                    {...register("liveFee", {
                      setValueAs: (v) => (v === "" ? undefined : Number(v)),
                    })}
                  />
                </InputGroup>
                <Field.ErrorText>{errors.liveFee?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.eventFee}>
                <Field.Label>イベント出演1回あたり</Field.Label>
                <InputGroup startElement="¥">
                  <Input
                    placeholder="150000"
                    {...register("eventFee", {
                      setValueAs: (v) => (v === "" ? undefined : Number(v)),
                    })}
                  />
                </InputGroup>
                <Field.ErrorText>{errors.eventFee?.message}</Field.ErrorText>
              </Field.Root>
            </SimpleGrid>
          </Box>

          {/* Work Types */}
          <Box>
            <Heading size="md" mb={4}>
              対応可能な案件の種類
            </Heading>
            <Controller
              control={control}
              name="workTypes"
              render={({
                field: { value, onChange, ...field },
                fieldState: { invalid },
              }) => (
                <Wrap gap={2}>
                  {workTypes.map((workType) => (
                    <CheckboxCard.Root
                      key={workType.value}
                      value={workType.value}
                      checked={value?.includes(workType.value)}
                      invalid={invalid}
                      onChange={() => {
                        if (value?.includes(workType.value)) {
                          onChange(value.filter((v) => v !== workType.value));
                        } else {
                          onChange([...(value ?? []), workType.value]);
                        }
                      }}
                      {...field}
                    >
                      <CheckboxCard.HiddenInput />
                      <CheckboxCard.Control>
                        <CheckboxCard.Label whiteSpace="nowrap">
                          {workType.label}
                        </CheckboxCard.Label>
                        <CheckboxCard.Indicator />
                      </CheckboxCard.Control>
                    </CheckboxCard.Root>
                  ))}
                </Wrap>
              )}
            />
            <Field.Root invalid={!!errors.workTypes}>
              <Field.ErrorText>{errors.workTypes?.message}</Field.ErrorText>
            </Field.Root>
          </Box>

          {/* Available Areas */}
          <Box>
            <Heading size="md" mb={4}>
              活動可能エリア
            </Heading>
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
            <Field.Root invalid={!!errors.regions}>
              <Field.ErrorText>{errors.regions?.message}</Field.ErrorText>
            </Field.Root>
          </Box>

          {/* NG List */}
          <Box>
            <Heading size="md" mb={4}>
              NG設定
            </Heading>
            <VStack gap={4}>
              <Field.Root invalid={!!errors.ngProducts}>
                <Field.Label>NG商材</Field.Label>
                <Controller
                  control={control}
                  name="ngProducts"
                  render={({ field }) => (
                    <TagInputField
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="例: タバコ、アダルト、ギャンブル"
                    />
                  )}
                />
                <Field.ErrorText>{errors.ngProducts?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.ngCompanies}>
                <Field.Label>NG企業</Field.Label>
                <Controller
                  control={control}
                  name="ngCompanies"
                  render={({ field }) => (
                    <TagInputField
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="例: 〇〇株式会社、△△商事"
                    />
                  )}
                />
                <Field.ErrorText>{errors.ngCompanies?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.ngOther}>
                <Field.Label>その他のNG事項</Field.Label>
                <Textarea
                  rows={3}
                  placeholder="例: マッチング成立前の名前開示NG、深夜の撮影NG など"
                  {...register("ngOther")}
                />
                <Field.ErrorText>{errors.ngOther?.message}</Field.ErrorText>
              </Field.Root>
            </VStack>
          </Box>

          {/* Past Works */}
          <Box>
            <Heading size="md" mb={4}>
              過去のPR実績
            </Heading>
            <InfluencerPrResultsField control={control} errors={errors} />
          </Box>

          <Box mt={4}>
            {showBackButton && onBack ? (
              <ButtonGroup w="full" justifyContent="space-between">
                <Button variant="outline" onClick={onBack} type="button">
                  戻る
                </Button>
                <Button type="submit">
                  {submitButtonIcon && <Icon>{submitButtonIcon}</Icon>}
                  {submitButtonText}
                </Button>
              </ButtonGroup>
            ) : (
              <Button w="full" type="submit">
                {submitButtonIcon && <Icon>{submitButtonIcon}</Icon>}
                {submitButtonText}
              </Button>
            )}
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
