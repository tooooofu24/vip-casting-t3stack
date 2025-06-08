"use client";

import {
  companyResetPasswordSchema,
  type CompanyResetPasswordRequest,
} from "@/server/api/routers/company/features/auth/password/reset/validation";
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
  onSubmit: (data: CompanyResetPasswordRequest) => void;
};

export const ResetPasswordForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanyResetPasswordRequest>({
    resolver: zodResolver(companyResetPasswordSchema),
  });

  return (
    <Stack as="form" gap={4} onSubmit={handleSubmit(onSubmit)}>
      {/* New Password Field */}
      <Field.Root invalid={!!errors.newPassword}>
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
            {...register("newPassword")}
          />
        </InputGroup>
        <Field.ErrorText>{errors.newPassword?.message}</Field.ErrorText>
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
