import { globalCss } from "@/lib/chakra-ui/theme/global-css";
import { linkRecipe } from "@/lib/chakra-ui/theme/recipes/link";
import { checkboxCardSlotRecipe } from "@/lib/chakra-ui/theme/slot-recipes/checkbox-card";
import { colors } from "@/lib/chakra-ui/theme/tokens/colors";
import { fonts } from "@/lib/chakra-ui/theme/tokens/fonts";
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const themeConfig = defineConfig({
  globalCss,
  theme: {
    tokens: {
      colors,
      fonts,
    },
    slotRecipes: {
      checkboxCard: checkboxCardSlotRecipe,
    },
    recipes: {
      link: linkRecipe,
    },
  },
});

export const system = createSystem(defaultConfig, themeConfig);
