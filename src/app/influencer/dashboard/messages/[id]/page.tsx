"use client";

import ChatList from "@/app/influencer/dashboard/messages/(components)/ChatList";
import ChatRoom from "@/app/influencer/dashboard/messages/(components)/ChatRoom";
import { Box, Card, Container, Grid } from "@chakra-ui/react";

export default function MessagesPage() {
  return (
    <Box py={8}>
      <Container maxW="container.xl" px={4}>
        <Card.Root overflow="hidden">
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 2fr" }}
            h="calc(100vh - 12rem)"
          >
            {/* ChatListコンポーネントの場所 */}
            <Box borderRight="sm" borderColor="border">
              <ChatList />
            </Box>

            {/* チャットルームまたは空の状態 */}
            <Box>
              <ChatRoom />
            </Box>
          </Grid>
        </Card.Root>
      </Container>
    </Box>
  );
}
