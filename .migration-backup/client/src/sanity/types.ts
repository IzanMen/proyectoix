import type { PortableTextBlock } from "@portabletext/react";

export interface SanityImageAsset {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
}

export interface PostListItem {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: SanityImageAsset;
  publishedAt: string;
  categories?: Pick<Category, "title" | "slug">[];
}

export interface Post extends PostListItem {
  body: PortableTextBlock[];
  seoTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  updatedAt?: string;
}
