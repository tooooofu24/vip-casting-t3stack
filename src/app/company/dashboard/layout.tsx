import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "@/app/(components)/constants";
import { SimpleFooter } from "@/app/(components)/Footer/SimpleFooter";
import { CompanyNavbar } from "@/app/company/(components)/CompanyNavbar";
import { CompanySidebar } from "@/app/company/(components)/CompanySidebar";
import { Box, Container } from "@chakra-ui/react";

export default function CompanyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CompanyNavbar />
      <CompanySidebar />
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
