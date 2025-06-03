import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "@/app/(components)/constants";
import { Footer } from "@/app/(components)/Footer/Footer";
import { CompanyNavbar } from "@/app/company/(components)/CompanyNavbar";
import { CompanySidebar } from "@/app/company/(components)/CompanySidebar";
import { Box } from "@chakra-ui/react";

export default function CompanyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CompanyNavbar />
      <CompanySidebar />
      <Box pt={HEADER_HEIGHT} pl={SIDEBAR_WIDTH}>
        <Box as="main">{children}</Box>
      </Box>
      <Box pl={SIDEBAR_WIDTH}>
        <Footer />
      </Box>
    </>
  );
}
