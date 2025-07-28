import { z } from "zod"; // eslint-disable-line no-restricted-imports

import { localeError } from "@/lib/zod/error";
import { ja } from "zod/locales";

z.config({
  ...ja(),
  localeError: localeError(),
});

export { z };
