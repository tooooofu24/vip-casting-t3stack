import { FooterLink } from "@/app/(components)/Footer/FooterLink";
import { Container, Flex, HStack, Text } from "@chakra-ui/react";

export function SimpleFooter() {
  return (
    <Container as="footer" bg="tailwindGray.800" py={8} maxW="container.xl">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
      >
        <Text fontSize="sm" mb={{ base: 4, md: 0 }} color="fg.inverted">
          © 2024 VIPキャスティング. All rights reserved.
        </Text>
        <HStack gap={6}>
          <FooterLink href="https://twitter.com/vipcasting">Twitter</FooterLink>
          <FooterLink href="https://instagram.com/vipcasting">
            Instagram
          </FooterLink>
          <FooterLink href="https://www.youtube.com/vipcasting">
            YouTube
          </FooterLink>
        </HStack>
      </Flex>
      <Text
        mt={4}
        fontSize="xs"
        color="gray.500"
        textAlign={{ base: "center", md: "left" }}
      >
        VIPキャスティングは、インフルエンサーマーケティングの健全な発展を目指し、
        業界ガイドラインに準拠したサービス運営を行っています。
      </Text>
    </Container>
  );
}
