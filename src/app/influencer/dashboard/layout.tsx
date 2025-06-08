import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "@/app/(components)/constants";
import { SimpleFooter } from "@/app/(components)/Footer/SimpleFooter";
import { InfluencerNavbar } from "@/app/influencer/(components)/InfluencerNavbar";
import { InfluencerSidebar } from "@/app/influencer/(components)/InfluencerSidebar";
import { Box, Container } from "@chakra-ui/react";

export default function InfluencerDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <InfluencerNavbar />
      <InfluencerSidebar />
      <Box pt={HEADER_HEIGHT} pl={SIDEBAR_WIDTH} bg="gray.50">
        <Container
          as="main"
          maxW="container.3xl"
          py={6}
          minH="85vh"
          bg="transparent"
        >
          {children}
        </Container>
      </Box>
      <Box pl={SIDEBAR_WIDTH}>
        <SimpleFooter />
      </Box>
    </>
  );
}
