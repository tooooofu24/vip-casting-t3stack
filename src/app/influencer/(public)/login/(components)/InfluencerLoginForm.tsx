"use client";

import {
  influencerLoginSchema,
  type InfluencerLoginRequest,
} from "@/server/api/routers/influencer/features/auth/login/validation";
import {
  Button,
  Link as ChakraLink,
  Checkbox,
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
      <Stack
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
        align={{ base: "flex-start", sm: "center" }}
        gap={2}
      >
        <Checkbox.Root>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>ログイン状態を保持</Checkbox.Label>
        </Checkbox.Root>
        <ChakraLink asChild fontSize="sm">
          <NextLink href="/influencer/forget-password">
            パスワードをお忘れですか？
          </NextLink>
        </ChakraLink>
      </Stack>

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
