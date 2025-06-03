import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "@/app/(components)/constants";
import { Footer } from "@/app/(components)/Footer/Footer";
import { AdminNavbar } from "@/app/company/(components)/AdminNavbar";
import { AdminSidebar } from "@/app/company/(components)/AdminSidebar";
import { Box } from "@chakra-ui/react";

export default function CompanyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <Box pt={HEADER_HEIGHT} pl={SIDEBAR_WIDTH}>
        <Box as="main">{children}</Box>
      </Box>
      <Box pl={SIDEBAR_WIDTH}>
        <Footer />
      </Box>
    </>
  );
}
