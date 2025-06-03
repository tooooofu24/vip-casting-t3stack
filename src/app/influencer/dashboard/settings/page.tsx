"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Field,
  Heading,
  Icon,
  Input,
  NativeSelect,
  Portal,
  Stack,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  LuBell,
  LuCircleAlert,
  LuLock,
  LuMail,
  LuWallet,
} from "react-icons/lu";

export default function SettingsPage() {
  return (
    <Box py={8} bg="gray.50">
      <Container maxW="3xl" px={4}>
        <Heading as="h1" fontSize="2xl" fontWeight="bold" mb={8}>
          設定
        </Heading>

        {/* Notification Settings */}
        <Card.Root mb={6}>
          <Card.Body>
            <Stack gap={6}>
              <Stack direction="row" align="center" gap={2}>
                <Icon as={LuBell} color="purple.600" size="lg" />
                <Heading size="md">通知設定</Heading>
              </Stack>
              <Stack gap={4}>
                <Box>
                  <Stack direction="row" align="center" gap={2} mb={4}>
                    <Icon as={LuMail} color="fg.muted" />
                    <Text fontWeight="medium">メール通知</Text>
                  </Stack>
                  <Stack gap={3}>
                    <Field.Root>
                      <Switch.Root
                        size="lg"
                        w="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Switch.Label>新着案件の通知</Switch.Label>
                        <Switch.HiddenInput />
                        <Switch.Control />
                      </Switch.Root>
                    </Field.Root>

                    <Field.Root>
                      <Switch.Root
                        size="lg"
                        w="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Switch.Label>メッセージの通知</Switch.Label>
                        <Switch.HiddenInput />
                        <Switch.Control />
                      </Switch.Root>
                    </Field.Root>

                    <Field.Root>
                      <Switch.Root
                        size="lg"
                        w="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Switch.Label>ステータス更新の通知</Switch.Label>
                        <Switch.HiddenInput />
                        <Switch.Control />
                      </Switch.Root>
                    </Field.Root>

                    <Field.Root>
                      <Switch.Root
                        size="lg"
                        w="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Switch.Label>ニュースレターの受信</Switch.Label>
                        <Switch.HiddenInput />
                        <Switch.Control />
                      </Switch.Root>
                    </Field.Root>
                  </Stack>
                </Box>

                <Box>
                  <Stack direction="row" align="center" gap={2} mb={4}>
                    <Icon as={LuBell} color="fg.muted" />
                    <Text fontWeight="medium">プッシュ通知</Text>
                  </Stack>
                  <Stack gap={3}>
                    <Field.Root>
                      <Switch.Root
                        size="lg"
                        w="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Switch.Label>新着案件の通知</Switch.Label>
                        <Switch.HiddenInput />
                        <Switch.Control />
                      </Switch.Root>
                    </Field.Root>

                    <Field.Root>
                      <Switch.Root
                        size="lg"
                        w="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Switch.Label>メッセージの通知</Switch.Label>
                        <Switch.HiddenInput />
                        <Switch.Control />
                      </Switch.Root>
                    </Field.Root>

                    <Field.Root>
                      <Switch.Root
                        size="lg"
                        w="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Switch.Label>ステータス更新の通知</Switch.Label>
                        <Switch.HiddenInput />
                        <Switch.Control />
                      </Switch.Root>
                    </Field.Root>
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* Privacy Settings */}
        <Card.Root mb={6}>
          <Card.Body>
            <Stack gap={6}>
              <Stack direction="row" align="center" gap={2}>
                <Icon as={LuLock} color="purple.600" size="lg" />
                <Heading size="md">プライバシー設定</Heading>
              </Stack>
              <Stack gap={4}>
                <Field.Root>
                  <Field.Label>プロフィールの公開範囲</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field>
                      <option value="public">公開</option>
                      <option value="private">非公開</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>

                <Field.Root>
                  <Switch.Root
                    size="lg"
                    w="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Switch.Label>収益を公開する</Switch.Label>
                    <Switch.HiddenInput />
                    <Switch.Control />
                  </Switch.Root>
                </Field.Root>

                <Field.Root>
                  <Switch.Root
                    size="lg"
                    w="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Switch.Label>メッセージを許可する</Switch.Label>
                    <Switch.HiddenInput />
                    <Switch.Control />
                  </Switch.Root>
                </Field.Root>
              </Stack>
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* Payment Settings */}
        <Card.Root mb={6}>
          <Card.Body>
            <Stack gap={6}>
              <Stack direction="row" align="center" gap={2}>
                <Icon as={LuWallet} color="purple.600" size="lg" />
                <Heading size="md">支払い設定</Heading>
              </Stack>
              <Stack gap={4}>
                <Text color="gray.600">
                  振込先口座の情報を登録して、報酬を受け取ることができます。
                </Text>
                <Box p={4} bg="gray.50" rounded="md">
                  <Stack gap={1}>
                    <Text fontSize="sm" color="gray.600">
                      みずほ銀行 渋谷支店
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      普通 1234567
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      タナカ タロウ
                    </Text>
                  </Stack>
                </Box>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button variant="outline">振込先口座を編集</Button>
                  </Dialog.Trigger>
                  <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                      <Dialog.Content maxW="md">
                        <Dialog.Header>
                          <Dialog.Title>振込先口座の編集</Dialog.Title>
                          <Dialog.CloseTrigger asChild>
                            <Button variant="ghost" size="sm">
                              ✕
                            </Button>
                          </Dialog.CloseTrigger>
                        </Dialog.Header>
                        <Dialog.Body>
                          <VStack gap={4}>
                            <Field.Root>
                              <Field.Label>銀行名</Field.Label>
                              <Input defaultValue="みずほ銀行" />
                            </Field.Root>
                            <Field.Root>
                              <Field.Label>支店名</Field.Label>
                              <Input defaultValue="渋谷支店" />
                            </Field.Root>
                            <Field.Root>
                              <Field.Label>口座番号</Field.Label>
                              <Input defaultValue="1234567" />
                            </Field.Root>
                            <Field.Root>
                              <Field.Label>口座名義</Field.Label>
                              <Input defaultValue="タナカ タロウ" />
                            </Field.Root>
                          </VStack>
                        </Dialog.Body>
                        <Dialog.Footer>
                          <Dialog.ActionTrigger asChild>
                            <Button variant="outline">キャンセル</Button>
                          </Dialog.ActionTrigger>
                          <Dialog.ActionTrigger asChild>
                            <Button>保存する</Button>
                          </Dialog.ActionTrigger>
                        </Dialog.Footer>
                      </Dialog.Content>
                    </Dialog.Positioner>
                  </Portal>
                </Dialog.Root>
              </Stack>
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* Security Notice */}
        <Alert.Root status="warning">
          <Alert.Indicator>
            <Icon as={LuCircleAlert} />
          </Alert.Indicator>
          <Alert.Content>
            <Alert.Title>セキュリティ保護のお願い</Alert.Title>
            <Alert.Description>
              アカウントの安全性を高めるため、2段階認証の設定をお勧めします。
            </Alert.Description>
            <Button variant="surface" colorScheme="yellow" size="sm" mt={2}>
              2段階認証を設定する →
            </Button>
          </Alert.Content>
        </Alert.Root>
      </Container>
    </Box>
  );
}
