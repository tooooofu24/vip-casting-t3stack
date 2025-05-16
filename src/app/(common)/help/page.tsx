"use client";

import {
  Accordion,
  Box,
  Button,
  Card,
  Link as ChakraLink,
  Container,
  Grid,
  Heading,
  Icon,
  Input,
  InputGroup,
  RadioCard,
  SimpleGrid,
  Span,
  Stack,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  LuBook,
  LuCircle,
  LuCircleAlert,
  LuExternalLink,
  LuMessageSquare,
  LuSearch,
} from "react-icons/lu";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    question: "案件への応募方法を教えてください",
    answer:
      "案件一覧から興味のある案件を選択し、詳細ページの「応募する」ボタンをクリックしてください。応募フォームに必要事項を入力し、送信することで応募が完了します。",
    category: "案件応募",
  },
  {
    question: "報酬の受け取り方について教えてください",
    answer:
      "報酬は、案件完了後に登録された銀行口座へ振り込まれます。振込は毎月末締めの翌月15日払いとなります。振込先の登録は「設定」ページから行えます。",
    category: "報酬",
  },
  {
    question: "投稿の修正や削除はできますか？",
    answer:
      "投稿前の確認期間中であれば修正が可能です。投稿後の修正・削除は原則としてできませんので、投稿前に内容を十分ご確認ください。",
    category: "投稿管理",
  },
  {
    question: "企業とのやり取りで気をつけることは？",
    answer:
      "メッセージは必ず専用のチャット機能を使用し、個人情報のやり取りは避けてください。また、返信は48時間以内を心がけましょう。",
    category: "コミュニケーション",
  },
];

const guidelines = [
  {
    title: "投稿ガイドライン",
    description: "投稿時の注意事項や禁止事項について",
    link: "/guidelines/posting",
  },
  {
    title: "コミュニケーションガイドライン",
    description: "企業とのやり取りにおける注意点",
    link: "/guidelines/communication",
  },
  {
    title: "報酬受け取りガイドライン",
    description: "報酬の受け取り方や確定申告について",
    link: "/guidelines/payment",
  },
];

const categories = [
  { value: "all", label: "すべて" },
  { value: "案件応募", label: "案件応募" },
  { value: "報酬", label: "報酬" },
  { value: "投稿管理", label: "投稿管理" },
  { value: "コミュニケーション", label: "コミュニケーション" },
];

export default function HelpPage() {
  return (
    <Box py="8" bg="gray.50">
      <Container maxW="4xl" px="4">
        <Heading as="h1" fontSize="2xl" fontWeight="bold" mb="8">
          ヘルプセンター
        </Heading>

        {/* Search and Categories */}
        <Stack gap="4" mb="8">
          <InputGroup startElement={<Icon as={LuSearch} color="gray.500" />}>
            <Input placeholder="質問を検索..." />
          </InputGroup>

          <RadioCard.Root size="sm" defaultValue="all">
            <Wrap>
              {categories.map((category) => (
                <RadioCard.Item
                  key={category.value}
                  value={category.value}
                  flex="none"
                >
                  <RadioCard.ItemHiddenInput />
                  <RadioCard.ItemControl alignItems="center">
                    <RadioCard.ItemText>{category.label}</RadioCard.ItemText>
                    <RadioCard.ItemIndicator />
                  </RadioCard.ItemControl>
                </RadioCard.Item>
              ))}
            </Wrap>
          </RadioCard.Root>
        </Stack>

        {/* Quick Links */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="4" mb="8">
          <Card.Root>
            <Card.Body>
              <VStack>
                <Icon as={LuBook} boxSize="8" color="purple.600" />
                <Heading size="md">ガイドライン</Heading>
                <Text color="gray.600" fontSize="sm" textAlign="center">
                  利用規約やガイドラインを確認する
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <VStack>
                <Icon as={LuMessageSquare} boxSize="8" color="purple.600" />
                <Heading size="md">お問い合わせ</Heading>
                <Text color="gray.600" fontSize="sm" textAlign="center">
                  カスタマーサポートに相談する
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <VStack>
                <Icon as={LuCircle} boxSize="8" color="purple.600" />
                <Heading size="md">よくある質問</Heading>
                <Text color="gray.600" fontSize="sm" textAlign="center">
                  FAQ一覧を確認する
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {/* Guidelines */}
        <Stack as="section" gap="4" mb="8">
          <Heading as="h2" fontSize="xl" fontWeight="semibold">
            ガイドライン
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="4">
            {guidelines.map((guideline) => (
              <ChakraLink key={guideline.title} asChild>
                <Link href={guideline.link}>
                  <Card.Root w="full">
                    <Card.Body>
                      <Stack
                        direction="row"
                        justify="space-between"
                        align="flex-start"
                      >
                        <Stack>
                          <Heading size="sm">{guideline.title}</Heading>
                          <Text color="gray.600" fontSize="sm">
                            {guideline.description}
                          </Text>
                        </Stack>
                        <Icon
                          as={LuExternalLink}
                          color="gray.400"
                          _groupHover={{ color: "purple.600" }}
                        />
                      </Stack>
                    </Card.Body>
                  </Card.Root>
                </Link>
              </ChakraLink>
            ))}
          </Grid>
        </Stack>

        {/* FAQ */}
        <Stack as="section" gap="4" mb="8">
          <Heading as="h2" fontSize="xl" fontWeight="semibold">
            よくある質問
          </Heading>
          <Accordion.Root variant="outline" multiple collapsible>
            {faqs.map((faq) => (
              <Accordion.Item key={faq.question} value={faq.question}>
                <Accordion.ItemTrigger py={4}>
                  <Span flex="1">{faq.question}</Span>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>
                    <Text color="gray.600">{faq.answer}</Text>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Stack>

        {/* Contact Support */}
        <Card.Root>
          <Card.Body gap="6">
            <Heading as="h2" fontSize="xl" fontWeight="semibold">
              お問い合わせ
            </Heading>
            <Stack gap="6">
              <Box bg="blue.50" p="4" rounded="lg">
                <Stack direction="row" gap="4">
                  <Icon as={LuCircleAlert} boxSize="6" color="blue.600" />
                  <Text color="blue.800">
                    お問い合わせの前に、FAQやガイドラインをご確認ください。
                    より早く解決できる可能性があります。
                  </Text>
                </Stack>
              </Box>

              <Stack>
                <Heading as="h3" size="sm">
                  カスタマーサポート
                </Heading>
                <Text color="gray.600">
                  平日 10:00 - 18:00
                  <br />
                  回答までの目安: 24時間以内
                </Text>
                <ChakraLink asChild>
                  <Link href="/contact">
                    <Button>
                      <Icon as={LuMessageSquare} />
                      お問い合わせフォーム
                    </Button>
                  </Link>
                </ChakraLink>
              </Stack>
            </Stack>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
}
