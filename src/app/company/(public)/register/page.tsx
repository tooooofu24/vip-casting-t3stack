"use client";

import { CompanyAddressForm } from "@/app/company/(public)/register/(components)/CompanyAddressForm";
import { CompanyBusinessForm } from "@/app/company/(public)/register/(components)/CompanyBusinessForm";
import { CompanyCompletedCard } from "@/app/company/(public)/register/(components)/CompanyCompletedCard";
import { CompanyInformationForm } from "@/app/company/(public)/register/(components)/CompanyInformationForm";
import { CompanyPaymentForm } from "@/app/company/(public)/register/(components)/CompanyPaymentForm";
import { showErrorToast } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import {
  companyRegisterSchema,
  type CompanyAddressRequest,
  type CompanyBusinessRequest,
  type CompanyInformationRequest,
  type CompanyPaymentRequest,
} from "@/server/api/routers/company/features/auth/register/validation";
import type { CompanyRegisterRequest } from "@/server/api/routers/company/features/auth/register/validations";

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
  const [data, setData] = useState<Partial<CompanyRegisterRequest>>({});

  const steps = useSteps({
    defaultStep: 0,
    count: items.length,
  });

  const onSubmit = <K extends keyof CompanyRegisterRequest>(
    key: K,
    value: CompanyRegisterRequest[K],
  ) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
    steps.goToNextStep();
  };

  const register = api.company.auth.register.useMutation({
    onSuccess: async () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      steps.goToNextStep();
    },
    onError: (error) => {
      showErrorToast(error.data?.code);
    },
  });

  const onRegister = (request: CompanyPaymentRequest) => {
    setData((prev) => ({
      ...prev,
      payment: request,
    }));
    const validated = companyRegisterSchema.safeParse(data);
    if (!validated.success) {
      showErrorToast(validated.error.message);
      return;
    }
    return register.mutate(validated.data);
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
                  defaultValues={data.information}
                  onSubmit={(v: CompanyInformationRequest) =>
                    onSubmit("information", v)
                  }
                />
              </Steps.Content>
              <Steps.Content index={1}>
                <CompanyAddressForm
                  defaultValues={data.address}
                  onSubmit={(v: CompanyAddressRequest) =>
                    onSubmit("address", v)
                  }
                  onBack={() => steps.goToPrevStep()}
                />
              </Steps.Content>
              <Steps.Content index={2}>
                <CompanyBusinessForm
                  defaultValues={data.business}
                  onSubmit={(v: CompanyBusinessRequest) =>
                    onSubmit("business", v)
                  }
                  onBack={() => steps.goToPrevStep()}
                />
              </Steps.Content>
              <Steps.Content index={3}>
                <CompanyPaymentForm
                  defaultValues={data.payment}
                  onSubmit={onRegister}
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
