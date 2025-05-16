"use client";

import { FooterLink } from "@/app/(components)/Footer/FooterLink";
import { FooterSection } from "@/app/(components)/Footer/FooterSection";
import {
  Badge,
  Box,
  Container,
  Flex,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { type ComponentProps } from "react";

type FooterLink = ComponentProps<typeof FooterLink>;

const influencerLinks: FooterLink[] = [
  { href: "/campaigns", children: "案件を探す" },
  {
    href: "/guide/registration",
    children: "登録方法",
    badge: <Badge variant="solid">簡単3分</Badge>,
  },
];

const companyLinks: FooterLink[] = [
  { href: "/company/post", children: "案件を掲載する" },
  { href: "/company/guide", children: "登録方法" },
  { href: "/company/pricing", children: "料金" },
  {
    href: "/case-studies",
    children: "成功事例",
    badge: (
      <Badge colorPalette="yellow" variant="solid">
        実績多数
      </Badge>
    ),
  },
];

const aboutLinks: FooterLink[] = [
  { href: "/about", children: "会社概要" },
  { href: "/privacy", children: "プライバシーポリシー" },
  { href: "/terms", children: "利用規約" },
  {
    href: "/careers",
    children: "採用情報",
    badge: (
      <Badge colorPalette="blue" variant="solid">
        積極採用中
      </Badge>
    ),
  },
];

const supportLinks: FooterLink[] = [
  { href: "/help", children: "ヘルプセンター" },
  { href: "/contact", children: "お問い合わせ" },
  { href: "/guide/verification", children: "本人確認について" },
];

export function Footer() {
  return (
    <Box as="footer" bg="tailwindGray.800">
      <Container maxW="container.xl" px={4} py={12}>
        <SimpleGrid columns={{ base: 1, md: 4 }} gap={8}>
          <FooterSection title="インフルエンサー向け" links={influencerLinks} />
          <FooterSection title="企業向け" links={companyLinks} />
          <FooterSection title="会社情報" links={aboutLinks} />
          <FooterSection title="サポート" links={supportLinks} />
        </SimpleGrid>

        {/* Bottom Section */}
        <Box borderTopWidth="1px" borderColor="gray.800" mt={12} pt={8}>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
          >
            <Text fontSize="sm" mb={{ base: 4, md: 0 }} color="fg.inverted">
              © 2024 VIPキャスティング. All rights reserved.
            </Text>
            <HStack gap={6}>
              <FooterLink href="https://twitter.com/vipcasting">
                Twitter
              </FooterLink>
              <FooterLink href="https://instagram.com/vipcasting">
                Instagram
              </FooterLink>
              <FooterLink href="https://www.youtube.com/vipcasting">
                YouTube
              </FooterLink>
            </HStack>
          </Flex>
          <Text
            mt={4}
            fontSize="xs"
            color="gray.500"
            textAlign={{ base: "center", md: "left" }}
          >
            VIPキャスティングは、インフルエンサーマーケティングの健全な発展を目指し、
            業界ガイドラインに準拠したサービス運営を行っています。
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
