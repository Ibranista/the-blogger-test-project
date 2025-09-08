import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post | Ibraheem's Blog",
  description:
    "Read this post on Ibraheem's Blog. Web development, JavaScript, React, and more.",
  openGraph: {
    title: "Post | Ibraheem's Blog",
    description:
      "Read this post on Ibraheem's Blog. Web development, JavaScript, React, and more.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Post | Ibraheem's Blog",
    description:
      "Read this post on Ibraheem's Blog. Web development, JavaScript, React, and more.",
  },
};
import { fetchArticles } from "@/lib/api";

export async function generateStaticParams() {
  const response = await fetchArticles(1, 100);
  return response.data.map((article) => ({ id: article.id.toString() }));
}
import "react-toastify/dist/ReactToastify.css";

import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";

import { ErrorLoadingContent } from "@/components/not-found";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ShareButton from "@/components/ui/share-button";
import { fetchArticleById, fetchCategories } from "@/lib/api";
import { calculateReadingTime, formatDate, splitParagraphs } from "@/lib/utils";

export default async function PostPage({ params }: any) {
  const articleId = Number.parseInt(params.id);

  if (isNaN(articleId)) {
    notFound();
  }

  try {
    const [article] = await Promise.all([
      fetchArticleById(articleId),
      fetchCategories(),
    ]);

    if (!article) {
      notFound();
    }

    const readingTime = calculateReadingTime(article.acf.content);

    return (
      <article className="min-h-screen bg-background">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="mb-4" aria-label="Back to blog">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 pl-0">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </nav>

          <section className="max-w-2xl mx-auto">
            <header className="mb-6">
              <Badge
                variant="secondary"
                className="bg-accent/20 text-accent-foreground px-2 py-0.5 text-xs"
              >
                {article.acf.category}
              </Badge>

              <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mt-3 mb-4 leading-snug">
                {article.acf.title}
              </h1>

              <section className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground text-sm mb-6">
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(article.date)}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{readingTime} min read</span>
                  </span>
                </div>
              </section>

              <figure className="relative overflow-hidden rounded-xl mb-6">
                <div className="aspect-[16/9] relative">
                  <Image
                    src={article.acf.featured_image.url || "/placeholder.svg"}
                    alt={article.acf.featured_image.alt || article.acf.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </figure>
            </header>

            <section className="prose prose-sm max-w-none">
              <div className="text-sm leading-relaxed text-foreground whitespace-pre-wrap space-y-3">
                {splitParagraphs(article.acf.content).map(
                  (paragraph, index) => (
                    <p key={index} className="text-foreground/90">
                      {paragraph}
                    </p>
                  )
                )}
              </div>
            </section>

            {/* Share and Footer Section */}
            <footer className="mt-8 pt-6 border-t border-border/40">
              <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <address className="flex items-center gap-3 not-italic">
                  <span className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {article.acf.author?.charAt(0) || "A"}
                    </span>
                  </span>
                  <span>
                    <p className="font-medium text-foreground text-sm">
                      {article.acf.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Article Author
                    </p>
                  </span>
                </address>

                <div className="flex items-center gap-2">
                  <ShareButton />
                </div>
              </section>
            </footer>
          </section>
        </main>

        {/* Toast container for share feedback */}
        <ToastContainer position="bottom-center" hideProgressBar />
      </article>
    );
  } catch (error) {
    return <ErrorLoadingContent name="post" description="this post." />;
  }
}
