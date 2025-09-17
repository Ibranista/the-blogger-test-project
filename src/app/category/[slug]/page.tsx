import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category | Ibraheem's Blog",
  description: "Browse posts by category on Ibraheem's Blog.",
  openGraph: {
    title: "Category | Ibraheem's Blog",
    description: "Browse posts by category on Ibraheem's Blog.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Category | Ibraheem's Blog",
    description: "Browse posts by category on Ibraheem's Blog.",
  },
};
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/article-card";
import { CategoryFilter } from "@/components/category-filter";
import { ErrorLoadingContent } from "@/components/not-found";
import { Button } from "@/components/ui/button";
import { fetchArticlesByCategory, fetchCategories } from "@/lib/api";

// Generate static paths for all categories
export async function generateStaticParams() {
  const res = await fetchCategories();
  return res.success ? Object.keys(res.data).map((slug) => ({ slug })) : [];
}

// Main page component
export default async function CategoryPage({ params }: any) {
  const slug = decodeURIComponent(params.slug);

  try {
    const [articlesRes, categoriesRes] = await Promise.all([
      fetchArticlesByCategory(slug),
      fetchCategories(),
    ]);

    if (!articlesRes.success || !categoriesRes.success) {
      throw new Error("Failed to load data");
    }

    const { data: articles, count } = articlesRes;
    const { data: categories } = categoriesRes;

    if (!categories[slug]) {
      notFound();
    }

    return (
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="mb-4 inline-block">
            <Button variant="ghost" size="sm" className="gap-2 pl-0">
              <ArrowLeft className="h-4 w-4" /> Back to All Posts
            </Button>
          </Link>

          <header className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2 leading-snug">
              {categories[slug]}
            </h1>
            <p className="text-sm text-muted-foreground">
              {count} {count === 1 ? "article" : "articles"} in this category
            </p>
          </header>

          <CategoryFilter categories={categories} currentCategory={slug} />

          {articles.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {articles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground py-12">
              No articles found in this category.
            </p>
          )}
        </div>
      </section>
    );
  } catch {
    return (
      <ErrorLoadingContent
        name="Category"
        description="this category."
        showReturn
      />
    );
  }
}
