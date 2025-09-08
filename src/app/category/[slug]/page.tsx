import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { fetchArticlesByCategory, fetchCategories } from "@/lib/api";
import { ArticleCard } from "@/components/article-card";
import { CategoryFilter } from "@/components/category-filter";
import { ErrorLoadingContent } from "@/components/not-found";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  const res = await fetchCategories();
  return res.success ? Object.keys(res.data).map((slug) => ({ slug })) : [];
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = decodeURIComponent(params.slug);

  try {
    const [articlesRes, categoriesRes] = await Promise.all([
      fetchArticlesByCategory(slug),
      fetchCategories(),
    ]);

    if (!articlesRes.success || !categoriesRes.success) throw new Error();
    const { data: articles, count } = articlesRes;
    const { data: categories } = categoriesRes;

    if (!categories[slug]) notFound();

    return (
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen">
        <div className="max-w-3xl mx-auto">
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
      </main>
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
