"use client";

import ChatList from "@/app/influencer/dashboard/messages/(components)/ChatList";
import { Box, Card, Container, Grid, Stack, Text } from "@chakra-ui/react";

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
            <Box borderRight="1px" borderColor="gray.100">
              <ChatList />
            </Box>

            <Stack
              display={{ base: "none", md: "flex" }}
              align="center"
              justify="center"
              bg="gray.50"
              h="full"
            >
              <Text color="gray.500">チャットを選択してください</Text>
            </Stack>
          </Grid>
        </Card.Root>
      </Container>
    </Box>
  );
}
