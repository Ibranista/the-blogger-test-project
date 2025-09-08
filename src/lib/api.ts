const BASE_URL = "https://wordpress-zvamn.wasmer.app";

export interface Article {
  id: number;
  title: string;
  content: string;
  acf: {
    title: string;
    content: string;
    featured_image: {
      url: string;
      alt: string;
      width: number;
      height: number;
    };
    author: string;
    category: string;
  };
}

export interface ApiResponse {
  success: boolean;
  data: Article[];
  pagination?: {
    current_page: number;
    per_page: number;
    total_pages: number;
    total_items: number;
  };
  count?: number;
}

export interface CategoriesResponse {
  success: boolean;
  data: Record<string, string>;
}

export async function fetchArticles(
  page = 1,
  perPage = 6
): Promise<ApiResponse> {
  const response = await fetch(
    `${BASE_URL}/wp-json/custom-api/v1/articles?page=${page}&per_page=${perPage}`,
    { next: { revalidate: 300 } } // Cache for 5 minutes
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
}

export async function fetchArticlesByCategory(
  category: string
): Promise<ApiResponse> {
  const response = await fetch(
    `${BASE_URL}/wp-json/custom-api/v1/articles-category?category=${encodeURIComponent(category)}`,
    { next: { revalidate: 300 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles by category");
  }

  return response.json();
}

export async function fetchCategories(): Promise<CategoriesResponse> {
  const response = await fetch(`${BASE_URL}/wp-json/custom-api/v1/categories`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export async function fetchArticleById(id: number): Promise<Article | null> {
  try {
    const response = await fetchArticles(1, 100);
    const article = response.data.find((article) => article.id === id);
    return article || null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}
