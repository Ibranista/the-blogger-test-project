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
      <Container as="section">
        <main className="flex-1">
          <HeroSection />

          <section className="container mx-auto px-4 sm:px-6 lg:px-8">
            <article className="mb-12 flex justify-center">
              <CategoryFilter categories={categories} />
            </article>

            <Suspense fallback={<ArticlesSkeleton />}>
              {articles.length ? (
                <>
                  <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {articles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </section>

                  {pagination && (
                    <section className="mt-16 flex justify-center">
                      <Pagination
                        currentPage={pagination.current_page}
                        totalPages={pagination.total_pages}
                      />
                    </section>
                  )}
                </>
              ) : (
                <NotFound />
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
