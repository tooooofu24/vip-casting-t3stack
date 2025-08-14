"use client";

import {
  influencerSnsDefaultValues,
  influencerSnsSchema,
  type InfluencerSnsRequest,
} from "@/server/api/routers/influencer/features/auth/register/validations/sns";
import { setValueAsNumber } from "@/lib/react-hook-form/setValueAsNumber";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Card,
  Field,
  GridItem,
  Icon,
  Input,
  InputGroup,
  List,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues } from "react-hook-form";
import { FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { LuUser } from "react-icons/lu";

export type InfluencerSnsFormProps = {
  defaultValues?: DefaultValues<InfluencerSnsRequest>;
  onSubmit: (data: InfluencerSnsRequest) => void;
  submitButtonText?: string;
  showBackButton?: boolean;
  onBack?: () => void;
};

export function InfluencerSnsForm({
  defaultValues = influencerSnsDefaultValues,
  onSubmit,
  submitButtonText = "次へ",
  showBackButton = true,
  onBack,
}: InfluencerSnsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InfluencerSnsRequest>({
    resolver: zodResolver(influencerSnsSchema),
    defaultValues,
  });

  return (
    <Card.Root as="form" onSubmit={handleSubmit(onSubmit)}>
      <Card.Body p={{ base: 6, md: 8 }}>
        <VStack gap={6} align="stretch">
          {/* Instagram */}
          <Box>
            <Text
              fontWeight="medium"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Icon color="fg.muted">
                <FaInstagram />
              </Icon>
              Instagram
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mt={4}>
              <GridItem>
                <Field.Root invalid={!!errors.instagramName}>
                  <Field.Label>アカウント名</Field.Label>
                  <InputGroup startElement={"@"}>
                    <Input
                      placeholder="username"
                      required={false}
                      {...register("instagramName")}
                    />
                  </InputGroup>
                  <Field.ErrorText>
                    {errors.instagramName?.message}
                  </Field.ErrorText>
                </Field.Root>
              </GridItem>
              <GridItem>
                <Field.Root invalid={!!errors.instagramFollowers}>
                  <Field.Label>フォロワー数</Field.Label>
                  <InputGroup endElement="人">
                    <Input
                      placeholder="10000"
                      required={false}
                      {...register("instagramFollowers", {
                        setValueAs: setValueAsNumber,
                      })}
                    />
                  </InputGroup>
                  <Field.ErrorText>
                    {errors.instagramFollowers?.message}
                  </Field.ErrorText>
                </Field.Root>
              </GridItem>
            </SimpleGrid>
          </Box>

          {/* YouTube */}
          <Box>
            <Text
              fontWeight="medium"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Icon color="fg.muted">
                <FaYoutube />
              </Icon>
              YouTube
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mt={4}>
              <GridItem>
                <Field.Root invalid={!!errors.youtubeName}>
                  <Field.Label>チャンネル名</Field.Label>
                  <InputGroup
                    startElement={<Icon as={LuUser} color="fg.muted" />}
                  >
                    <Input
                      placeholder="チャンネル名"
                      required={false}
                      {...register("youtubeName")}
                    />
                  </InputGroup>
                  <Field.ErrorText>
                    {errors.youtubeName?.message}
                  </Field.ErrorText>
                </Field.Root>
              </GridItem>
              <GridItem>
                <Field.Root invalid={!!errors.youtubeFollowers}>
                  <Field.Label>登録者数</Field.Label>
                  <InputGroup endElement="人">
                    <Input
                      placeholder="10000"
                      required={false}
                      {...register("youtubeFollowers", {
                        setValueAs: setValueAsNumber,
                      })}
                    />
                  </InputGroup>
                  <Field.ErrorText>
                    {errors.youtubeFollowers?.message}
                  </Field.ErrorText>
                </Field.Root>
              </GridItem>
            </SimpleGrid>
          </Box>

          {/* TikTok */}
          <Box>
            <Text
              fontWeight="medium"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Icon color="fg.muted">
                <FaTiktok />
              </Icon>
              TikTok
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mt={4}>
              <GridItem>
                <Field.Root invalid={!!errors.tiktokName}>
                  <Field.Label>アカウント名</Field.Label>
                  <InputGroup startElement={"@"}>
                    <Input
                      placeholder="username"
                      required={false}
                      {...register("tiktokName")}
                    />
                  </InputGroup>
                  <Field.ErrorText>
                    {errors.tiktokName?.message}
                  </Field.ErrorText>
                </Field.Root>
              </GridItem>
              <GridItem>
                <Field.Root invalid={!!errors.tiktokFollowers}>
                  <Field.Label>フォロワー数</Field.Label>
                  <InputGroup endElement="人">
                    <Input
                      placeholder="10000"
                      required={false}
                      {...register("tiktokFollowers", {
                        setValueAs: setValueAsNumber,
                      })}
                    />
                  </InputGroup>
                  <Field.ErrorText>
                    {errors.tiktokFollowers?.message}
                  </Field.ErrorText>
                </Field.Root>
              </GridItem>
            </SimpleGrid>
          </Box>

          {/* X(旧Twitter) */}
          <Box>
            <Text
              fontWeight="medium"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Icon color="fg.muted">
                <FaXTwitter />
              </Icon>
              X(旧Twitter)
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mt={4}>
              <GridItem>
                <Field.Root invalid={!!errors.xName}>
                  <Field.Label>アカウント名</Field.Label>
                  <InputGroup startElement={"@"}>
                    <Input
                      placeholder="username"
                      required={false}
                      {...register("xName")}
                    />
                  </InputGroup>
                  <Field.ErrorText>{errors.xName?.message}</Field.ErrorText>
                </Field.Root>
              </GridItem>
              <GridItem>
                <Field.Root invalid={!!errors.xFollowers}>
                  <Field.Label>フォロワー数</Field.Label>
                  <InputGroup endElement="人">
                    <Input
                      placeholder="10000"
                      required={false}
                      {...register("xFollowers", {
                        setValueAs: setValueAsNumber,
                      })}
                    />
                  </InputGroup>
                  <Field.ErrorText>
                    {errors.xFollowers?.message}
                  </Field.ErrorText>
                </Field.Root>
              </GridItem>
            </SimpleGrid>
          </Box>

          <Box mt={4}>
            {showBackButton && onBack ? (
              <ButtonGroup w="full" justifyContent="space-between">
                <Button variant="outline" onClick={onBack} type="button">
                  戻る
                </Button>
                <Button type="submit">{submitButtonText}</Button>
              </ButtonGroup>
            ) : (
              <Button w="full" type="submit">
                {submitButtonText}
              </Button>
            )}
          </Box>

          {/* Notice */}
          <Alert.Root status="warning">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title mb={2}>SNSアカウント登録について</Alert.Title>
              <Alert.Description>
                <List.Root listStylePosition="inside">
                  <List.Item>SNSアカウントの登録は任意です</List.Item>
                  <List.Item>
                    登録することで、より多くの案件にマッチする可能性が高まります
                  </List.Item>
                  <List.Item>
                    実際に運用しているアカウントを登録してください
                  </List.Item>
                  <List.Item>
                    フォロワー数は定期的に更新することをお勧めします
                  </List.Item>
                  <List.Item>
                    虚偽の情報を登録した場合、アカウントが停止される可能性があります
                  </List.Item>
                </List.Root>
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
