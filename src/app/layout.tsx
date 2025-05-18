import "@/app/globals.css";
import "@/lib/zod";

import type { Metadata, Viewport } from "next";

import { ChakraProvider } from "@/lib/chakra-ui/provider";
import { TRPCReactProvider } from "@/lib/trpc/react";

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
          <ChakraProvider defaultTheme="light">{children}</ChakraProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
