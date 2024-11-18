import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

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
        components={{
          h2: ({ children }) => <h2 className="bg-red-600">{children}</h2>,
        }}
      />
    </article>
  );
}
