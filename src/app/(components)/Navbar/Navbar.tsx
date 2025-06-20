"use client";

import { HEADER_HEIGHT } from "@/app/(components)/constants";
import { AuthenticatedActions } from "@/app/(components)/Navbar/AuthenticatedContent";
import { NavigationLinks } from "@/app/(components)/Navbar/NavigationLinks";
import { UnauthenticatedContent } from "@/app/(components)/Navbar/UnauthenticatedContent";
import { Box, Heading, HStack, Icon, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { LuCrown } from "react-icons/lu";

export function Navbar() {
  const isAuthenticated = true; // TODO: 認証状態の管理を実装

  return (
    <Box
      as="header"
      h={HEADER_HEIGHT}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={20}
      bg="tailwindGray.800"
      px={{ base: 2, md: 4 }}
    >
      <HStack justify="space-between" h="100%">
        <HStack gap={{ base: 2, md: 6 }}>
          <Heading
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            color="fg.inverted"
          >
            <NextLink href="/">
              <HStack>
                <Icon>
                  <LuCrown />
                </Icon>
                <Text whiteSpace="nowrap">VIPキャスティング</Text>
              </HStack>
            </NextLink>
          </Heading>

          <Box display={{ base: "none", xl: "block" }}>
            {isAuthenticated && <NavigationLinks />}
          </Box>
        </HStack>

        {isAuthenticated ? (
          <AuthenticatedActions />
        ) : (
          <UnauthenticatedContent />
        )}
      </HStack>
    </Box>
  );
}
