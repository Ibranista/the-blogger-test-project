import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IPaginationProps } from "@/types/general.type";

export function Pagination({
  currentPage,
  totalPages,
  basePath = "",
}: IPaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    if (basePath) {
      return `${basePath}?page=${page}`;
    }
    return `/?page=${page}`;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {currentPage > 1 && (
        <Link href={getPageUrl(currentPage - 1)}>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
        </Link>
      )}

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link key={page} href={getPageUrl(page)}>
            <Button
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              className="w-10"
            >
              {page}
            </Button>
          </Link>
        ))}
      </div>

      {currentPage < totalPages && (
        <Link href={getPageUrl(currentPage + 1)}>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      )}
    </div>
  );
}
