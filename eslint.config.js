import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default tseslint.config(
  {
    ignores: [".next", "src/lib/prisma/generated"],
  },
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["../*", "./*"],
          paths: [
            {
              name: "zod",
              importNames: ["z"],
              message: "Please import 'z' from '@/lib/zod' instead.",
            },
          ],
        },
      ],
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },
  {
    files: ["src/lib/chakra-ui/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
  {
    files: ["prisma/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": "off",
      "no-console": "off",
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
);
