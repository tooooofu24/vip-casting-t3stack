"use client";

import { Link as ChakraLink, HStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { type ReactNode } from "react";

type Props = {
  href: string;
  children: string;
  badge?: ReactNode;
};

export function FooterLink({ href, children, badge }: Props) {
  return (
    <HStack>
      <ChakraLink asChild color="fg.inverted">
        <NextLink href={href}>{children}</NextLink>
      </ChakraLink>
      {badge}
    </HStack>
  );
}
