import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Navigation} from "@/components";
import React from "react";
import {NetworkProvider} from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js, Drizzle ORM & Neon Example",
  description: "A modern full-stack starter using Next.js, Drizzle ORM, Neon serverless Postgres, and React.",
  keywords: ["Next.js", "Drizzle ORM", "Neon", "React", "TypeScript", "PostgreSQL", "Full Stack", "Starter"],
  authors: [{ name: "nelsonmandeladev", url: "https://github.com/nelsonmandeladev" }],
  creator: "nelsonmandeladev",
  openGraph: {
    title: "Next.js, Drizzle ORM & Neon Example",
    description: "A modern full-stack starter using Next.js, Drizzle ORM, Neon serverless Postgres, and React.",
    url: "https://github.com/nelsonmandeladev/drizzle-nextjs-neon",
    siteName: "Next.js Drizzle Neon Starter",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js, Drizzle ORM & Neon Example",
    description: "A modern full-stack starter using Next.js, Drizzle ORM, Neon serverless Postgres, and React.",
    creator: "@nelsonmandeladev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
      <Navigation />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <NetworkProvider>
             {children}
         </NetworkProvider>
      </div>
      </body>
    </html>
  );
}
