import Link from "next/link";
import { ComponentProps } from "react";

export function Hello({ children }: ComponentProps<"div">) {
  return <div className="bg-blue-400 text-2xl text-red-900">{children}</div>;
}

export function a({ children, href, target }: ComponentProps<"a">) {
  if (!href?.startsWith("/")) {
    target = "_blank";
  }

  return (
    <Link className="hover:underline" href={`${href}`}>
      {target == "_blank" && "^ "}
      {children}
    </Link>
  );
}

export const h2 = ({ children }: ComponentProps<"h2">) => (
  <h2 className="bg-red-600">{children}</h2>
);
