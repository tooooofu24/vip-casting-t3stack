"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Field,
  Heading,
  Icon,
  NativeSelect,
  Stack,
  Switch,
  Tabs,
  Text,
} from "@chakra-ui/react";
import {
  LuCalendar,
  LuCreditCard,
  LuKey,
  LuLock,
  LuMail,
  LuPlus,
  LuSmartphone,
  LuTrash,
} from "react-icons/lu";

export default function SettingsPage() {
  return (
    <Container maxW="4xl" py="8">
      <Box>
        <Stack gap="8">
          <Stack gap="4">
            <Heading as="h1" size="lg">
              設定
            </Heading>
            <Text color="fg.muted">
              アカウントの設定を管理します。通知、プライバシー、支払い方法などを変更できます。
            </Text>
          </Stack>

          {/* Tabs */}
          <Tabs.Root defaultValue="notifications">
            <Tabs.List borderBottomWidth="1px" borderColor="border.subtle">
              <Tabs.Trigger value="notifications">通知設定</Tabs.Trigger>
              <Tabs.Trigger value="privacy">プライバシー</Tabs.Trigger>
              <Tabs.Trigger value="payment">支払い設定</Tabs.Trigger>
              <Tabs.Trigger value="security">セキュリティ</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="notifications">
              <Card.Root>
                <Card.Body>
                  <Stack gap="8">
                    {/* メール通知 */}
                    <Stack gap="4">
                      <Heading
                        size="md"
                        display="flex"
                        alignItems="center"
                        gap="2"
                      >
                        <Icon as={LuMail} />
                        メール通知
                      </Heading>
                      <Stack gap="4">
                        <Field.Root>
                          <Switch.Root
                            defaultChecked
                            display="flex"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Switch.Label>新規案件の通知</Switch.Label>
                            <Switch.HiddenInput />
                            <Switch.Control />
                          </Switch.Root>
                        </Field.Root>
                        <Field.Root>
                          <Switch.Root
                            defaultChecked
                            display="flex"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Switch.Label>メッセージの通知</Switch.Label>
                            <Switch.HiddenInput />
                            <Switch.Control />
                          </Switch.Root>
                        </Field.Root>
                        <Field.Root>
                          <Switch.Root
                            display="flex"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Switch.Label>ステータス更新の通知</Switch.Label>
                            <Switch.HiddenInput />
                            <Switch.Control />
                          </Switch.Root>
                        </Field.Root>
                        <Field.Root>
                          <Switch.Root
                            defaultChecked
                            display="flex"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Switch.Label>ニュースレター</Switch.Label>
                            <Switch.HiddenInput />
                            <Switch.Control />
                          </Switch.Root>
                        </Field.Root>
                      </Stack>
                    </Stack>

                    {/* プッシュ通知 */}
                    <Stack gap="4">
                      <Heading
                        size="md"
                        display="flex"
                        alignItems="center"
                        gap="2"
                      >
                        <Icon as={LuSmartphone} />
                        プッシュ通知
                      </Heading>
                      <Stack gap="4">
                        <Field.Root>
                          <Switch.Root
                            defaultChecked
                            display="flex"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Switch.Label>新規案件の通知</Switch.Label>
                            <Switch.HiddenInput />
                            <Switch.Control />
                          </Switch.Root>
                        </Field.Root>
                        <Field.Root>
                          <Switch.Root
                            defaultChecked
                            display="flex"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Switch.Label>メッセージの通知</Switch.Label>
                            <Switch.HiddenInput />
                            <Switch.Control />
                          </Switch.Root>
                        </Field.Root>
                        <Field.Root>
                          <Switch.Root
                            defaultChecked
                            display="flex"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Switch.Label>ステータス更新の通知</Switch.Label>
                            <Switch.HiddenInput />
                            <Switch.Control />
                          </Switch.Root>
                        </Field.Root>
                      </Stack>
                    </Stack>
                  </Stack>
                </Card.Body>
              </Card.Root>
            </Tabs.Content>

            {/* プライバシー設定 */}
            <Tabs.Content value="privacy">
              <Card.Root>
                <Card.Body>
                  <Stack gap="6">
                    <Stack gap="4">
                      <Heading
                        size="md"
                        display="flex"
                        alignItems="center"
                        gap="2"
                      >
                        <Icon as={LuLock} />
                        プライバシー設定
                      </Heading>
                    </Stack>

                    <Stack gap="6">
                      <Field.Root>
                        <Field.Label>プロフィールの公開範囲</Field.Label>
                        <NativeSelect.Root>
                          <NativeSelect.Field defaultValue="public">
                            <option value="public">全体に公開</option>
                            <option value="private">非公開</option>
                            <option value="connections">
                              取引のある企業のみ
                            </option>
                          </NativeSelect.Field>
                          <NativeSelect.Indicator />
                        </NativeSelect.Root>
                      </Field.Root>

                      <Field.Root>
                        <Switch.Root
                          defaultChecked
                          display="flex"
                          justifyContent="space-between"
                          w="full"
                        >
                          <Switch.Label>収益情報を公開する</Switch.Label>
                          <Switch.HiddenInput />
                          <Switch.Control />
                        </Switch.Root>
                      </Field.Root>

                      <Field.Root>
                        <Switch.Root
                          defaultChecked
                          display="flex"
                          justifyContent="space-between"
                          w="full"
                        >
                          <Switch.Label>
                            メッセージの受信を許可する
                          </Switch.Label>
                          <Switch.HiddenInput />
                          <Switch.Control />
                        </Switch.Root>
                      </Field.Root>
                    </Stack>
                  </Stack>
                </Card.Body>
              </Card.Root>
            </Tabs.Content>

            {/* 支払い設定 */}
            <Tabs.Content value="payment">
              <Stack gap="6">
                {/* 支払い方法 */}
                <Card.Root>
                  <Card.Body>
                    <Stack gap="4">
                      <Heading size="md">支払い方法</Heading>
                      <Text color="fg.muted">
                        登録されているクレジットカードを管理します。
                      </Text>
                      <Card.Root variant="outline">
                        <Card.Body>
                          <Stack
                            direction="row"
                            justify="space-between"
                            align="center"
                          >
                            <Stack direction="row" gap="4" align="center">
                              <Icon as={LuCreditCard} color="fg.muted" />
                              <Stack gap="1">
                                <Text fontWeight="medium">
                                  **** **** **** 4242
                                </Text>
                                <Text fontSize="sm" color="fg.muted">
                                  有効期限: 12/25
                                </Text>
                              </Stack>
                            </Stack>
                            <Button
                              variant="ghost"
                              colorPalette="red"
                              size="sm"
                            >
                              <Icon as={LuTrash} />
                              削除
                            </Button>
                          </Stack>
                        </Card.Body>
                      </Card.Root>
                      <Button variant="outline" colorPalette="blue">
                        <Icon as={LuPlus} />
                        新しいカードを追加
                      </Button>
                    </Stack>
                  </Card.Body>
                </Card.Root>

                {/* 振り込み先 */}
                <Card.Root>
                  <Card.Body>
                    <Stack gap="4">
                      <Heading size="md">振り込み先</Heading>
                      <Text color="fg.muted">
                        登録されている銀行口座を管理します。
                      </Text>
                      <Card.Root variant="outline">
                        <Card.Body>
                          <Stack
                            direction="row"
                            justify="space-between"
                            align="center"
                          >
                            <Stack direction="row" gap="4" align="center">
                              <Icon
                                as={LuSmartphone} // 銀行アイコンがなければスマホで代用
                                color="fg.muted"
                              />
                              <Stack gap="1">
                                <Text fontWeight="medium">
                                  みずほ銀行 渋谷支店
                                </Text>
                                <Text fontSize="sm" color="fg.muted">
                                  普通 1234567
                                </Text>
                                <Text fontSize="sm" color="fg.muted">
                                  カ）カイエン
                                </Text>
                              </Stack>
                            </Stack>
                            <Button
                              variant="ghost"
                              colorPalette="red"
                              size="sm"
                            >
                              <Icon as={LuTrash} />
                              削除
                            </Button>
                          </Stack>
                        </Card.Body>
                      </Card.Root>
                      <Button variant="outline" colorPalette="blue">
                        <Icon as={LuPlus} />
                        銀行口座を追加
                      </Button>
                    </Stack>
                  </Card.Body>
                </Card.Root>

                {/* 支払いスケジュール */}
                <Card.Root>
                  <Card.Body>
                    <Stack gap="4">
                      <Heading size="md">支払いスケジュール</Heading>
                      <Stack
                        direction="row"
                        gap="4"
                        align="center"
                        color="fg.muted"
                      >
                        <Icon as={LuCalendar} />
                        <Text>毎月末締め翌月15日払い</Text>
                      </Stack>
                    </Stack>
                  </Card.Body>
                </Card.Root>
              </Stack>
            </Tabs.Content>

            {/* セキュリティ設定 */}
            <Tabs.Content value="security">
              <Card.Root>
                <Card.Body>
                  <Stack gap="6">
                    <Stack gap="4">
                      <Heading size="md">セキュリティ設定</Heading>
                      <Text color="fg.muted">
                        アカウントのセキュリティ設定を管理します。
                      </Text>
                    </Stack>

                    <Stack gap="6">
                      <Field.Root>
                        <Field.Label>二段階認証</Field.Label>
                        <Field.Root>
                          <Switch.Root
                            display="flex"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Switch.Label>有効にする</Switch.Label>
                            <Switch.HiddenInput />
                            <Switch.Control />
                          </Switch.Root>
                          <Field.HelperText>
                            ログイン時に追加の認証を要求します。
                          </Field.HelperText>
                        </Field.Root>
                      </Field.Root>

                      <Stack gap="4">
                        <Field.Root>
                          <Field.Label>パスワード</Field.Label>
                        </Field.Root>
                        <Card.Root variant="outline">
                          <Card.Body>
                            <Stack
                              direction="row"
                              justify="space-between"
                              align="center"
                            >
                              <Stack gap="1">
                                <Text fontWeight="medium">
                                  パスワードを変更
                                </Text>
                                <Text fontSize="sm" color="fg.muted">
                                  前回の変更: 3ヶ月前
                                </Text>
                              </Stack>
                              <Button
                                variant="outline"
                                colorPalette="blue"
                                size="sm"
                              >
                                <Icon as={LuKey} />
                                変更する
                              </Button>
                            </Stack>
                          </Card.Body>
                        </Card.Root>
                      </Stack>
                    </Stack>
                  </Stack>
                </Card.Body>
              </Card.Root>
            </Tabs.Content>
          </Tabs.Root>

          {/* Security Notice */}
          <Alert.Root status="info" variant="surface">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>セキュリティ保護について</Alert.Title>
              <Alert.Description>
                支払い情報は暗号化されて安全に保管されます。
                クレジットカード情報は、PCI
                DSSに準拠した決済代行会社で管理されます。
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        </Stack>
      </Box>
    </Container>
  );
}
