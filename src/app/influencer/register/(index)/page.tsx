"use client";

import { InfluencerAddressForm } from "@/app/influencer/register/(components)/InfluencerAddressForm";
import { InfluencerCompletedCard } from "@/app/influencer/register/(components)/InfluencerCompletedCard";
import { InfluencerInformationForm } from "@/app/influencer/register/(components)/InfluencerInformationForm";
import { InfluencerSnsForm } from "@/app/influencer/register/(components)/InfluencerSnsForm";
import { InfluencerWorkForm } from "@/app/influencer/register/(components)/InfluencerWorkForm";
import { showErrorToast } from "@/lib/chakra-ui/toaster";
import { api } from "@/lib/trpc/react";
import {
  influencerRegisterSchema,
  type InfluencerRegisterRequest,
} from "@/server/api/routers/influencer/features/register/validations";
import {
  influencerAddressDefaultValues,
  type InfluencerAddressRequest,
} from "@/server/api/routers/influencer/features/register/validations/address";
import {
  influencerInformationDefaultValues,
  type InfluencerInformationRequest,
} from "@/server/api/routers/influencer/features/register/validations/information";
import {
  influencerSnsDefaultValues,
  type InfluencerSnsRequest,
} from "@/server/api/routers/influencer/features/register/validations/sns";
import {
  influencerWorkDefaultValues,
  type InfluencerWorkRequest,
} from "@/server/api/routers/influencer/features/register/validations/work";
import type { UseStepsReturn } from "@chakra-ui/react";
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

const items = ["基本情報", "住所情報", "SNS情報", "案件情報"] as const;

export default function RegisterPage() {
  const [data, setData] = useState<Partial<InfluencerRegisterRequest>>({});

  const steps: UseStepsReturn = useSteps({
    defaultStep: 0,
    count: items.length,
  });

  const onSubmit = <K extends keyof InfluencerRegisterRequest>(
    key: K,
    value: InfluencerRegisterRequest[K],
  ) => {
    setData((prev: Partial<InfluencerRegisterRequest>) => ({
      ...prev,
      [key]: value,
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
    steps.goToNextStep();
  };

  const register = api.influencer.register.useMutation({
    onSuccess: async () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      steps.goToNextStep();
    },
    onError: (error: unknown) => {
      showErrorToast(error instanceof Error ? error.message : "不明なエラー");
    },
  });

  const onRegister = (request: InfluencerWorkRequest): void => {
    const nextData = { ...data, work: request };
    setData(nextData);
    const validated = influencerRegisterSchema.safeParse(nextData);
    if (!validated.success) {
      showErrorToast(validated.error.message);
      return;
    }
    register.mutate(validated.data);
  };

  return (
    <Box py={{ base: 8, md: 12 }}>
      <Container maxW="3xl">
        <VStack gap={12} align="stretch">
          {/* Header */}
          <VStack align="center" gap={2}>
            <Heading size="3xl" fontWeight="bold">
              インフルエンサー登録
            </Heading>
            <Text color="fg.muted" fontSize="md">
              VIPキャスティングで、あなたのキャリアをさらなる高みへ
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
                <InfluencerInformationForm
                  onSubmit={(v: InfluencerInformationRequest) =>
                    onSubmit("information", v)
                  }
                  defaultValues={influencerInformationDefaultValues}
                />
              </Steps.Content>
              <Steps.Content index={1}>
                <InfluencerAddressForm
                  onSubmit={(v: InfluencerAddressRequest) =>
                    onSubmit("address", v)
                  }
                  onBack={() => steps.goToPrevStep()}
                  defaultValues={influencerAddressDefaultValues}
                />
              </Steps.Content>
              <Steps.Content index={2}>
                <InfluencerSnsForm
                  onSubmit={(v: InfluencerSnsRequest) => onSubmit("sns", v)}
                  onBack={() => steps.goToPrevStep()}
                  defaultValues={influencerSnsDefaultValues}
                />
              </Steps.Content>
              <Steps.Content index={3}>
                <InfluencerWorkForm
                  defaultValues={influencerWorkDefaultValues}
                  onSubmit={onRegister}
                  onBack={() => steps.goToPrevStep()}
                />
              </Steps.Content>
              <Steps.CompletedContent>
                <InfluencerCompletedCard />
              </Steps.CompletedContent>
            </Steps.RootProvider>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
