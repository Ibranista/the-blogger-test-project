import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { BlogHeader } from "@/components/blog-header";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ibraheem's Blog | Modern Web Development Insights",
  description:
    "Stay updated with the latest trends, tutorials, and insights in web development, JavaScript, React, and Next.js.",
  keywords: [
    "blog",
    "web development",
    "JavaScript",
    "React",
    "Next.js",
    "frontend",
    "tutorials",
    "programming",
    "Ibraheem",
  ],
  openGraph: {
    title: "Ibraheem's Blog | Modern Web Development Insights",
    description:
      "Stay updated with the latest trends, tutorials, and insights in web development, JavaScript, React, and Next.js.",
    url: "the-blogger-test-project.vercel.app",
    siteName: "Ibraheem's Blog",
    images: [
      {
        url: "/vercel.svg",
        width: 1200,
        height: 630,
        alt: "Ibraheem's Blog Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("the-blogger-test-project.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="the-blogger-test-project.vercel.app" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BlogHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
