"use client";

import { Box, Button, HStack, Icon, IconButton } from "@chakra-ui/react";
import { LuBell, LuLogOut, LuSearch } from "react-icons/lu";

export function AuthenticatedActions() {
  return (
    <HStack gap={{ base: 1, md: 2 }}>
      <Box display={{ base: "none", sm: "block" }}>
        <IconButton
          aria-label="通知"
          variant="ghost"
          color="fg.inverted"
          _hover={{ bg: "none" }}
        >
          <Icon>
            <LuBell />
          </Icon>
        </IconButton>
      </Box>
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
        <Button
          colorPalette="gray"
          variant="subtle"
          size={{ base: "sm", md: "md" }}
        >
          <Icon>
            <LuLogOut />
          </Icon>
          ログアウト
        </Button>
      </Box>
    </HStack>
  );
}
