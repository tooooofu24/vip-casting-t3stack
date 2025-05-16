"use client";

import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { type ReactNode } from "react";

type Props = {
  path: string;
  children: ReactNode;
};

export function NavbarLink({ path, children }: Props) {
  return (
    <ChakraLink asChild color="fg.inverted">
      <NextLink href={path}>{children}</NextLink>
    </ChakraLink>
  );
}
