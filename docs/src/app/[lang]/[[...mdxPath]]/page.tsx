import { notFound } from "next/navigation";
import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents as getMDXComponents } from "../../../../mdx-components";

const VALID_LOCALES = new Set(["en", "zh-CN", "zh-TW"]);

export const generateStaticParams = generateStaticParamsFor("mdxPath");

export async function generateMetadata(props: {
  params: Promise<{ mdxPath?: string[]; lang: string }>;
}) {
  const params = await props.params;
  if (!VALID_LOCALES.has(params.lang)) {
    notFound();
  }
  const { metadata } = await importPage(params.mdxPath, params.lang);
  return metadata;
}

const Wrapper = getMDXComponents().wrapper;

const Page = async (props: {
  params: Promise<{ mdxPath?: string[]; lang: string }>;
}) => {
  const params = await props.params;
  if (!VALID_LOCALES.has(params.lang)) {
    notFound();
  }
  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode,
  } = await importPage(params.mdxPath, params.lang);
  return (
    <Wrapper metadata={metadata} sourceCode={sourceCode} toc={toc}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
};

export default Page;
