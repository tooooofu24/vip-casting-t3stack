"use client";

import {
  Box,
  Button,
  Card,
  Link as ChakraLink,
  Container,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export default function CaseStudiesPage() {
  // Note: 認証状態の管理は後で実装
  const isAuthenticated = false;

  return (
    <Box py="8" bg="gray.50">
      <Container maxW="4xl" px="4">
        {/* ... 他のセクションは後で実装 ... */}

        {/* CTA - Only show when not authenticated */}
        {!isAuthenticated && (
          <Card.Root bg="white" rounded="lg" shadow="sm" mt="8">
            <Card.Body textAlign="center">
              <Heading as="h2" size="lg" mb="4">
                あなたも成功事例を作りませんか？
              </Heading>
              <Text color="fg.muted" mb="6">
                VIPキャスティングでは、あなたの特性に合った案件をご紹介します。
                まずは無料会員登録から始めましょう。
              </Text>
              <ChakraLink asChild display="inline" w="auto">
                <Link href="/influencer/register">
                  <Button size="lg" px="8" _hover={{ bg: "purple.500" }}>
                    無料会員登録する
                    <Icon ml="2">
                      <LuArrowRight />
                    </Icon>
                  </Button>
                </Link>
              </ChakraLink>
            </Card.Body>
          </Card.Root>
        )}
      </Container>
    </Box>
  );
}
