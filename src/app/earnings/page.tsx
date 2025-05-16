"use client";

import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Heading,
  Icon,
  Portal,
  Select,
  SimpleGrid,
  Stack,
  Table,
  Text,
  createListCollection,
} from "@chakra-ui/react";
import {
  LuCalendar,
  LuCircleAlert,
  LuCreditCard,
  LuDollarSign,
  LuDownload,
  LuTrendingUp,
} from "react-icons/lu";

interface Transaction {
  id: string;
  campaignName: string;
  company: string;
  amount: number;
  status: "pending" | "completed" | "processing";
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    campaignName: "春の新作コスメPRキャンペーン",
    company: "Beauty Co.",
    amount: 50000,
    status: "completed",
    date: "2024-03-15",
  },
  {
    id: "2",
    campaignName: "プロテインドリンク新商品PR",
    company: "Fitness Lab",
    amount: 30000,
    status: "pending",
    date: "2024-03-20",
  },
  {
    id: "3",
    campaignName: "ワイヤレスイヤホンレビュー",
    company: "Tech Gear",
    amount: 40000,
    status: "processing",
    date: "2024-03-25",
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "completed":
      return { colorPalette: "green", text: "入金済み" };
    case "pending":
      return { colorPalette: "yellow", text: "未入金" };
    case "processing":
      return { colorPalette: "blue", text: "処理中" };
    default:
      return { colorPalette: "gray", text: status };
  }
};

const periodOptions = createListCollection({
  items: [
    { label: "今週", value: "week" },
    { label: "今月", value: "month" },
    { label: "今年", value: "year" },
  ],
});

export default function EarningsPage() {
  return (
    <Box py={8}>
      <Container maxW="container.xl" px={4}>
        {/* Overview Cards */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
          <Card.Root>
            <Card.Body>
              <Stack gap={4}>
                <Stack direction="row" justify="space-between">
                  <Text color="gray.600">今月の収益</Text>
                  <Icon as={LuDollarSign} color="purple.600" />
                </Stack>
                <Stack gap={2}>
                  <Text fontSize="3xl" fontWeight="bold">
                    ¥120,000
                  </Text>
                  <Stack
                    direction="row"
                    align="center"
                    color="green.600"
                    fontSize="sm"
                  >
                    <Icon as={LuTrendingUp} />
                    <Text>先月比 +15%</Text>
                  </Stack>
                </Stack>
              </Stack>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <Stack gap={4}>
                <Stack direction="row" justify="space-between">
                  <Text color="gray.600">未入金の報酬</Text>
                  <Icon as={LuCalendar} color="purple.600" />
                </Stack>
                <Stack gap={2}>
                  <Text fontSize="3xl" fontWeight="bold">
                    ¥70,000
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    3件の支払い待ち
                  </Text>
                </Stack>
              </Stack>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <Stack gap={4}>
                <Stack direction="row" justify="space-between">
                  <Text color="gray.600">完了した案件</Text>
                  <Icon as={LuTrendingUp} color="purple.600" />
                </Stack>
                <Stack gap={2}>
                  <Text fontSize="3xl" fontWeight="bold">
                    8件
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    今月の実績
                  </Text>
                </Stack>
              </Stack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {/* Bank Account Section */}
        <Card.Root mb={8}>
          <Card.Body>
            <Stack gap={6}>
              <Stack direction="row" justify="space-between" align="center">
                <Heading size="lg">振込先口座</Heading>
                <Button variant="ghost">編集</Button>
              </Stack>
              <Stack direction="row" gap={4} align="flex-start">
                <Icon as={LuCreditCard} boxSize={8} color="purple.600" />
                <Stack>
                  <Text fontWeight="medium">みずほ銀行</Text>
                  <Text color="gray.600">渋谷支店 普通 1234567</Text>
                  <Text color="gray.600">タナカ タロウ</Text>
                </Stack>
              </Stack>
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* Transactions */}
        <Card.Root>
          <Card.Body>
            <Stack gap={6}>
              <Stack direction="row" justify="space-between" align="center">
                <Heading size="lg">取引履歴</Heading>
                <Stack direction="row" gap={4} align="center">
                  <Select.Root
                    collection={periodOptions}
                    defaultValue={["month"]}
                    w="100px"
                  >
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content>
                          {periodOptions.items.map((option) => (
                            <Select.Item key={option.value} item={option}>
                              {option.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                  <Button variant="ghost">
                    <Icon as={LuDownload} />
                    CSV出力
                  </Button>
                </Stack>
              </Stack>

              <Box overflowX="auto">
                <Table.Root>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader>案件名</Table.ColumnHeader>
                      <Table.ColumnHeader>企業名</Table.ColumnHeader>
                      <Table.ColumnHeader>金額</Table.ColumnHeader>
                      <Table.ColumnHeader>ステータス</Table.ColumnHeader>
                      <Table.ColumnHeader>日付</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {mockTransactions.map((transaction) => {
                      const status = getStatusConfig(transaction.status);
                      return (
                        <Table.Row key={transaction.id}>
                          <Table.Cell>{transaction.campaignName}</Table.Cell>
                          <Table.Cell>{transaction.company}</Table.Cell>
                          <Table.Cell>
                            ¥{transaction.amount.toLocaleString()}
                          </Table.Cell>
                          <Table.Cell>
                            <Badge
                              variant="subtle"
                              colorPalette={status.colorPalette}
                            >
                              {status.text}
                            </Badge>
                          </Table.Cell>
                          <Table.Cell>{transaction.date}</Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table.Root>
              </Box>
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* Tax Information Notice */}
        <Alert.Root mt={6} status="info">
          <Alert.Indicator>
            <Icon as={LuCircleAlert} />
          </Alert.Indicator>
          <Alert.Content>
            <Alert.Title>確定申告について</Alert.Title>
            <Alert.Description>
              年間の収入が20万円を超える場合、確定申告が必要となります。
              必要な書類は「収益管理」ページからダウンロードできます。
            </Alert.Description>
            <Button variant="surface" colorScheme="blue" size="sm" mt={2}>
              詳しく見る →
            </Button>
          </Alert.Content>
        </Alert.Root>
      </Container>
    </Box>
  );
}
