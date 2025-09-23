import type { Metadata } from "next";
import { Red_Hat_Display, Ubuntu_Sans } from "next/font/google";
import "@/styles/index.scss";
import LayoutHandler from "@/layout/LayoutHandler";
import { Provider } from "@/store";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Red_Hat_Display({
  variable: "--font-primary",
  subsets: ["latin"],
});

const geistMono = Ubuntu_Sans({
  variable: "--font-secondary",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Justice Lens",
  description: "Justice Lens | Your Community, Your Hero.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LayoutHandler>{children}</LayoutHandler>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
