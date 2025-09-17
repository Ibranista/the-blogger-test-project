"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import HumMenu from "./hum-menu";
import { fetchOptions } from "@/lib/api";

export function BlogHeader() {
  const [navContent, setNavContent] = useState<any[]>([]);

  useEffect(() => {
    fetchOptions().then((optionsResponse) => {
      if (optionsResponse.success) {
        const navs = optionsResponse.data?.nav_content;
        setNavContent(Array.isArray(navs) ? navs : []);
      }
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-primary-foreground font-bold text-lg">
                B
              </span>
            </div>
            <span className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
              Blog
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {Array.isArray(navContent) &&
              navContent.map(
                (
                  item: {
                    "nav-name": { title: string; url: string; target?: string };
                  },
                  index: number
                ) => (
                  <Link
                    key={index}
                    href={item["nav-name"].url}
                    className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-lg transition-all duration-200 hover:scale-105"
                    target={item["nav-name"].target || undefined}
                  >
                    {item["nav-name"].title}
                  </Link>
                )
              )}
          </nav>

          {/* HumMenu for mobile */}
          <HumMenu navContent={Array.isArray(navContent) ? navContent : []} />
        </div>
      </div>
    </header>
  );
}
