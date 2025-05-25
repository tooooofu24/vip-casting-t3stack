"use client";

import {
  companyRegisterInformationSchema,
  type CompanyRegisterInformationInput,
} from "@/validations/company/register";
import {
  Alert,
  Box,
  Button,
  Card,
  createListCollection,
  Field,
  Input,
  InputGroup,
  NativeSelect,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues } from "react-hook-form";

const industries = createListCollection({
  items: [
    { label: "小売業", value: "retail" },
    { label: "製造業", value: "manufacturing" },
    { label: "サービス業", value: "service" },
    { label: "IT・通信", value: "it" },
    { label: "金融・保険", value: "finance" },
    { label: "不動産", value: "real_estate" },
    { label: "飲食業", value: "food" },
    { label: "エンターテインメント", value: "entertainment" },
    { label: "その他", value: "other" },
  ],
});

type Props = {
  defaultValues: DefaultValues<CompanyRegisterInformationInput>;
  onSubmit: (data: CompanyRegisterInformationInput) => void;
};

export function CompanyRegisterInformation({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyRegisterInformationInput>({
    resolver: zodResolver(companyRegisterInformationSchema),
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

          <Field.Root required invalid={!!errors.clientName}>
            <Field.Label>
              クライアント名（プロフィール表示名）
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="〇〇ブランド"
              required={false}
              {...register("clientName")}
            />
            <Field.HelperText>
              ※インフルエンサーに表示される名称です
            </Field.HelperText>
            <Field.ErrorText>{errors.clientName?.message}</Field.ErrorText>
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
                  {industries.items.map((industry) => (
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
