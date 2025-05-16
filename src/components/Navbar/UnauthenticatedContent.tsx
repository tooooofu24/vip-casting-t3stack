"use client";

import {
  Box,
  Button,
  Link as ChakraLink,
  HStack,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { LuSearch } from "react-icons/lu";

export function UnauthenticatedContent() {
  return (
    <HStack gap={{ base: 1, md: 2 }}>
      <IconButton
        aria-label="検索"
        variant="ghost"
        color="fg.inverted"
        _hover={{ bg: "none" }}
      >
        <Icon>
          <LuSearch />
        </Icon>
      </IconButton>
      <Box display={{ base: "none", sm: "block" }}>
        <ChakraLink asChild>
          <NextLink href="/login">
            <Button size={{ base: "sm", md: "md" }}>ログイン</Button>
          </NextLink>
        </ChakraLink>
      </Box>
    </HStack>
  );
}
