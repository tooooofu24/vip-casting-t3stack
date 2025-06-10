"use client";

import {
  Box,
  Container,
  EmptyState,
  Heading,
  Icon,
  Link,
  Stack,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  LuAward,
  LuCalendar,
  LuGlobe,
  LuMail,
  LuMapPin,
  LuPhone,
  LuUsers,
} from "react-icons/lu";

export default function AboutPage() {
  return (
    <Box py="8">
      <Container maxW="3xl" px="4">
        <Heading as="h1" fontSize="3xl" fontWeight="bold" mb="6">
          会社概要
        </Heading>

        {/* Company Information */}
        <Box bg="white" rounded="lg" shadow="sm" p="6" mb="8">
          <Table.Root>
            <Table.Body>
              <Table.Row>
                <Table.ColumnHeader
                  w="1/3"
                  py="4"
                  textAlign="left"
                  color="gray.600"
                >
                  会社名
                </Table.ColumnHeader>
                <Table.Cell py="4">Hibi Holdings株式会社</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.ColumnHeader py="4" textAlign="left" color="gray.600">
                  所在地
                </Table.ColumnHeader>
                <Table.Cell py="4">
                  <Stack direction="row" align="flex-start">
                    <Icon as={LuMapPin} color="purple.600" mt="0.5" />
                    <Box>
                      〒106-0041
                      <br />
                      東京都港区麻布台3-4-4コンフォリア麻布台303
                    </Box>
                  </Stack>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.ColumnHeader py="4" textAlign="left" color="gray.600">
                  設立
                </Table.ColumnHeader>
                <Table.Cell py="4">
                  <Stack direction="row" align="center">
                    <Icon as={LuCalendar} color="purple.600" />
                    <Text>2025年4月</Text>
                  </Stack>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.ColumnHeader py="4" textAlign="left" color="gray.600">
                  代表者
                </Table.ColumnHeader>
                <Table.Cell py="4">
                  <Stack direction="row" align="center">
                    <Icon as={LuUsers} color="purple.600" />
                    <Text>代表取締役 日比亜希子</Text>
                  </Stack>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.ColumnHeader py="4" textAlign="left" color="gray.600">
                  資本金
                </Table.ColumnHeader>
                <Table.Cell py="4">500万円</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.ColumnHeader py="4" textAlign="left" color="gray.600">
                  事業内容
                </Table.ColumnHeader>
                <Table.Cell py="4">
                  <VStack align="flex-start" gap="2">
                    <Text>
                      • インフルエンサーマーケティングプラットフォームの運営
                    </Text>
                    <Text>• デジタルマーケティングコンサルティング</Text>
                    <Text>• ソーシャルメディアマーケティング支援</Text>
                    <Text>• コンテンツクリエイター支援事業</Text>
                  </VStack>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.ColumnHeader py="4" textAlign="left" color="gray.600">
                  連絡先
                </Table.ColumnHeader>
                <Table.Cell py="4">
                  <VStack align="flex-start" gap="2">
                    <Stack direction="row" align="center">
                      <Icon as={LuPhone} color="purple.600" />
                      <Text>080-6329-8148</Text>
                    </Stack>
                    <Stack direction="row" align="center">
                      <Icon as={LuMail} color="purple.600" />
                      <Text>info@hibiholdings.com</Text>
                    </Stack>
                    <Stack direction="row" align="center">
                      <Icon as={LuGlobe} color="purple.600" />
                      <Link
                        href="https://www.hibiholdings.co.jp"
                        target="_blank"
                      >
                        https://www.hibiholdings.co.jp
                      </Link>
                    </Stack>
                  </VStack>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Box>

        {/* Company Vision */}
        <Box bg="white" rounded="lg" shadow="sm" p="6" mb="8">
          <Heading as="h2" fontSize="xl" fontWeight="bold" mb="4">
            企業理念
          </Heading>
          <VStack align="flex-start" gap="4" color="gray.600">
            <Text>
              「クリエイターの可能性を広げ、新しい価値を創造する」をミッションに掲げ、
              インフルエンサーとブランドの最適なマッチングを実現します。
            </Text>
            <Text>
              テクノロジーとクリエイティビティの融合により、
              より効果的なマーケティングソリューションを提供し、
              クリエイターエコノミーの発展に貢献します。
            </Text>
          </VStack>
        </Box>

        {/* Certifications */}
        <Box bg="white" rounded="lg" shadow="sm" p="6">
          <Heading as="h2" fontSize="xl" fontWeight="bold" mb="4">
            認証・受賞歴
          </Heading>
          <EmptyState.Root>
            <EmptyState.Content>
              <EmptyState.Indicator>
                <LuAward />
              </EmptyState.Indicator>
              <VStack textAlign="center">
                <EmptyState.Title>
                  認証・受賞歴はまだありません
                </EmptyState.Title>
                <EmptyState.Description>
                  認証・受賞歴はまだありません。
                </EmptyState.Description>
              </VStack>
            </EmptyState.Content>
          </EmptyState.Root>
        </Box>
      </Container>
    </Box>
  );
}
