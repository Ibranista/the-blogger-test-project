import Link from "next/link";

import { fetchOptions } from "@/lib/api";

export async function BlogHeader() {
  const [optionsResponse] = await Promise.all([fetchOptions()]);

  if (!optionsResponse.success) {
    throw new Error("Failed to fetch data");
  }

  const { data } = optionsResponse || {};
  const { nav_content } = data || {};

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

          <nav className="hidden md:flex items-center space-x-1">
            {Array.isArray(nav_content) &&
              nav_content.map(
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

          <button className="md:hidden p-2 rounded-lg hover:bg-accent/50 transition-colors">
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-foreground/80 rounded"></div>
              <div className="w-full h-0.5 bg-foreground/80 rounded"></div>
              <div className="w-full h-0.5 bg-foreground/80 rounded"></div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
