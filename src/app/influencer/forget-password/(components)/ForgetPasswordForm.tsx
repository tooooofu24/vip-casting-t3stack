"use client";

import type { InfluencerForgetPasswordRequest } from "@/server/api/routers/influencer/validations/auth/forgetPassword";
import { influencerForgetPasswordSchema } from "@/server/api/routers/influencer/validations/auth/forgetPassword";
import {
  Alert,
  Button,
  Field,
  HStack,
  Icon,
  Input,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DefaultValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { LuArrowRight, LuMail } from "react-icons/lu";

type Props = {
  onSubmit: (data: InfluencerForgetPasswordRequest) => void;
  defaultValues?: DefaultValues<InfluencerForgetPasswordRequest>;
};

export const ForgetPasswordForm = ({ onSubmit, defaultValues }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InfluencerForgetPasswordRequest>({
    resolver: zodResolver(influencerForgetPasswordSchema),
    defaultValues,
  });

  return (
    <Stack as="form" gap={4} onSubmit={handleSubmit(onSubmit)}>
      {/* Email Field */}
      <Field.Root invalid={!!errors.email}>
        <Field.Label>メールアドレス</Field.Label>
        <InputGroup
          startElement={
            <Icon>
              <LuMail />
            </Icon>
          }
        >
          <Input
            type="email"
            placeholder="メールアドレスを入力"
            autoComplete="email"
            {...register("email")}
          />
        </InputGroup>
        <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
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

      {/* Send Button */}
      <Button
        colorPalette="primary"
        w="full"
        type="submit"
        loading={isSubmitting}
      >
        <HStack>
          <Text>パスワードリセットメールを送信</Text>
          <Icon>
            <LuArrowRight />
          </Icon>
        </HStack>
      </Button>
    </Stack>
  );
};
