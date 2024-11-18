import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";
import rehypePrettyCode from "rehype-pretty-code";
import remarkSmartypants from "remark-smartypants";
import * as mdxComponents from "./mdx-components";
import "./markdown.css";

const sep = path.sep;
const contentSource = `..${sep}..${sep}docs`;

export async function generateStaticParams() {
  const filepaths = await readdir(path.join(process.cwd(), contentSource), {
    recursive: true,
  });
  return filepaths
    .filter((filepath) => filepath.endsWith(".mdx"))
    .map((filepath) => ({
      slug: filepath.replace(/\.mdx$/, "").split("/"),
    }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const slug = (await params).slug;
  const filePath = path.join(
    process.cwd(),
    contentSource,
    slug.join(sep) + ".mdx"
  );
  const file = await readFile(filePath, "utf8");

  const { data, content } = matter(file);

  return (
    <article>
      <h1>{data.title} and something</h1>
      <MDXRemote
        source={content}
        components={{ ...mdxComponents }}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkSmartypants],
            rehypePlugins: [[rehypePrettyCode]],
          },
        }}
      />
    </article>
  );
}
