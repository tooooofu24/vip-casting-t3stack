"use client";

import { Link as ChakraLink } from "@chakra-ui/react";
import type { Route } from "next";
import NextLink from "next/link";
import { type ReactNode } from "react";

type Props = {
  path: Route;
  children: ReactNode;
};

export function NavbarLink({ path, children }: Props) {
  return (
    <ChakraLink asChild color="fg.inverted">
      <NextLink href={path}>{children}</NextLink>
    </ChakraLink>
  );
}
