"use client";

import { system } from "@/lib/chakra-ui/theme/original";
import { ChakraProvider as ChakraProviderBase } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

export function ChakraProvider(props: ColorModeProviderProps) {
  return (
    <ChakraProviderBase value={system}>
      <ColorModeProvider {...props} />
    </ChakraProviderBase>
  );
}
