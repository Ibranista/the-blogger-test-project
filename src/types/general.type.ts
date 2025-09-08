export interface IHomePageProps {
  searchParams: { page?: string };
}

export interface ICategoryFilterProps {
  categories: Record<string, string>;
  currentCategory?: string;
}

export interface IArticle {
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
  date: string;
}

export interface IApiResponse {
  success: boolean;
  data: IArticle[];
  pagination?: {
    current_page: number;
    per_page: number;
    total_pages: number;
    total_items: number;
  };
  count?: number;
}

export interface ICategoriesResponse {
  success: boolean;
  data: Record<string, string>;
}

export interface IPostPageProps {
  params: { id: string };
}
