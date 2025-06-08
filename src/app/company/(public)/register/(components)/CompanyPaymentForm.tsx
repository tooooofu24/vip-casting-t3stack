"use client";

import { accountTypes } from "@/const/accountType";
import { prefectures } from "@/const/prefecture";
import {
  companyPaymentSchema,
  type CompanyPaymentRequest,
} from "@/server/api/routers/company/features/auth/register/validations/payment";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Field,
  Heading,
  Icon,
  Input,
  InputGroup,
  NativeSelect,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues } from "react-hook-form";
import { LuCreditCard, LuMapPin, LuSend, LuUser } from "react-icons/lu";

type Props = {
  defaultValues?: DefaultValues<CompanyPaymentRequest>;
  onSubmit: (data: CompanyPaymentRequest) => void;
  onBack?: () => void;
};

export function CompanyPaymentForm({ defaultValues, onSubmit, onBack }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanyPaymentRequest>({
    resolver: zodResolver(companyPaymentSchema),
    defaultValues,
  });

  return (
    <Card.Root as="form" onSubmit={handleSubmit(onSubmit)}>
      <Card.Body p={{ base: 6, md: 8 }}>
        <VStack gap={8} align="stretch">
          {/* Bank Account Information */}
          <Box>
            <Heading size="md" mb={4}>
              銀行口座情報
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <Field.Root required invalid={!!errors.bankName}>
                <Field.Label>
                  銀行名
                  <Field.RequiredIndicator />
                </Field.Label>
                <InputGroup
                  startElement={
                    <Icon color="fg.muted">
                      <LuCreditCard />
                    </Icon>
                  }
                >
                  <Input
                    placeholder="銀行名を入力"
                    required={false}
                    {...register("bankName")}
                  />
                </InputGroup>
                <Field.ErrorText>{errors.bankName?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root required invalid={!!errors.branchName}>
                <Field.Label>
                  支店名
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="支店名を入力"
                  required={false}
                  {...register("branchName")}
                />
                <Field.ErrorText>{errors.branchName?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root required invalid={!!errors.accountType}>
                <Field.Label>
                  口座種別
                  <Field.RequiredIndicator />
                </Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    required={false}
                    {...register("accountType")}
                  >
                    {accountTypes.map((accountType) => (
                      <option key={accountType.value} value={accountType.value}>
                        {accountType.label}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
                <Field.ErrorText>{errors.accountType?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root required invalid={!!errors.accountNumber}>
                <Field.Label>
                  口座番号
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="口座番号を入力"
                  required={false}
                  {...register("accountNumber")}
                />
                <Field.ErrorText>
                  {errors.accountNumber?.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root
                required
                gridColumn="span 2"
                invalid={!!errors.accountHolder}
              >
                <Field.Label>
                  口座名義（カナ）
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="口座名義を入力"
                  required={false}
                  {...register("accountHolder")}
                />
                <Field.ErrorText>
                  {errors.accountHolder?.message}
                </Field.ErrorText>
              </Field.Root>
            </SimpleGrid>
          </Box>

          {/* Billing Address */}
          <Box>
            <Heading size="md" mb={4}>
              請求書送付先情報
            </Heading>
            <VStack gap={4} align="stretch">
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <Field.Root required invalid={!!errors.billingPostalCode}>
                  <Field.Label>
                    郵便番号
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <InputGroup
                    startElement={
                      <Icon color="fg.muted">
                        <LuMapPin />
                      </Icon>
                    }
                  >
                    <Input
                      placeholder="1000001"
                      required={false}
                      {...register("billingPostalCode")}
                    />
                  </InputGroup>
                  <Field.ErrorText>
                    {errors.billingPostalCode?.message}
                  </Field.ErrorText>
                </Field.Root>

                <Field.Root required invalid={!!errors.billingPrefecture}>
                  <Field.Label>
                    都道府県
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      required={false}
                      placeholder="選択してください"
                      {...register("billingPrefecture")}
                    >
                      {prefectures.map((prefecture) => (
                        <option key={prefecture.value} value={prefecture.value}>
                          {prefecture.label}
                        </option>
                      ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                  <Field.ErrorText>
                    {errors.billingPrefecture?.message}
                  </Field.ErrorText>
                </Field.Root>
              </SimpleGrid>

              <Field.Root required invalid={!!errors.billingCity}>
                <Field.Label>
                  市区町村
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="市区町村を入力"
                  required={false}
                  {...register("billingCity")}
                />
                <Field.ErrorText>{errors.billingCity?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root required invalid={!!errors.billingAddress}>
                <Field.Label>
                  番地
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="番地を入力"
                  required={false}
                  {...register("billingAddress")}
                />
                <Field.ErrorText>
                  {errors.billingAddress?.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.billingBuilding}>
                <Field.Label>
                  建物名・階数
                  <Field.RequiredIndicator
                    fallback={
                      <Text as="span" fontSize="xs" color="fg.muted">
                        （任意）
                      </Text>
                    }
                  />
                </Field.Label>
                <Input
                  placeholder="建物名・階数を入力"
                  required={false}
                  {...register("billingBuilding")}
                />
                <Field.ErrorText>
                  {errors.billingBuilding?.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root required invalid={!!errors.billingContactName}>
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
                    placeholder="担当者名を入力"
                    required={false}
                    {...register("billingContactName")}
                  />
                </InputGroup>
                <Field.ErrorText>
                  {errors.billingContactName?.message}
                </Field.ErrorText>
              </Field.Root>
            </VStack>
          </Box>

          {/* Navigation Buttons */}
          <ButtonGroup w="full" justifyContent="space-between">
            <Button variant="outline" type="button" onClick={onBack}>
              戻る
            </Button>
            <Button type="submit" loading={isSubmitting}>
              <Icon>
                <LuSend />
              </Icon>
              登録する
            </Button>
          </ButtonGroup>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
