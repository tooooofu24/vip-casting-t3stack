"use client";

import { CompanyAddressForm } from "@/app/(company)/company/register/(components)/CompanyAddressForm";
import { CompanyBusinessForm } from "@/app/(company)/company/register/(components)/CompanyBusinessForm";
import { CompanyCompletedCard } from "@/app/(company)/company/register/(components)/CompanyCompletedCard";
import { CompanyInformationForm } from "@/app/(company)/company/register/(components)/CompanyInformationForm";
import { CompanyPaymentForm } from "@/app/(company)/company/register/(components)/CompanyPaymentForm";
import {
  companyAddressDefaultValues,
  companyBusinessDefaultValues,
  companyInformationDefaultValues,
  companyPaymentDefaultValues,
  type CompanyAddressRequest,
  type CompanyBusinessRequest,
  type CompanyInformationRequest,
  type CompanyPaymentRequest,
  type CompanyRequest,
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
  const [data, setData] = useState<Partial<CompanyRequest>>({
    ...companyInformationDefaultValues,
    ...companyAddressDefaultValues,
    ...companyBusinessDefaultValues,
    ...companyPaymentDefaultValues,
  });

  const steps = useSteps({
    defaultStep: 0,
    count: items.length,
  });

  const onSubmit = (
    data:
      | CompanyInformationRequest
      | CompanyAddressRequest
      | CompanyBusinessRequest
      | CompanyPaymentRequest,
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
                <CompanyInformationForm
                  defaultValues={data}
                  onSubmit={onSubmit}
                />
              </Steps.Content>
              <Steps.Content index={1}>
                <CompanyAddressForm
                  defaultValues={data}
                  onSubmit={onSubmit}
                  onBack={() => steps.goToPrevStep()}
                />
              </Steps.Content>
              <Steps.Content index={2}>
                <CompanyBusinessForm
                  defaultValues={data}
                  onSubmit={onSubmit}
                  onBack={() => steps.goToPrevStep()}
                />
              </Steps.Content>
              <Steps.Content index={3}>
                <CompanyPaymentForm
                  defaultValues={data}
                  onSubmit={onSubmit}
                  onBack={() => steps.goToPrevStep()}
                />
              </Steps.Content>
              <Steps.CompletedContent>
                <CompanyCompletedCard />
              </Steps.CompletedContent>
            </Steps.RootProvider>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
