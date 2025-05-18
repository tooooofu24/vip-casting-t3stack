import { Box } from "@chakra-ui/react";
import type { Metadata } from "next";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: "VIPキャスティング 管理画面",
  description: "VIPキャスティング 管理画面",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Box as="main" h="full">
      {children}
    </Box>
  );
}
