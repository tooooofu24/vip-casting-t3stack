"use client";

import { CompanyRegisterAddress } from "@/app/(company)/company/register/(components)/CompanyRegisterAddress";
import { CompanyRegisterBusiness } from "@/app/(company)/company/register/(components)/CompanyRegisterBusiness";
import { CompanyRegisterCompletedCard } from "@/app/(company)/company/register/(components)/CompanyRegisterCompletedCard";
import { CompanyRegisterInformation } from "@/app/(company)/company/register/(components)/CompanyRegisterInformation";
import { CompanyRegisterPayment } from "@/app/(company)/company/register/(components)/CompanyRegisterPayment";
import {
  companyRegisterAddressDefaultValues,
  companyRegisterBusinessDefaultValues,
  companyRegisterInformationDefaultValues,
  companyRegisterPaymentDefaultValues,
  type CompanyRegisterAddressInput,
  type CompanyRegisterBusinessInput,
  type CompanyRegisterInformationInput,
  type CompanyRegisterInput,
  type CompanyRegisterPaymentInput,
} from "@/validations/company/register";
import {
  Box,
  Container,
  Heading,
  Steps,
  Text,
  useSteps,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const items = ["基本情報", "所在地情報", "ビジネス情報", "支払い情報"] as const;

export default function CompanyRegisterPage() {
  const [data, setData] = useState<Partial<CompanyRegisterInput>>({
    ...companyRegisterInformationDefaultValues,
    ...companyRegisterAddressDefaultValues,
    ...companyRegisterBusinessDefaultValues,
    ...companyRegisterPaymentDefaultValues,
  });

  const steps = useSteps({
    defaultStep: 0,
    count: items.length,
  });

  const onSubmit = (
    data:
      | CompanyRegisterInformationInput
      | CompanyRegisterAddressInput
      | CompanyRegisterBusinessInput
      | CompanyRegisterPaymentInput,
  ) => {
    setData({
      ...data,
    });
    steps.goToNextStep();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box py={{ base: 8, md: 12 }}>
      <Container maxW="3xl">
        <VStack gap={12} align="stretch">
          {/* Header */}
          <VStack align="center" gap={2}>
            <Heading size="3xl" fontWeight="bold">
              企業アカウント登録
            </Heading>
            <Text color="fg.muted" fontSize="md">
              インフルエンサーマッチングを始めましょう
            </Text>
          </VStack>

          <VStack gap={4} align="stretch">
            <Steps.RootProvider value={steps} size="sm">
              <Steps.List mb={4}>
                {items.map((title, i) => (
                  <Steps.Item key={i} index={i} title={title}>
                    <Steps.Indicator />
                    <Steps.Title>{title}</Steps.Title>
                    <Steps.Separator />
                  </Steps.Item>
                ))}
              </Steps.List>
              <Steps.Content index={0}>
                <CompanyRegisterInformation
                  defaultValues={data}
                  onSubmit={onSubmit}
                />
              </Steps.Content>
              <Steps.Content index={1}>
                <CompanyRegisterAddress
                  defaultValues={data}
                  onSubmit={onSubmit}
                  onBack={() => steps.goToPrevStep()}
                />
              </Steps.Content>
              <Steps.Content index={2}>
                <CompanyRegisterBusiness
                  defaultValues={data}
                  onSubmit={onSubmit}
                  onBack={() => steps.goToPrevStep()}
                />
              </Steps.Content>
              <Steps.Content index={3}>
                <CompanyRegisterPayment
                  defaultValues={data}
                  onSubmit={onSubmit}
                  onBack={() => steps.goToPrevStep()}
                />
              </Steps.Content>
              <Steps.CompletedContent>
                <CompanyRegisterCompletedCard />
              </Steps.CompletedContent>
            </Steps.RootProvider>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
