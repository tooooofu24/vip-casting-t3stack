import { HEADER_HEIGHT } from "@/app/(components)/constants";
import { Footer } from "@/app/(components)/Footer/Footer";
import { CompanyNavbar } from "@/app/influencer/(public)/CompanyNavbar";
import { Box } from "@chakra-ui/react";

export default function CompanyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CompanyNavbar />
      <Box pt={HEADER_HEIGHT}>
        <Box as="main">{children}</Box>
      </Box>
      <Footer />
    </>
  );
}
