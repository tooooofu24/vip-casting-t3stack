"use client";

import { InfluencerAddressForm } from "@/app/(influencer)/(public)/register/(components)/InfluencerAddressForm";
import { InfluencerCompletedCard } from "@/app/(influencer)/(public)/register/(components)/InfluencerCompletedCard";
import { InfluencerInformationForm } from "@/app/(influencer)/(public)/register/(components)/InfluencerInformationForm";
import { InfluencerSnsForm } from "@/app/(influencer)/(public)/register/(components)/InfluencerSnsForm";
import { InfluencerWorkForm } from "@/app/(influencer)/(public)/register/(components)/InfluencerWorkForm";
import { influencerAddressDefaultValues } from "@/validations/influencer/register/address";
import { influencerInformationDefaultValues } from "@/validations/influencer/register/information";
import { influencerSnsDefaultValues } from "@/validations/influencer/register/sns";
import { influencerWorkDefaultValues } from "@/validations/influencer/register/work";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  Steps,
  Text,
  useSteps,
  VStack,
} from "@chakra-ui/react";

const items = ["基本情報", "住所情報", "SNS情報", "案件情報"] as const;

export default function RegisterPage() {
  const steps = useSteps({
    defaultStep: 3,
    count: items.length,
  });
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
                  onSubmit={() => {
                    steps.goToNextStep();
                  }}
                  defaultValues={influencerInformationDefaultValues}
                />
              </Steps.Content>
              <Steps.Content index={1}>
                <InfluencerAddressForm
                  onSubmit={() => {
                    steps.goToNextStep();
                  }}
                  onBack={() => {
                    steps.goToPrevStep();
                  }}
                  defaultValues={influencerAddressDefaultValues}
                />
              </Steps.Content>
              <Steps.Content index={2}>
                <InfluencerSnsForm
                  onSubmit={() => {
                    steps.goToNextStep();
                  }}
                  onBack={() => {
                    steps.goToPrevStep();
                  }}
                  defaultValues={influencerSnsDefaultValues}
                />
              </Steps.Content>
              <Steps.Content index={3}>
                <InfluencerWorkForm
                  defaultValues={influencerWorkDefaultValues}
                  onSubmit={() => {
                    steps.goToNextStep();
                  }}
                  onBack={() => {
                    steps.goToPrevStep();
                  }}
                />
              </Steps.Content>
              <Steps.CompletedContent>
                <InfluencerCompletedCard />
              </Steps.CompletedContent>
              <ButtonGroup size="sm" variant="outline">
                <Steps.PrevTrigger asChild>
                  <Button>Prev</Button>
                </Steps.PrevTrigger>
                <Steps.NextTrigger asChild>
                  <Button>Next</Button>
                </Steps.NextTrigger>
              </ButtonGroup>
            </Steps.RootProvider>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
