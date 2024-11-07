import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

const sep = path.sep;
const contentSource = `..${sep}..${sep}docs`;

export async function generateStaticParams() {
  const filenames = await readdir(path.join(process.cwd(), contentSource));
  return filenames.map((name) => ({ slug: name.replace(".mdx", "") }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const filePath = path.join(process.cwd(), contentSource, slug + ".mdx");
  const file = await readFile(filePath, "utf8");

  const { data, content } = matter(file);

  return (
    <article>
      <h1>{data.title} and something</h1>
      <MDXRemote source={content} />
    </article>
  );
}
