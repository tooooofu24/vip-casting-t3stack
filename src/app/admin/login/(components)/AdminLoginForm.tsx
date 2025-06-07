"use client";

import type { AdminLoginRequest } from "@/validations/admin/auth";
import { adminLoginSchema } from "@/validations/admin/auth";
import {
  Alert,
  Button,
  Field,
  Icon,
  Input,
  InputGroup,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DefaultValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { LuLock, LuMail } from "react-icons/lu";

type Props = {
  onSubmit: (data: AdminLoginRequest) => void;
  defaultValues?: DefaultValues<AdminLoginRequest>;
};

export const AdminLoginForm = ({ onSubmit, defaultValues }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginRequest>({
    resolver: zodResolver(adminLoginSchema),
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
            placeholder="admin@example.com"
            autoComplete="email"
            {...register("email")}
          />
        </InputGroup>
        <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
      </Field.Root>

      {/* Password Field */}
      <Field.Root invalid={!!errors.password}>
        <Field.Label>パスワード</Field.Label>
        <InputGroup
          startElement={
            <Icon>
              <LuLock />
            </Icon>
          }
        >
          <Input
            type="password"
            placeholder="パスワードを入力"
            autoComplete="current-password"
            {...register("password")}
          />
        </InputGroup>
        <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
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

      {/* Login Button */}
      <Button w="full" type="submit" loading={isSubmitting}>
        ログイン
      </Button>
    </Stack>
  );
};
