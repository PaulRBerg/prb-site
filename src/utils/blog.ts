import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { SITE } from "@/config";
import { slugifyStr } from "@/utils/slugify";

export type BlogEntry = CollectionEntry<"blog">;

export interface BlogTag {
  count: number;
  name: string;
  slug: string;
}

export interface BlogMonthGroup {
  month: number;
  name: string;
  posts: BlogEntry[];
}

export interface BlogYearGroup {
  year: number;
  months: BlogMonthGroup[];
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
] as const;

const getPublishedTimestamp = (post: BlogEntry) => new Date(post.data.pubDatetime).getTime();

const getSortTimestamp = (post: BlogEntry) =>
  new Date(post.data.modDatetime ?? post.data.pubDatetime).getTime();

export const getTagSlug = (tag: string) => slugifyStr(tag);

export const isVisibleBlogPost = ({ data }: BlogEntry) => {
  const isPublishTimePassed =
    Date.now() > new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export const sortBlogPosts = (posts: BlogEntry[]) =>
  posts.toSorted((a, b) => getSortTimestamp(b) - getSortTimestamp(a));

export const getVisibleBlogPosts = async () => {
  const posts = await getCollection("blog");
  return sortBlogPosts(posts.filter(isVisibleBlogPost));
};

export const getRouteableBlogPosts = getVisibleBlogPosts;

export const getTagData = (posts: BlogEntry[]) => {
  const tags = new Map<string, BlogTag>();

  for (const post of posts) {
    for (const tagName of post.data.tags) {
      const slug = getTagSlug(tagName);
      const currentTag = tags.get(slug);

      if (currentTag) {
        currentTag.count += 1;
        continue;
      }

      tags.set(slug, {
        count: 1,
        name: tagName,
        slug
      });
    }
  }

  return [...tags.values()].toSorted((tagA, tagB) => tagA.slug.localeCompare(tagB.slug));
};

export const getPostsByTag = (posts: BlogEntry[], tag: string) =>
  sortBlogPosts(
    posts.filter((post) => post.data.tags.some((postTag) => getTagSlug(postTag) === tag))
  );

export const groupBlogPostsByYearAndMonth = (posts: BlogEntry[]) => {
  const groupedPosts = new Map<number, Map<number, BlogEntry[]>>();

  for (const post of posts.toSorted(
    (a, b) => getPublishedTimestamp(b) - getPublishedTimestamp(a)
  )) {
    const publishedDate = new Date(post.data.pubDatetime);
    const year = publishedDate.getFullYear();
    const month = publishedDate.getMonth();
    const yearGroup = groupedPosts.get(year) ?? new Map<number, BlogEntry[]>();
    const monthGroup = yearGroup.get(month) ?? [];

    monthGroup.push(post);
    yearGroup.set(month, monthGroup);
    groupedPosts.set(year, yearGroup);
  }

  return [...groupedPosts.entries()]
    .map(([year, months]) => ({
      months: [...months.entries()]
        .map(([month, monthPosts]) => ({
          month,
          name: MONTH_NAMES[month],
          posts: monthPosts
        }))
        .toSorted((monthA, monthB) => monthB.month - monthA.month),
      year
    }))
    .toSorted((yearA, yearB) => yearB.year - yearA.year);
};
