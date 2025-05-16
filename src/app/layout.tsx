import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";

import { HEADER_HEIGHT } from "@/app/(components)/constants";
import { Footer } from "@/app/(components)/Footer/Footer";
import { Navbar } from "@/app/(components)/Navbar/Navbar";
import { ChakraProvider } from "@/lib/chakra-ui/provider";
import { TRPCReactProvider } from "@/lib/trpc/react";
import { Box } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "VIPキャスティング",
  description: "インフルエンサーと企業のマッチングサービス",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <TRPCReactProvider>
          <ChakraProvider defaultTheme="light">
            <Navbar />
            <Box pt={HEADER_HEIGHT}>
              <Box as="main">{children}</Box>
            </Box>
            <Footer />
          </ChakraProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
