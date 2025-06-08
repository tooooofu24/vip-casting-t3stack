"use client";

import {
  Box,
  Container,
  Heading,
  Icon,
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

const certifications = [
  {
    year: "2023",
    title: "プライバシーマーク取得",
    description: "個人情報保護の取り組みが認められ、プライバシーマークを取得",
  },
  {
    year: "2022",
    title: "Forbes JAPAN スタートアップ・オブ・ザ・イヤー選出",
    description: "インフルエンサーマーケティング分野での革新的なサービスが評価",
  },
  {
    year: "2021",
    title: "経済産業省「J-Startup」選定企業",
    description: "高い成長性と革新性を持つスタートアップとして選定",
  },
];

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
                      〒106-6290
                      <br />
                      東京都港区麻布台1-2-1
                      <br />
                      麻布台ヒルズ
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
                    <Text>2020年4月1日</Text>
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
                    <Text>代表取締役社長 佐藤 翔一</Text>
                  </Stack>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.ColumnHeader py="4" textAlign="left" color="gray.600">
                  資本金
                </Table.ColumnHeader>
                <Table.Cell py="4">1億円</Table.Cell>
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
                      <Text>03-1234-5678</Text>
                    </Stack>
                    <Stack direction="row" align="center">
                      <Icon as={LuMail} color="purple.600" />
                      <Text>info@cayenne.co.jp</Text>
                    </Stack>
                    <Stack direction="row" align="center">
                      <Icon as={LuGlobe} color="purple.600" />
                      <Text>https://www.cayenne.co.jp</Text>
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
          <VStack align="flex-start" gap="4">
            {certifications.map((item, index) => (
              <Stack key={index} direction="row" gap="4">
                <Icon
                  as={LuAward}
                  color="purple.600"
                  boxSize="6"
                  flexShrink={0}
                />
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    {item.year}
                  </Text>
                  <Text fontWeight="medium">{item.title}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {item.description}
                  </Text>
                </Box>
              </Stack>
            ))}
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
