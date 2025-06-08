import { type InfluencerWorkRequest } from "@/server/api/routers/influencer/features/register/work";
import {
  Button,
  Card,
  CloseButton,
  EmptyState,
  Field,
  HStack,
  Icon,
  Input,
  InputGroup,
  NativeSelect,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import {
  Controller,
  useFieldArray,
  type Control,
  type FieldErrors,
} from "react-hook-form";
import { LuBuilding, LuPlus } from "react-icons/lu";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

export function InfluencerPrResultsField({
  control,
  errors,
}: {
  control: Control<InfluencerWorkRequest>;
  errors: FieldErrors<InfluencerWorkRequest>;
}) {
  const { fields, append, remove } = useFieldArray<
    InfluencerWorkRequest,
    "prResults"
  >({
    control,
    name: "prResults",
  });

  return (
    <VStack gap={4} align="stretch">
      {fields.length === 0 && (
        <EmptyState.Root>
          <EmptyState.Content>
            <EmptyState.Indicator>
              <LuBuilding />
            </EmptyState.Indicator>
            <VStack textAlign="center">
              <EmptyState.Title>過去のPR実績がありません</EmptyState.Title>
              <EmptyState.Description>
                これまでに担当したPR案件を追加してください
              </EmptyState.Description>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      )}
      {fields.map((field, index) => (
        <Card.Root key={field.id} variant="outline">
          <Card.Body position="relative">
            <VStack gap={4}>
              <Field.Root invalid={!!errors.prResults?.[index]?.company}>
                <Field.Label>企業名・ブランド名</Field.Label>
                <Controller
                  control={control}
                  name={`prResults.${index}.company`}
                  render={({ field }) => (
                    <InputGroup
                      startElement={
                        <Icon>
                          <LuBuilding />
                        </Icon>
                      }
                    >
                      <Input
                        placeholder="企業名・ブランド名を入力"
                        {...field}
                      />
                    </InputGroup>
                  )}
                />
                <Field.ErrorText>
                  {errors.prResults?.[index]?.company?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.prResults?.[index]?.content}>
                <Field.Label>実施内容</Field.Label>
                <Controller
                  control={control}
                  name={`prResults.${index}.content`}
                  render={({ field }) => (
                    <Textarea
                      rows={2}
                      placeholder="実施内容を入力"
                      {...field}
                    />
                  )}
                />
                <Field.ErrorText>
                  {errors.prResults?.[index]?.content?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root
                invalid={
                  !!errors.prResults?.[index]?.year ||
                  !!errors.prResults?.[index]?.month
                }
              >
                <Field.Label>実施時期</Field.Label>
                <HStack gap={2} w="full">
                  <Controller
                    control={control}
                    name={`prResults.${index}.year`}
                    render={({ field }) => (
                      <>
                        <NativeSelect.Root flex={1}>
                          <NativeSelect.Field
                            placeholder="選択してください"
                            value={field.value ?? ""}
                            onChange={(e) => {
                              const value = e.currentTarget.value;
                              if (value) {
                                field.onChange(Number(value));
                              } else {
                                field.onChange(undefined);
                              }
                            }}
                          >
                            {years.map((y) => (
                              <option key={y} value={y}>
                                {y}年
                              </option>
                            ))}
                          </NativeSelect.Field>
                          <NativeSelect.Indicator />
                        </NativeSelect.Root>
                        <Field.ErrorText>
                          {errors.prResults?.[index]?.year?.message}
                        </Field.ErrorText>
                      </>
                    )}
                  />
                  <Controller
                    control={control}
                    name={`prResults.${index}.month`}
                    render={({ field }) => (
                      <>
                        <NativeSelect.Root flex={1}>
                          <NativeSelect.Field
                            placeholder="選択してください"
                            value={field.value ?? ""}
                            onChange={(e) => {
                              const value = e.currentTarget.value;
                              if (value) {
                                field.onChange(Number(value));
                              } else {
                                field.onChange(undefined);
                              }
                            }}
                          >
                            {months.map((m) => (
                              <option
                                key={m}
                                value={String(m).padStart(2, "0")}
                              >
                                {m}月
                              </option>
                            ))}
                          </NativeSelect.Field>
                          <NativeSelect.Indicator />
                        </NativeSelect.Root>
                        <Field.ErrorText>
                          {errors.prResults?.[index]?.month?.message}
                        </Field.ErrorText>
                      </>
                    )}
                  />
                </HStack>
              </Field.Root>
            </VStack>
            <CloseButton
              position="absolute"
              top={2}
              right={2}
              size="sm"
              onClick={() => remove(index)}
            />
          </Card.Body>
        </Card.Root>
      ))}
      <Button
        variant="ghost"
        size="sm"
        ml="auto"
        onClick={() =>
          append({ company: "", content: "", year: "", month: "" })
        }
      >
        <Icon>
          <LuPlus />
        </Icon>
        実績を追加
      </Button>
      {errors.prResults && (
        <Field.ErrorText>{errors.prResults.message}</Field.ErrorText>
      )}
    </VStack>
  );
}
