import { defineSlotRecipe } from "@chakra-ui/react";

export const checkboxCardSlotRecipe = defineSlotRecipe({
  slots: [
    "root",
    "control",
    "label",
    "description",
    "addon",
    "indicator",
    "content",
  ],
  base: {
    root: {
      flex: undefined,
    },
  },
});
