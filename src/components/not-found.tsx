import Link from "next/link";
import React from "react";

import { BlogHeader } from "./blog-header";
import { Button } from "./ui/button";

function NotFound() {
  return (
    <section className="text-center py-20" aria-label="No articles found">
      <figure className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
        <span className="text-4xl">📝</span>
      </figure>
      <p className="text-muted-foreground text-xl font-medium">
        No articles found
      </p>
      <p className="text-muted-foreground/80 mt-2">
        Check back soon for new content!
      </p>
    </section>
  );
}

function ErrorLoadingContent({
  name,
  description,
  showReturn,
}: {
  name?: string;
  description?: string;
  showReturn?: boolean;
}) {
  return (
    <section className="min-h-screen bg-background">
      <BlogHeader />
      <main className="container mx-auto px-4 py-20">
        <section
          className="text-center max-w-md mx-auto"
          aria-label="Error loading content"
        >
          <figure className="w-16 h-16 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </figure>
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
            Error Loading {name || "Content"}
          </h1>
          <p className="text-muted-foreground">
            We&apos;re having trouble loading {description || " the blog posts"}
            . Please try again later.
          </p>
          {showReturn && (
            <Link href="/" className="mt-3 inline-block">
              <Button variant="outline" size="sm">
                Return Home
              </Button>
            </Link>
          )}
        </section>
      </main>
    </section>
  );
}

export { ErrorLoadingContent, NotFound };
