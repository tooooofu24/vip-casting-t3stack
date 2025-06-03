"use client";

import { HEADER_HEIGHT } from "@/app/(components)/constants";
import { Box, Heading, HStack, Icon, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { LuCrown } from "react-icons/lu";

export function CompanyNavbar() {
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
      px={8}
    >
      <HStack h="100%">
        <Heading
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="bold"
          color="fg.inverted"
          asChild
        >
          <NextLink href="/">
            <HStack align="center" gap={4}>
              <Icon>
                <LuCrown />
              </Icon>
              <Text whiteSpace="nowrap">VIPキャスティング</Text>
            </HStack>
          </NextLink>
        </Heading>
      </HStack>
    </Box>
  );
}
