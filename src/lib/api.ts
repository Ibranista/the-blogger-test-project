import {
  IApiResponse,
  IArticle,
  ICategoriesResponse,
} from "@/types/general.type";

const BASE_URL = "https://wordpress-zvamn.wasmer.app";

export async function fetchArticles(
  page = 1,
  perPage = 6
): Promise<IApiResponse> {
  const response = await fetch(
    `${BASE_URL}/wp-json/custom-api/v1/articles?page=${page}&per_page=${perPage}`,
    { next: { revalidate: 300 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
}

export async function fetchArticlesByCategory(
  category: string
): Promise<IApiResponse> {
  const response = await fetch(
    `${BASE_URL}/wp-json/custom-api/v1/articles-category?category=${encodeURIComponent(category)}`,
    { next: { revalidate: 300 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles by category");
  }

  return response.json();
}

export async function fetchCategories(): Promise<ICategoriesResponse> {
  const response = await fetch(`${BASE_URL}/wp-json/custom-api/v1/categories`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export async function fetchArticleById(id: number): Promise<IArticle | null> {
  try {
    const response = await fetchArticles(1, 100);
    const article = response.data.find((article) => article.id === id);
    return article || null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export interface OptionsResponse {
  success: boolean;
  data: Record<string, string>;
}

export async function fetchOptions(): Promise<OptionsResponse> {
  const response = await fetch(`${BASE_URL}/wp-json/custom-api/v1/options`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch options");
  }

  return response.json();
}
