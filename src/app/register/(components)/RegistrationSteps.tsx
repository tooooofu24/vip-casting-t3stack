"use client";

import { Steps } from "@chakra-ui/react";

type Props = {
  step: number;
};

const steps = [
  {
    title: "基本情報",
    description: "アカウント情報を入力してください",
  },
  {
    title: "個人情報",
    description: "本人確認情報を入力してください",
  },
  {
    title: "SNS情報",
    description: "SNSアカウントを連携してください",
  },
  {
    title: "案件情報",
    description: "案件に関する情報を入力してください",
  },
] as const;

export function RegistrationSteps({ step }: Props) {
  return (
    <Steps.Root step={step} count={steps.length} size="sm">
      <Steps.List>
        {steps.map((step, i) => {
          return (
            <Steps.Item key={i} index={i} title={step.title}>
              <Steps.Indicator />
              <Steps.Title>{step.title}</Steps.Title>
              <Steps.Separator />
            </Steps.Item>
          );
        })}
      </Steps.List>
      {steps.map((step, index) => (
        <Steps.Content key={index} index={index}>
          {step.description}
        </Steps.Content>
      ))}
      <Steps.CompletedContent>
        全てのステップが完了しました！
      </Steps.CompletedContent>
    </Steps.Root>
  );
}
