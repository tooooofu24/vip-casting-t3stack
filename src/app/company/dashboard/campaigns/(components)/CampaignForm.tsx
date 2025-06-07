"use client";

import { TagInputField } from "@/app/(components)/fields/TagInputField";
import { platforms } from "@/const/platform";
import { rewardTypes } from "@/const/rewardType";
import type {
  CampaignFormData,
  CampaignFormSchema,
} from "@/validations/company/campaign";
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
import { zodResolver } from "@hookform/resolvers/zod";
import type { DefaultValues } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { LuSave } from "react-icons/lu";

type Props = {
  onSubmit: (data: CampaignFormData) => void;
  schema: CampaignFormSchema;
  defaultValues?: DefaultValues<CampaignFormData>;
};

export const CampaignForm = ({ onSubmit, defaultValues, schema }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CampaignFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Card.Root bg="white" as="form" onSubmit={handleSubmit(onSubmit)}>
      <Card.Body>
        <VStack gap="6" align="stretch">
          <input type="hidden" {...register("id")} />
          <Field.Root required invalid={!!errors.title}>
            <Field.Label>
              案件タイトル <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="案件のタイトルを入力" {...register("title")} />
            <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.description}>
            <Field.Label>
              案件詳細 <Field.RequiredIndicator />
            </Field.Label>
            <Textarea
              placeholder="案件の詳細を入力"
              rows={5}
              {...register("description")}
            />
            <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
          </Field.Root>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="full">
            <Field.Root required invalid={!!errors.platform}>
              <Field.Label>
                プラットフォーム <Field.RequiredIndicator />
              </Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field
                  placeholder="プラットフォームを選択"
                  {...register("platform")}
                >
                  {platforms.map((platform) => (
                    <option key={platform.value} value={platform.value}>
                      {platform.label}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <Field.ErrorText>{errors.platform?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root required invalid={!!errors.recruitment}>
              <Field.Label>
                募集人数 <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup endElement="人">
                <Input
                  type="number"
                  min={1}
                  max={1000000}
                  {...register("recruitment", { valueAsNumber: true })}
                />
              </InputGroup>
              <Field.ErrorText>{errors.recruitment?.message}</Field.ErrorText>
            </Field.Root>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            <Field.Root required invalid={!!errors.applicationDue}>
              <Field.Label>
                応募期限 <Field.RequiredIndicator />
              </Field.Label>
              <Input type="date" {...register("applicationDue")} />
              <Field.ErrorText>
                {errors.applicationDue?.message}
              </Field.ErrorText>
            </Field.Root>
            <Field.Root required invalid={!!errors.postDue}>
              <Field.Label>
                投稿期限 <Field.RequiredIndicator />
              </Field.Label>
              <Input type="date" {...register("postDue")} />
              <Field.ErrorText>{errors.postDue?.message}</Field.ErrorText>
            </Field.Root>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            <Field.Root required invalid={!!errors.rewardType}>
              <Field.Label>
                報酬形態 <Field.RequiredIndicator />
              </Field.Label>
              <RadioGroup.Root {...register("rewardType")}>
                <HStack gap="6">
                  {rewardTypes.map((type) => (
                    <RadioGroup.Item key={type.value} value={type.value}>
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>{type.label}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </HStack>
              </RadioGroup.Root>
              <Field.ErrorText>{errors.rewardType?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.rewardAmount}>
              <Field.Label>報酬金額</Field.Label>
              <InputGroup endElement="円">
                <Input
                  type="number"
                  min={1}
                  max={1000000}
                  {...register("rewardAmount", { valueAsNumber: true })}
                />
              </InputGroup>
              <Field.HelperText>
                フォロワー単価は1円から10円の間で設定できます。
                例：フォロワー単価2円、フォロワー数10,000人の場合、報酬は20,000円となります。
              </Field.HelperText>
              <Field.ErrorText>{errors.rewardAmount?.message}</Field.ErrorText>
            </Field.Root>
          </SimpleGrid>

          <Field.Root invalid={!!errors.requirements}>
            <Field.Label>応募条件</Field.Label>
            <Controller
              control={control}
              name="requirements"
              render={({ field }) => (
                <TagInputField
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="例: フォロワー1万人以上、美容系アカウント歓迎"
                />
              )}
            />
            <Field.ErrorText>{errors.requirements?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.note}>
            <Field.Label>備考</Field.Label>
            <Textarea rows={4} placeholder="備考を入力" {...register("note")} />
            <Field.ErrorText>{errors.note?.message}</Field.ErrorText>
          </Field.Root>

          <HStack justify="flex-end" mt={6}>
            <Button type="submit" loading={isSubmitting}>
              <Icon as={LuSave} boxSize={4} mr={1} />
              保存する
            </Button>
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
