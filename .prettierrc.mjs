// Keep in sync with .oxfmtrc.json
export default {
  astroCompressHTML: "html",
  overrides: [{ files: "*.md", options: { proseWrap: "always" } }],
  plugins: ["prettier-plugin-astro"],
  printWidth: 100
};
