"use client";

import {
  resetPasswordSchema,
  type ResetPasswordRequest,
} from "@/validations/company/resetPassword";
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
import { useForm } from "react-hook-form";
import { LuArrowRight, LuLock } from "react-icons/lu";

type Props = {
  onSubmit: (data: ResetPasswordRequest) => void;
};

export const ResetPasswordForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordRequest>({
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <Stack as="form" gap={4} onSubmit={handleSubmit(onSubmit)}>
      {/* New Password Field */}
      <Field.Root invalid={!!errors.password}>
        <Field.Label>新しいパスワード</Field.Label>
        <InputGroup
          startElement={
            <Icon>
              <LuLock />
            </Icon>
          }
        >
          <Input
            type="password"
            placeholder="新しいパスワードを入力"
            autoComplete="new-password"
            {...register("password")}
          />
        </InputGroup>
        <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
      </Field.Root>

      {/* Confirm Password Field */}
      <Field.Root invalid={!!errors.confirmPassword}>
        <Field.Label>新しいパスワード（確認）</Field.Label>
        <InputGroup
          startElement={
            <Icon>
              <LuLock />
            </Icon>
          }
        >
          <Input
            type="password"
            placeholder="もう一度入力"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
        </InputGroup>
        <Field.ErrorText>{errors.confirmPassword?.message}</Field.ErrorText>
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

      {/* Set Password Button */}
      <Button
        colorPalette="primary"
        w="full"
        type="submit"
        loading={isSubmitting}
      >
        <HStack>
          <Text>パスワードを設定</Text>
          <Icon>
            <LuArrowRight />
          </Icon>
        </HStack>
      </Button>
    </Stack>
  );
};
