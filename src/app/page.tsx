import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Ibraheem's Blog",
  description:
    "Welcome to Ibraheem's Blog. Explore articles on web development, JavaScript, React, and more.",
  openGraph: {
    title: "Home | Ibraheem's Blog",
    description:
      "Welcome to Ibraheem's Blog. Explore articles on web development, JavaScript, React, and more.",
    url: "the-blogger-test-project.vercel.app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | Ibraheem's Blog",
    description:
      "Welcome to Ibraheem's Blog. Explore articles on web development, JavaScript, React, and more.",
  },
};
import { Suspense } from "react";

import { ArticleCard } from "@/components/article-card";
import { CategoryFilter } from "@/components/category-filter";
import HeroSection from "@/components/hero-section";
import { ErrorLoadingContent, NotFound } from "@/components/not-found";
import { Pagination } from "@/components/pagination";
import { Container } from "@/components/ui/container";
import { ArticlesSkeleton } from "@/components/ui/skeleton";
import { fetchArticles, fetchCategories } from "@/lib/api";
import { parsePageNumber } from "@/lib/utils";

export default async function HomePage({ searchParams }: any) {
  const page = parsePageNumber(searchParams.page, 1);

  try {
    const [
      { success: articlesOk, data: articles, pagination },
      { success: categoriesOk, data: categories },
    ] = await Promise.all([fetchArticles(page, 6), fetchCategories()]);

    if (!articlesOk || !categoriesOk) return <ErrorLoadingContent />;

    return (
      <Container as="section" aria-labelledby="articles-heading">
        <main className="flex-1" role="main">
          <HeroSection />

          <section
            className="container mx-auto px-4 sm:px-6 lg:px-8"
            aria-labelledby="filter-heading"
          >
            <header className="mb-12 flex justify-center">
              <h2 id="filter-heading" className="sr-only">
                Filter articles by category
              </h2>
              <CategoryFilter
                categories={categories}
                aria-label="Category filter"
              />
            </header>

            <Suspense fallback={<ArticlesSkeleton aria-busy="true" />}>
              {articles.length ? (
                <>
                  <section
                    aria-labelledby="articles-heading"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                  >
                    <h2 id="articles-heading" className="sr-only">
                      Articles
                    </h2>
                    {articles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </section>

                  {pagination && (
                    <nav
                      aria-label="Pagination"
                      className="mt-16 flex justify-center"
                    >
                      <Pagination
                        currentPage={pagination.current_page}
                        totalPages={pagination.total_pages}
                      />
                    </nav>
                  )}
                </>
              ) : (
                <NotFound aria-live="polite" />
              )}
            </Suspense>
          </section>
        </main>
      </Container>
    );
  } catch {
    return <ErrorLoadingContent />;
  }
}
