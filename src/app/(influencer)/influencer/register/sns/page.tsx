"use client";

import { RegistrationSteps } from "@/app/(influencer)/influencer/register/(components)/RegistrationSteps";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Card,
  Container,
  Field,
  GridItem,
  Heading,
  Icon,
  Input,
  List,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuInstagram, LuTwitter, LuYoutube } from "react-icons/lu";

export default function SnsInfoPage() {
  return (
    <Box py={{ base: 8, md: 12 }}>
      <Container maxW="3xl">
        <VStack gap={12} align="stretch">
          {/* Header */}
          <VStack align="center" gap={2}>
            <Heading size="3xl" fontWeight="bold">
              インフルエンサー登録
            </Heading>
            <Text color="fg.muted" fontSize="md">
              VIPキャスティングで、あなたのキャリアをさらなる高みへ
            </Text>
          </VStack>

          <VStack gap={4} align="stretch">
            <RegistrationSteps step={2} />

            {/* Form Content */}
            <Card.Root>
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
                        <LuInstagram />
                      </Icon>
                      Instagram
                    </Text>
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mt={4}>
                      <GridItem>
                        <Field.Root>
                          <Field.Label>アカウント名</Field.Label>
                          <Input placeholder="@username" />
                        </Field.Root>
                      </GridItem>
                      <GridItem>
                        <Field.Root>
                          <Field.Label>フォロワー数</Field.Label>
                          <Input type="number" placeholder="フォロワー数" />
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
                        <LuYoutube />
                      </Icon>
                      YouTube
                    </Text>
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mt={4}>
                      <GridItem>
                        <Field.Root>
                          <Field.Label>チャンネル名</Field.Label>
                          <Input placeholder="チャンネル名" />
                        </Field.Root>
                      </GridItem>
                      <GridItem>
                        <Field.Root>
                          <Field.Label>登録者数</Field.Label>
                          <Input type="number" placeholder="登録者数" />
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
                        <LuTwitter />
                      </Icon>
                      TikTok
                    </Text>
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mt={4}>
                      <GridItem>
                        <Field.Root>
                          <Field.Label>アカウント名</Field.Label>
                          <Input placeholder="@username" />
                        </Field.Root>
                      </GridItem>
                      <GridItem>
                        <Field.Root>
                          <Field.Label>フォロワー数</Field.Label>
                          <Input type="number" placeholder="フォロワー数" />
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
                        <LuTwitter />
                      </Icon>
                      X(旧Twitter)
                    </Text>
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mt={4}>
                      <GridItem>
                        <Field.Root>
                          <Field.Label>アカウント名</Field.Label>
                          <Input placeholder="@username" />
                        </Field.Root>
                      </GridItem>
                      <GridItem>
                        <Field.Root>
                          <Field.Label>フォロワー数</Field.Label>
                          <Input type="number" placeholder="フォロワー数" />
                        </Field.Root>
                      </GridItem>
                    </SimpleGrid>
                  </Box>

                  {/* Navigation Buttons */}
                  <ButtonGroup
                    width="full"
                    justifyContent="space-between"
                    mt={4}
                  >
                    <Button variant="outline">戻る</Button>
                    <Button type="submit">次へ</Button>
                  </ButtonGroup>

                  {/* Notice */}
                  <Alert.Root status="warning">
                    <Alert.Indicator />
                    <Alert.Content>
                      <Alert.Title mb={2}>
                        SNSアカウント登録について
                      </Alert.Title>
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
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
