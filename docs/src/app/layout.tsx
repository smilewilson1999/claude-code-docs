import "nextra-theme-docs/style.css";
import "./globals.css";

export const metadata = {
  title: {
    template: "%s — Claude Code Docs",
    default: "Claude Code Docs",
  },
  description:
    "Architecture documentation and source code guide for Claude Code",
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html dir="ltr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
