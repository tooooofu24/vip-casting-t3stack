"use client";

import { BreadcrumbSection } from "@/app/(components)/BreadcrumbSection";
import ChatList from "@/app/influencer/dashboard/messages/(components)/ChatList";
import ChatRoom from "@/app/influencer/dashboard/messages/(components)/ChatRoom";
import { Card, Grid, Stack, Text, VStack } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const selectedConversationId = searchParams.get("id");

  return (
    <VStack gap={6} align="stretch">
      {/* Breadcrumb Section */}
      <BreadcrumbSection items={[{ label: "メッセージ" }]} />

      <Card.Root overflow="hidden">
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 2fr" }}
          h="calc(100vh - 12rem)"
        >
          {/* ChatListコンポーネントの場所 */}
          <Card.Body borderRight="sm" borderColor="border" p={0}>
            <ChatList />
          </Card.Body>

          {/* チャットルームまたは空の状態 */}
          <Card.Body p={0}>
            {selectedConversationId ? (
              <ChatRoom conversationId={selectedConversationId} />
            ) : (
              <Stack
                display={{ base: "none", md: "flex" }}
                align="center"
                justify="center"
                bg="bg.muted"
                h="full"
              >
                <Text color="fg.muted">チャットを選択してください</Text>
              </Stack>
            )}
          </Card.Body>
        </Grid>
      </Card.Root>
    </VStack>
  );
}
