"use client";

import { Box, Container, Heading, List, Stack, Text } from "@chakra-ui/react";

export default function TermsPage() {
  return (
    <Box py="8" bg="gray.50">
      <Container maxW="4xl" px="4">
        <Box bg="white" rounded="lg" shadow="sm" p="8">
          <Heading as="h1" fontSize="3xl" fontWeight="bold" mb="8">
            利用規約
          </Heading>

          <Stack gap="8">
            <Stack as="section" gap="4">
              <Heading as="h2" fontSize="2xl" fontWeight="bold">
                第1条（総則）
              </Heading>
              <Stack gap="4">
                <Text color="gray.600">
                  この利用規約（以下「本規約」といいます）は、株式会社カイエン（以下「当社」といいます）が提供するインフルエンサーマッチングプラットフォーム「VIPキャスティング」（以下「本サービス」といいます）の利用に関する条件を、本サービスを利用するお客様（以下「ユーザー」といいます）と当社との間で定めるものです。
                </Text>
                <Text color="gray.600">
                  ユーザーは、本規約に同意の上、本サービスを利用するものとします。ユーザーが本サービスを利用した場合、本規約に同意したものとみなされます。
                </Text>
                <Text color="gray.600">
                  当社は、必要に応じて、本規約を変更することができます。変更後の本規約は、当社ウェブサイト上に掲載された時点から効力を生じるものとし、ユーザーは、変更後の本規約に同意の上、本サービスを利用するものとします。当社は、重要な変更を行う場合には、事前にユーザーに告知するよう努めるものとします。
                </Text>
              </Stack>
            </Stack>

            <Stack as="section" gap="4">
              <Heading as="h2" fontSize="2xl" fontWeight="bold">
                第2条（定義）
              </Heading>
              <Text color="gray.600">
                本規約において使用する用語の定義は、以下のとおりとします。
              </Text>
              <List.Root gap="2" pl="6">
                <List.Item color="gray.600">
                  「ユーザー」とは、本サービスを利用するすべての者をいいます。
                </List.Item>
                <List.Item color="gray.600">
                  「企業ユーザー」とは、本サービスを利用してインフルエンサーに商品やサービスのPRを依頼する者をいいます。
                </List.Item>
                <List.Item color="gray.600">
                  「インフルエンサーユーザー」とは、本サービスを利用して企業から商品やサービスのPRを受託する者をいいます。
                </List.Item>
                <List.Item color="gray.600">
                  「案件」とは、企業ユーザーがインフルエンサーユーザーに対して依頼するPR業務をいいます。
                </List.Item>
                <List.Item color="gray.600">
                  「コンテンツ」とは、ユーザーが本サービスに投稿または掲載する文章、画像、動画、音声その他の情報をいいます。
                </List.Item>
                <List.Item color="gray.600">
                  「知的財産権」とは、著作権、特許権、実用新案権、意匠権、商標権その他の知的財産権（それらの権利を取得し、またはそれらの権利につき登録等を出願する権利を含みます。）をいいます。
                </List.Item>
              </List.Root>
            </Stack>

            <Stack as="section" gap="4">
              <Heading as="h2" fontSize="2xl" fontWeight="bold">
                第19条（協議解決）
              </Heading>
              <Text color="gray.600">
                当社及びユーザーは、本規約に定めのない事項又は本規約の解釈に疑義が生じた場合には、互いに信義誠実の原則に従って協議の上速やかに解決を図るものとします。
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
