"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface Props {
  title: string;
}
export default function ProjectHeader({ title }: Props) {
  const params = useSearchParams();

  useEffect(
    () => {
      const project = params.get("project");
      if (project === title.replace(" ", "-")) {
        document.title = `Izidor Maklary | ${title}`;
        document.getElementById(`p-header-${title}`)?.scrollIntoView({
          // behavior: "smooth",
          block: "start",
        });
      }
    },
    [params, title] // Re-run effect when params change
  );
  return (
    <h1 id={`p-header-${title}`} className="py-4 text-3xl font-bold">
      {title}
    </h1>
  );
}
