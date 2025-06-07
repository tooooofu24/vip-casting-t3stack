import i18next from "i18next";
import { z } from "zod"; // eslint-disable-line no-restricted-imports
import { zodI18nMap } from "zod-i18n-map";

// Import your language translation files
// import translation from "zod-i18n-map/locales/ja/zod.json";
import translation from "@/lib/zod/ja.json";

// lng and resources key depend on your locale.
void i18next.init({
  lng: "ja",
  resources: {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    ja: { zod: translation as Record<string, unknown> },
  },
});

z.setErrorMap(zodI18nMap);

export { z };
