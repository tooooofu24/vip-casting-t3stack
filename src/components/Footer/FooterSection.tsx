"use client";

import { FooterLink } from "@/components/Footer/FooterLink";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { type ComponentProps } from "react";
type Props = {
  title: string;
  links: ComponentProps<typeof FooterLink>[];
};

export function FooterSection({ title, links }: Props) {
  return (
    <Box>
      <Heading as="h4" size="sm" color="white" mb={4}>
        {title}
      </Heading>
      <VStack align="start" gap={2}>
        {links.map((link) => (
          <FooterLink key={link.href} href={link.href} badge={link.badge}>
            {link.children}
          </FooterLink>
        ))}
      </VStack>
    </Box>
  );
}
