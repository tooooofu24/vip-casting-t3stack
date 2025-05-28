"use client";

import {
  companyLoginSchema,
  type CompanyLoginRequest,
} from "@/validations/company/login";
import {
  Button,
  Link as ChakraLink,
  Field,
  HStack,
  Icon,
  Input,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import NextLink from "next/link";
import type { DefaultValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { LuArrowRight, LuLock, LuMail } from "react-icons/lu";

type Props = {
  onSubmit: (data: CompanyLoginRequest) => void;
  defaultValues?: DefaultValues<CompanyLoginRequest>;
};

export const CompanyLoginForm = ({ onSubmit, defaultValues }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanyLoginRequest>({
    resolver: zodResolver(companyLoginSchema),
    defaultValues,
  });

  return (
    <Stack as="form" gap={{ base: 4, sm: 6 }} onSubmit={handleSubmit(onSubmit)}>
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
            placeholder="company@example.com"
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

      {/* Remember Me & Forgot Password */}
      <ChakraLink asChild fontSize="sm" ml="auto">
        <NextLink href="/public/company/forget-password">
          パスワードをお忘れですか？
        </NextLink>
      </ChakraLink>

      {/* Login Button */}
      <Button
        colorPalette="primary"
        w="full"
        type="submit"
        loading={isSubmitting}
      >
        <HStack>
          <Text>ログイン</Text>
          <Icon>
            <LuArrowRight />
          </Icon>
        </HStack>
      </Button>
    </Stack>
  );
};
