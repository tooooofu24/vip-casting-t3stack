"use client";

import { prefectures } from "@/const/prefecture";
import {
  influencerAddressSchema,
  type InfluencerAddressRequest,
} from "@/validations/influencer/register/address";
import {
  Button,
  ButtonGroup,
  Card,
  Field,
  Icon,
  Input,
  InputGroup,
  NativeSelect,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues } from "react-hook-form";
import { LuMapPin } from "react-icons/lu";

// Props型
export type InfluencerAddressFormProps = {
  defaultValues?: DefaultValues<InfluencerAddressRequest>;
  onSubmit: (data: InfluencerAddressRequest) => void;
  onBack: () => void;
};

export function InfluencerAddressForm({
  defaultValues,
  onSubmit,
  onBack,
}: InfluencerAddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InfluencerAddressRequest>({
    resolver: zodResolver(influencerAddressSchema),
    defaultValues,
  });

  return (
    <Card.Root as="form" onSubmit={handleSubmit(onSubmit)}>
      <Card.Body p={{ base: 6, md: 8 }}>
        <VStack gap={6} align="stretch">
          <Field.Root required invalid={!!errors.postalCode}>
            <Field.Label>
              郵便番号
              <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup startElement={<Icon as={LuMapPin} />}>
              <Input
                placeholder="1000001"
                required={false}
                {...register("postalCode")}
              />
            </InputGroup>
            <Field.ErrorText>{errors.postalCode?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.prefecture}>
            <Field.Label>
              都道府県名
              <Field.RequiredIndicator />
            </Field.Label>
            <NativeSelect.Root size="md">
              <NativeSelect.Field
                placeholder="選択してください"
                required={false}
                {...register("prefecture", {
                  setValueAs(v: string) {
                    return v === "" ? undefined : v;
                  },
                })}
              >
                {prefectures.map((pref) => (
                  <option key={pref.value} value={pref.value}>
                    {pref.label}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <Field.ErrorText>{errors.prefecture?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.city}>
            <Field.Label>
              市区町村名
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="千代田区"
              required={false}
              {...register("city")}
            />
            <Field.ErrorText>{errors.city?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.town}>
            <Field.Label>
              町域名
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="千代田"
              required={false}
              {...register("town")}
            />
            <Field.ErrorText>{errors.town?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.street}>
            <Field.Label>
              番地・号
              <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="1-1" required={false} {...register("street")} />
            <Field.ErrorText>{errors.street?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.building}>
            <Field.Label>建物名・部屋番号</Field.Label>
            <Input
              placeholder="千代田ビル302"
              required={false}
              {...register("building")}
            />
            <Field.ErrorText>{errors.building?.message}</Field.ErrorText>
          </Field.Root>
        </VStack>
        {/* Navigation Buttons */}
        <ButtonGroup w="full" justifyContent="space-between" mt={8}>
          <Button variant="outline" onClick={onBack} type="button">
            戻る
          </Button>
          <Button type="submit">次へ</Button>
        </ButtonGroup>
      </Card.Body>
    </Card.Root>
  );
}
