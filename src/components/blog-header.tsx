import { fetchOptions } from "@/lib/api";
import Link from "next/link";

export async function BlogHeader() {
  const [optionsResponse] = await Promise.all([fetchOptions()]);

  if (!optionsResponse.success) {
    throw new Error("Failed to fetch data");
  }

  const { data } = optionsResponse || {};
  const { nav_content } = data || {};
  console.log("data-->", nav_content);
  // nav_content is: [ { 'nav-name': '/' }, { 'nav-name': '/' } ]
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-heading font-bold text-primary"
          >
            Home
          </Link>
          <nav className="hidden md:flex items-center gap-6">
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
                    className="text-foreground hover:text-primary transition-colors"
                    target={item["nav-name"].target || undefined}
                  >
                    {item["nav-name"].title}
                  </Link>
                )
              )}
          </nav>
        </div>
      </div>
    </header>
  );
}
