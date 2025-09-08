import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { ICategoryFilterProps } from "@/types/general.type";

export function CategoryFilter({
  categories,
  currentCategory,
}: ICategoryFilterProps) {
  return (
    <section className="flex flex-wrap gap-3 mb-8">
      <Link href="/">
        <Badge
          variant={!currentCategory ? "default" : "outline"}
          className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          All Posts
        </Badge>
      </Link>
      {Object.entries(categories).map(([key, value]) => (
        <Link key={key} href={`/category/${encodeURIComponent(key)}`}>
          <Badge
            variant={currentCategory === key ? "default" : "outline"}
            className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {value}
          </Badge>
        </Link>
      ))}
    </section>
  );
}
