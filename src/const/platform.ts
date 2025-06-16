import { Platform } from "@/lib/prisma/generated";
import { type IconType } from "react-icons";
import { FaTiktok } from "react-icons/fa6";
import {
  LuFacebook,
  LuInstagram,
  LuLink,
  LuTwitter,
  LuYoutube,
} from "react-icons/lu";

export const platformValues = [
  Platform.INSTAGRAM,
  Platform.TIKTOK,
  Platform.YOUTUBE,
  Platform.X,
  Platform.FACEBOOK,
  Platform.OTHER,
] as const;

export const platformLabels = {
  [Platform.INSTAGRAM]: "Instagram",
  [Platform.TIKTOK]: "TikTok",
  [Platform.YOUTUBE]: "YouTube",
  [Platform.X]: "X（旧Twitter）",
  [Platform.FACEBOOK]: "Facebook",
  [Platform.OTHER]: "その他",
} satisfies Record<Platform, string>;

export const platformIcons = {
  [Platform.INSTAGRAM]: LuInstagram,
  [Platform.TIKTOK]: FaTiktok,
  [Platform.YOUTUBE]: LuYoutube,
  [Platform.X]: LuTwitter,
  [Platform.FACEBOOK]: LuFacebook,
  [Platform.OTHER]: LuLink,
} satisfies Record<Platform, IconType>;

export const platforms = platformValues.map((value) => ({
  value,
  label: platformLabels[value],
}));
