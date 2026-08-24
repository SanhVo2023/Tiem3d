import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import readingTime from "reading-time";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    author: {
      type: "string",
      default: "Tiệm 3D",
    },
    image: {
      type: "string",
    },
    tags: {
      type: "list",
      of: { type: "string" },
      default: [],
    },
    featured: {
      type: "boolean",
      default: false,
    },
    draft: {
      type: "boolean",
      default: false,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("blog/", ""),
    },
    readingTime: {
      type: "string",
      resolve: (doc) => {
        const time = readingTime(doc.body.raw);
        return time.text.replace("min read", "phút đọc");
      },
    },
    url: {
      type: "string",
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace("blog/", "")}`,
    },
    // Searchable content (strip MDX)
    searchContent: {
      type: "string",
      resolve: (doc) => {
        // Remove MDX components and get plain text for search
        return doc.body.raw
          .replace(/<[^>]*>/g, "")
          .replace(/\{[^}]*\}/g, "")
          .replace(/[#*`\[\]]/g, "")
          .toLowerCase();
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ],
  },
});
