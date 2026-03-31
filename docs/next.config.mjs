import nextra from "nextra";

const withNextra = nextra({
  contentDirBasePath: "/",
});

export default withNextra({
  reactStrictMode: true,
  i18n: {
    locales: ["en", "zh-CN", "zh-TW"],
    defaultLocale: "en",
  },
});
