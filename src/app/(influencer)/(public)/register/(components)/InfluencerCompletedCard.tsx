"use client";

import { Button, Card, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { LuCheck } from "react-icons/lu";

export function InfluencerCompletedCard() {
  return (
    <Card.Root>
      <Card.Body>
        <VStack gap={8} align="center" py={8}>
          {/* Success Icon */}
          <VStack gap={4} align="center">
            <Icon as={LuCheck} fontSize="7xl" color="green.400" />
            <Heading size="lg" textAlign="center">
              登録申請を受け付けました
            </Heading>
            <Text fontSize="md" color="fg.muted" textAlign="center">
              内容を確認の上、3営業日以内にご登録いただいたメールアドレスへ審査結果をお送りします。
            </Text>
          </VStack>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Button size="lg">トップページへ戻る</Button>
          </Link>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
