"use client";

import {
  Avatar,
  Box,
  Grid,
  Icon,
  IconButton,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { LuMenu, LuPaperclip, LuSend, LuStar } from "react-icons/lu";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: "user" | "company";
  read: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    content: "はじめまして。案件に興味を持っていただき、ありがとうございます。",
    timestamp: "14:00",
    sender: "company",
    read: true,
  },
  {
    id: "2",
    content: "商品の使用方法について、詳しく説明していただけますでしょうか？",
    timestamp: "14:15",
    sender: "user",
    read: true,
  },
  {
    id: "3",
    content:
      "もちろんです。商品は朝晩の洗顔後にご使用いただくことをお勧めしています。",
    timestamp: "14:30",
    sender: "company",
    read: false,
  },
];

export default function ChatRoom() {
  return (
    <Grid templateRows="auto 1fr auto" h="full">
      {/* Chat Header */}
      <Box p={4} borderBottom="1px" borderColor="gray.100">
        <Stack direction="row" justify="space-between" align="center">
          <Stack direction="row" align="center" gap={3}>
            <Avatar.Root size="md">
              <Avatar.Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100"
                alt="Company"
              />
              <Avatar.Fallback name="Beauty Co." />
            </Avatar.Root>
            <Box>
              <Text fontWeight="medium">Beauty Co.</Text>
              <Text fontSize="sm" color="gray.500">
                株式会社ビューティー
              </Text>
            </Box>
          </Stack>
          <Stack direction="row" gap={2}>
            <IconButton
              variant="ghost"
              aria-label="お気に入り"
              colorPalette="gray"
            >
              <Icon as={LuStar} />
            </IconButton>
            <IconButton
              variant="ghost"
              aria-label="メニュー"
              colorPalette="gray"
            >
              <Icon as={LuMenu} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {/* Messages */}
      <Box overflowY="auto" p={4}>
        <Stack gap={4}>
          {mockMessages.map((message) => (
            <Stack
              key={message.id}
              align={message.sender === "user" ? "flex-end" : "flex-start"}
            >
              <Box
                maxW="70%"
                bg={message.sender === "user" ? "purple.600" : "gray.100"}
                color={message.sender === "user" ? "white" : "gray.900"}
                p={3}
                rounded="xl"
                roundedBottomLeft={message.sender === "user" ? "xl" : "none"}
                roundedBottomRight={message.sender === "user" ? "none" : "xl"}
              >
                <Text fontSize="sm">{message.content}</Text>
                <Stack
                  direction="row"
                  justify="flex-end"
                  gap={2}
                  fontSize="2xs"
                  color={message.sender === "user" ? "purple.100" : "gray.500"}
                  mt={1}
                >
                  <Text>{message.timestamp}</Text>
                  {message.sender === "user" && (
                    <Text>{message.read ? "既読" : "未読"}</Text>
                  )}
                </Stack>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>

      {/* Message Input */}
      <Box p={4} borderTop="1px" borderColor="gray.100">
        <Stack direction="row" align="flex-end" gap={2}>
          <IconButton variant="ghost" aria-label="添付ファイル">
            <Icon as={LuPaperclip} color="gray.400" />
          </IconButton>
          <Textarea
            flex={1}
            minH="full"
            placeholder="メッセージを入力..."
            rows={1}
            autoresize
          />
          <IconButton aria-label="送信" disabled>
            <Icon as={LuSend} />
          </IconButton>
        </Stack>
      </Box>
    </Grid>
  );
}
