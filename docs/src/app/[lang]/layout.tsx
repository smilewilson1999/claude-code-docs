import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { Footer, Layout, Navbar } from "nextra-theme-docs";

const LOCALES = [
  { locale: "en", name: "English" },
  { locale: "zh-CN", name: "简体中文" },
  { locale: "zh-TW", name: "繁體中文" },
];

const LangLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const pageMap = await getPageMap(`/${lang}`);

  return (
    <Layout
      editLink="Edit this page on GitHub"
      footer={
        <Footer>MIT {new Date().getFullYear()} © Claude Code Docs</Footer>
      }
      navbar={
        <Navbar
          logo={
            <span style={{ fontWeight: 700, fontSize: 18 }}>
              Claude Code Docs
            </span>
          }
        />
      }
      pageMap={pageMap}
      sidebar={{ defaultMenuCollapseLevel: 1 }}
      i18n={LOCALES}
    >
      <Head faviconGlyph="⌘" />
      {children}
    </Layout>
  );
};

export default LangLayout;
