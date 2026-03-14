import { slugifyStr } from "@/utils/slugify";

export const getPostTransitionName = (title: string) => slugifyStr(title.replaceAll(".", "-"));

export const getReadingTime = (content: string) => {
  const sanitizedContent = content
    .replaceAll(/```[\s\S]*?```/g, " ")
    .replaceAll(/`[^`]*`/g, " ")
    .replaceAll(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replaceAll(/\[([^\]]*)]\([^)]*\)/g, " $1 ")
    .replaceAll(/<[^>]+>/g, " ");

  const wordCount = sanitizedContent.match(/\b[\p{L}\p{N}']+\b/gu)?.length ?? 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));

  return `${minutes} min read`;
};
