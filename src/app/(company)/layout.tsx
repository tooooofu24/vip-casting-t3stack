import { HEADER_HEIGHT } from "@/app/(components)/constants";
import { Footer } from "@/app/(components)/Footer/Footer";
import { Navbar } from "@/app/(components)/Navbar/Navbar";
import { Box } from "@chakra-ui/react";

export default function CompanyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <Box pt={HEADER_HEIGHT}>
        <Box as="main">{children}</Box>
      </Box>
      <Footer />
    </>
  );
}
