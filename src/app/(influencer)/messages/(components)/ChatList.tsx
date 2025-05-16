import {
  Avatar,
  Box,
  Icon,
  Input,
  InputGroup,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { LuSearch } from "react-icons/lu";

// モックデータ
const MOCK_CHATS = [
  {
    id: "1",
    name: "株式会社A",
    lastMessage: "商品の投稿について確認させていただきたいのですが...",
    timestamp: "14:30",
    unread: 2,
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692",
  },
  {
    id: "2",
    name: "株式会社B",
    lastMessage: "承知いたしました。では次回の投稿は...",
    timestamp: "12:15",
    unread: 0,
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a693",
  },
];

export default function ChatList() {
  return (
    <VStack h="full" align="stretch" py={4} gap={4}>
      <InputGroup startElement={<Icon as={LuSearch} color="gray.500" />} px={4}>
        <Input placeholder="チャットを検索..." />
      </InputGroup>

      <Stack gap={2} overflowY="auto">
        {MOCK_CHATS.map((chat) => (
          <Link
            key={chat.id}
            as={NextLink}
            href={`/messages/${chat.id}`}
            _hover={{ textDecoration: "none" }}
            px={4}
            py={6}
            borderRadius="none"
            borderBottom="sm"
            borderColor="border"
          >
            <Box w="full">
              <Stack direction="row" gap={3} align="center">
                <Avatar.Root size="md">
                  <Avatar.Image src={chat.imageUrl} />
                  <Avatar.Fallback name={chat.name} />
                </Avatar.Root>
                <Box flex={1}>
                  <Stack
                    direction="row"
                    justify="space-between"
                    align="center"
                    mb={1}
                  >
                    <Text fontWeight="medium">{chat.name}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {chat.timestamp}
                    </Text>
                  </Stack>
                  <Stack direction="row" justify="space-between" align="center">
                    <Text
                      fontSize="sm"
                      color="gray.600"
                      textOverflow="ellipsis"
                      overflow="hidden"
                      whiteSpace="nowrap"
                    >
                      {chat.lastMessage}
                    </Text>
                    {chat.unread > 0 && (
                      <Box
                        bg="purple.500"
                        color="white"
                        fontSize="xs"
                        fontWeight="bold"
                        rounded="full"
                        h={6}
                        w={6}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {chat.unread}
                      </Box>
                    )}
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Link>
        ))}
      </Stack>
    </VStack>
  );
}
