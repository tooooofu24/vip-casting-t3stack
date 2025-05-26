"use client";

import { industries } from "@/const/industry";
import {
  companyInformationSchema,
  type CompanyInformationRequest,
} from "@/validations/company/register";
import {
  Alert,
  Box,
  Button,
  Card,
  Field,
  Input,
  InputGroup,
  NativeSelect,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues } from "react-hook-form";

type Props = {
  defaultValues: DefaultValues<CompanyInformationRequest>;
  onSubmit: (data: CompanyInformationRequest) => void;
};

export function CompanyInformationForm({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyInformationRequest>({
    resolver: zodResolver(companyInformationSchema),
    defaultValues,
  });

  return (
    <Card.Root as="form" onSubmit={handleSubmit(onSubmit)}>
      <Card.Body p={{ base: 6, md: 8 }}>
        <VStack gap={6} align="stretch">
          <Field.Root required invalid={!!errors.companyName}>
            <Field.Label>
              法人名（正式名称）
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="株式会社〇〇"
              required={false}
              {...register("companyName")}
            />
            <Field.ErrorText>{errors.companyName?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.displayName}>
            <Field.Label>
              プロフィール表示名
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="〇〇ブランド"
              required={false}
              {...register("displayName")}
            />
            <Field.HelperText>
              ※インフルエンサーに表示される名称です
            </Field.HelperText>
            <Field.ErrorText>{errors.displayName?.message}</Field.ErrorText>
          </Field.Root>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            <Field.Root required invalid={!!errors.corporateNumber}>
              <Field.Label>
                法人番号
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="1234567890123"
                required={false}
                {...register("corporateNumber")}
              />
              <Field.ErrorText>
                {errors.corporateNumber?.message}
              </Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={!!errors.ceoName}>
              <Field.Label>
                代表取締役氏名
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="山田太郎"
                required={false}
                {...register("ceoName")}
              />
              <Field.ErrorText>{errors.ceoName?.message}</Field.ErrorText>
            </Field.Root>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            <Field.Root required invalid={!!errors.establishedAt}>
              <Field.Label>
                設立年月日
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                type="date"
                required={false}
                {...register("establishedAt")}
              />
              <Field.ErrorText>{errors.establishedAt?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={!!errors.capital}>
              <Field.Label>
                資本金
                <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup endElement="万円">
                <Input
                  placeholder="1000"
                  required={false}
                  {...register("capital", {
                    setValueAs(v) {
                      return v === "" ? undefined : Number(v);
                    },
                  })}
                />
              </InputGroup>
              <Field.ErrorText>{errors.capital?.message}</Field.ErrorText>
            </Field.Root>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            <Field.Root required invalid={!!errors.numberOfEmployees}>
              <Field.Label>
                従業員数
                <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup endElement="人">
                <Input
                  placeholder="100"
                  required={false}
                  {...register("numberOfEmployees", {
                    setValueAs(v) {
                      return v === "" ? undefined : Number(v);
                    },
                  })}
                />
              </InputGroup>
              <Field.ErrorText>
                {errors.numberOfEmployees?.message}
              </Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={!!errors.industry}>
              <Field.Label>
                業種
                <Field.RequiredIndicator />
              </Field.Label>
              <NativeSelect.Root size="md">
                <NativeSelect.Field
                  placeholder="選択してください"
                  required={false}
                  {...register("industry")}
                >
                  {industries.map((industry) => (
                    <option key={industry.value} value={industry.value}>
                      {industry.label}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <Field.ErrorText>{errors.industry?.message}</Field.ErrorText>
            </Field.Root>
          </SimpleGrid>

          <Field.Root required invalid={!!errors.websiteUrl}>
            <Field.Label>
              会社HP URL
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="url"
              placeholder="https://www.example.com"
              required={false}
              {...register("websiteUrl")}
            />
            <Field.ErrorText>{errors.websiteUrl?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.purpose}>
            <Field.Label>
              プラットフォーム利用目的
              <Field.RequiredIndicator
                fallback={
                  <Text fontSize="xs" color="fg.muted">
                    （任意）
                  </Text>
                }
              />
            </Field.Label>
            <Textarea
              placeholder="プラットフォームの利用目的を入力"
              required={false}
              autoresize
              rows={3}
              {...register("purpose")}
            />
            <Field.ErrorText>{errors.purpose?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.note}>
            <Field.Label>
              備考
              <Field.RequiredIndicator
                fallback={
                  <Text fontSize="xs" color="fg.muted">
                    （任意）
                  </Text>
                }
              />
            </Field.Label>
            <Textarea
              placeholder="備考を入力"
              required={false}
              autoresize
              rows={3}
              {...register("note")}
            />
            <Field.ErrorText>{errors.note?.message}</Field.ErrorText>
          </Field.Root>

          {/* Error Alert */}
          {errors.root?.message && (
            <Alert.Root status="error">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Description>{errors.root?.message}</Alert.Description>
              </Alert.Content>
            </Alert.Root>
          )}
        </VStack>

        <Box mt={8}>
          <Button size="md" w="full" type="submit">
            次へ
          </Button>
        </Box>
      </Card.Body>
    </Card.Root>
  );
}
