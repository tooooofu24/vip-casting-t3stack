"use client";

import {
  Alert,
  Box,
  Card,
  Container,
  Heading,
  Icon,
  List,
  Stack,
  Steps,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  LuCalendar,
  LuCheck,
  LuDollarSign,
  LuFileText,
  LuTrendingUp,
  LuTriangleAlert,
} from "react-icons/lu";

const paymentSteps = [
  {
    title: "案件完了",
    description: "契約書に記載された全ての deliverables を提出",
  },
  {
    title: "企業の承認",
    description: "提出された内容について企業から承認を取得",
  },
  {
    title: "報酬確定",
    description: "承認後、報酬が確定し支払い待ちステータスに",
  },
  {
    title: "入金",
    description: "翌月15日に登録口座へ振込",
  },
];

export default function EarningsGuidePage() {
  return (
    <Container py={8} maxW="3xl">
      <VStack gap={8} align="stretch">
        <Heading as="h1" size="2xl">
          報酬について
        </Heading>

        {/* Overview */}
        <Card.Root>
          <Card.Header>
            <Card.Title>報酬システム</Card.Title>
          </Card.Header>
          <Card.Body>
            <Stack gap={4}>
              <Stack direction="row" gap={4}>
                <Icon
                  as={LuDollarSign}
                  boxSize={6}
                  color="purple.600"
                  flexShrink={0}
                />
                <Stack>
                  <Heading size="sm">成果報酬制</Heading>
                  <Text color="gray.600">
                    案件ごとに設定された報酬額をお支払いします。
                    投稿内容や成果に応じてボーナスが追加される場合もあります。
                  </Text>
                </Stack>
              </Stack>
              <Stack direction="row" gap={4}>
                <Icon
                  as={LuCalendar}
                  boxSize={6}
                  color="purple.600"
                  flexShrink={0}
                />
                <Stack>
                  <Heading size="sm">支払いサイクル</Heading>
                  <Text color="gray.600">
                    毎月末締め、翌月15日払いです。
                    報酬は登録された銀行口座へ振り込まれます。
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* Payment Process */}
        <Card.Root>
          <Card.Header>
            <Card.Title>報酬受け取りまでの流れ</Card.Title>
          </Card.Header>
          <Card.Body>
            <Steps.Root
              orientation="vertical"
              count={paymentSteps.length}
              height="300px"
            >
              <Steps.List>
                {paymentSteps.map((step, index) => (
                  <Steps.Item key={index} index={index}>
                    <Steps.Indicator>
                      <Steps.Status
                        incomplete={index + 1}
                        complete={<LuCheck />}
                      />
                    </Steps.Indicator>
                    <Box>
                      <Steps.Title>{step.title}</Steps.Title>
                      <Steps.Description color="gray.600">
                        {step.description}
                      </Steps.Description>
                    </Box>
                    <Steps.Separator />
                  </Steps.Item>
                ))}
              </Steps.List>
            </Steps.Root>
          </Card.Body>
        </Card.Root>

        {/* Tax Information */}
        <Card.Root>
          <Card.Header>
            <Card.Title>確定申告について</Card.Title>
          </Card.Header>
          <Card.Body>
            <Stack gap={4}>
              <Stack direction="row" gap={4}>
                <Icon
                  as={LuFileText}
                  boxSize={6}
                  color="purple.600"
                  flexShrink={0}
                />
                <Stack>
                  <Heading size="sm">確定申告の必要性</Heading>
                  <Text color="gray.600">
                    年間の報酬合計が20万円を超える場合、確定申告が必要となります。
                    必要な書類は「収益管理」ページからダウンロードできます。
                  </Text>
                </Stack>
              </Stack>
              <Stack direction="row" gap={4}>
                <Icon
                  as={LuTrendingUp}
                  boxSize={6}
                  color="purple.600"
                  flexShrink={0}
                />
                <Stack>
                  <Heading size="sm">経費について</Heading>
                  <Text color="gray.600">
                    案件に関連する交通費、機材費、消耗品費などは経費として計上できます。
                    領収書は必ず保管しておきましょう。
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* Important Notes */}
        <Alert.Root status="warning" variant="subtle">
          <Alert.Indicator>
            <Icon as={LuTriangleAlert} />
          </Alert.Indicator>
          <Alert.Content>
            <Alert.Title>重要な注意事項</Alert.Title>
            <Alert.Description>
              <List.Root listStylePosition="inside">
                <List.Item>報酬の受け取りには本人確認が必要です</List.Item>
                <List.Item>
                  銀行口座は本人名義のものを登録してください
                </List.Item>
                <List.Item>
                  不正や規約違反があった場合、報酬の支払いを停止することがあります
                </List.Item>
                <List.Item>確定申告は各自の責任で行ってください</List.Item>
              </List.Root>
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </VStack>
    </Container>
  );
}
