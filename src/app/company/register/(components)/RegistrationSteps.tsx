"use client";

import { Steps } from "@chakra-ui/react";

type Props = {
  step: number;
};

const steps = [
  {
    title: "基本情報",
    description: "会社の基本情報を入力してください",
  },
  {
    title: "所在地情報",
    description: "会社の所在地を入力してください",
  },
  {
    title: "ビジネス情報",
    description: "案件に関する情報を入力してください",
  },
  {
    title: "支払い情報",
    description: "銀行口座・請求書の情報を入力してください",
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
        全ての情報の入力が完了しました！
      </Steps.CompletedContent>
    </Steps.Root>
  );
}
