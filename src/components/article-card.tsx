import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IArticle } from "@/types/general.type";
import StarButton from "./star-button";

interface ArticleCardProps {
  article: IArticle;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const excerpt =
    article.acf.content.length > 120
      ? article.acf.content.substring(0, 120) + "..."
      : article.acf.content;

  return (
    <article
      className="group relative"
      aria-labelledby={`article-title-${article.id}`}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        aria-hidden="true"
      />

      <Card className="relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-card/80">
        <Link
          href={`/post/${article.id}`}
          className="block"
          aria-labelledby={`article-title-${article.id}`}
        >
          <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
            <Image
              src={article.acf.featured_image.url || "/placeholder.svg"}
              alt={article.acf.featured_image.alt || article.acf.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60"
              aria-hidden="true"
            />

            <div className="absolute top-4 left-4 z-10">
              <Badge
                className="bg-background/90 text-foreground backdrop-blur-sm border-border/50 hover:bg-background transition-colors"
                aria-label={`Category: ${article.acf.category}`}
              >
                {article.acf.category}
              </Badge>
            </div>
          </div>
        </Link>

        <CardHeader className="pb-4 pt-6 px-6 relative z-20">
          <Link
            href={`/post/${article.id}`}
            className="block"
            aria-labelledby={`article-title-${article.id}`}
          >
            <h3
              id={`article-title-${article.id}`}
              className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors duration-300 text-balance line-clamp-2 leading-tight"
            >
              {article.acf.title}
            </h3>
          </Link>
        </CardHeader>

        <CardContent className="pt-0 px-6 pb-6 relative z-20">
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
            {excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="text-xs font-medium text-primary-foreground">
                  {article.acf.author?.charAt(0) || "A"}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {article.acf.author}
              </span>
            </div>

            {/* Actions: Star + Read */}
            <div className="flex items-center gap-4">
              <StarButton articleId={article.id} />

              <Link
                href={`/post/${article.id}`}
                className="flex items-center gap-1 text-sm font-medium text-primary hover:text-black transition-colors duration-300 group-hover:translate-x-1 relative z-30"
                aria-label={`Read more about ${article.acf.title}`}
              >
                Read
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </CardContent>

        {/* Hover effect border - behind content */}
        <div
          className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-2xl transition-all duration-500 -z-10"
          aria-hidden="true"
        />
      </Card>
    </article>
  );
}
