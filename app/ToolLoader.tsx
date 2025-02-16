"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const NotFoundComponent = () => <p>Tool not found.</p>;
NotFoundComponent.displayName = "NotFoundComponent";

export default function ToolLoader() {
  const searchParams = useSearchParams();
  const tool = searchParams.get("tool");

  const ToolComponent = tool
    ? dynamic(
        () =>
          import(`./components/${tool}`)
            .then((mod) => {
              mod.default.displayName = `${tool} Component`;
              return mod;
            })
            .catch(() => NotFoundComponent),
        { ssr: false }
      )
    : null;

  return (
    <Suspense fallback={<p>Loading tool...</p>}>
      {ToolComponent ? <ToolComponent /> : <p>Coming Soon</p>}
    </Suspense>
  );
}
