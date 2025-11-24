import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Antigravity - Next-generation IDE",
  description: "Experience liftoff with the next-generation IDE",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Load theme controller before hydration to avoid flash */}
        <Script src="/theme.js" strategy="beforeInteractive" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} app-body`}>
        {children}
      </body>
    </html>
  );
}
