import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
import IconWhatsapp from "@/assets/icons/IconWhatsapp.svg";
import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import IconPinterest from "@/assets/icons/IconPinterest.svg";

export interface IconLinkDefinition {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

export const SOCIALS: IconLinkDefinition[] = [
  {
    href: "https://x.com/PaulRBerg",
    icon: IconBrandX,
    linkTitle: "Paul Berg on X",
    name: "X"
  },
  {
    href: "https://github.com/PaulRBerg",
    icon: IconGitHub,
    linkTitle: "Paul Berg on GitHub",
    name: "GitHub"
  },
  {
    href: "mailto:prberg@proton.me",
    icon: IconMail,
    linkTitle: "Email Paul Berg",
    name: "Email"
  },
  {
    href: "https://linkedin.com/in/prberg",
    icon: IconLinkedin,
    linkTitle: "Paul Berg on LinkedIn",
    name: "LinkedIn"
  }
] as const;

export const SHARE_LINKS: IconLinkDefinition[] = [
  {
    href: "https://wa.me/?text=",
    icon: IconWhatsapp,
    linkTitle: `Share this post via WhatsApp`,
    name: "WhatsApp"
  },
  {
    href: "https://www.facebook.com/sharer.php?u=",
    icon: IconFacebook,
    linkTitle: `Share this post on Facebook`,
    name: "Facebook"
  },
  {
    href: "https://x.com/intent/post?url=",
    icon: IconBrandX,
    linkTitle: `Share this post on X`,
    name: "X"
  },
  {
    href: "https://t.me/share/url?url=",
    icon: IconTelegram,
    linkTitle: `Share this post via Telegram`,
    name: "Telegram"
  },
  {
    href: "https://pinterest.com/pin/create/button/?url=",
    icon: IconPinterest,
    linkTitle: `Share this post on Pinterest`,
    name: "Pinterest"
  },
  {
    href: "mailto:?subject=See%20this%20post&body=",
    icon: IconMail,
    linkTitle: `Share this post via email`,
    name: "Mail"
  }
] as const;
