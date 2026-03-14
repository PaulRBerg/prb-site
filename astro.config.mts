import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight
} from "@shikijs/transformers";
import { defineConfig, envField, fontProviders } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import { SITE } from "./src/config";
import { transformerFileName } from "./src/utils/transformers/fileName";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true
      })
    }
  },
  fonts: [
    {
      cssVariable: "--font-google-sans-code",
      fallbacks: ["monospace"],
      name: "Google Sans Code",
      provider: fontProviders.google(),
      styles: ["normal", "italic"],
      weights: [300, 400, 500, 600, 700]
    }
  ],
  image: {
    layout: "constrained",
    responsiveStyles: true
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: {
      defaultColor: false,
      themes: { dark: "night-owl", light: "min-light" },
      transformers: [
        transformerFileName({ hideDot: false, style: "v2" }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" })
      ],
      wrap: false
    }
  },
  site: SITE.website,
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    },
    plugins: [tailwindcss()]
  }
});
