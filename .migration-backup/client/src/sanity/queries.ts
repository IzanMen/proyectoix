import { sanityClient } from "./client";
import type { Post, PostListItem } from "./types";

const POST_LIST_PROJECTION = `
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  "categories": categories[]->{
    title,
    slug
  }
`;

const POST_DETAIL_PROJECTION = `
  _id,
  title,
  slug,
  excerpt,
  seoTitle,
  metaDescription,
  keywords,
  mainImage,
  publishedAt,
  "updatedAt": _updatedAt,
  body,
  "categories": categories[]->{
    title,
    slug
  }
`;

export async function fetchPosts(): Promise<PostListItem[]> {
  return sanityClient.fetch<PostListItem[]>(
    `*[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) {${POST_LIST_PROJECTION}}`,
  );
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  return sanityClient.fetch<Post | null>(
    `*[_type == "post" && slug.current == $slug && defined(slug.current) && publishedAt <= now()][0] {${POST_DETAIL_PROJECTION}}`,
    { slug },
  );
}
