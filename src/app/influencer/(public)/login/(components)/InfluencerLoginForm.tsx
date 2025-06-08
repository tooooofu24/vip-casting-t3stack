"use client";

import {
  influencerLoginSchema,
  type InfluencerLoginRequest,
} from "@/server/api/routers/influencer/features/auth/login/validation";
import {
  Button,
  Link as ChakraLink,
  Field,
  Icon,
  Input,
  InputGroup,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import NextLink from "next/link";
import type { DefaultValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { LuArrowRight, LuLock, LuMail } from "react-icons/lu";

type Props = {
  onSubmit: (data: InfluencerLoginRequest) => void;
  defaultValues?: DefaultValues<InfluencerLoginRequest>;
};

export const InfluencerLoginForm = ({ onSubmit, defaultValues }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InfluencerLoginRequest>({
    resolver: zodResolver(influencerLoginSchema),
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
            placeholder="example@example.com"
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
        <NextLink href="/company/forget-password">
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
        ログイン
        <Icon>
          <LuArrowRight />
        </Icon>
      </Button>
    </Stack>
  );
};
