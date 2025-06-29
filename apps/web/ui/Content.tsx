"use client";
import ProjectNav from "./projects/ProjectNav";
import ProjectGroup from "./projects/ProjectGroup";
import { ListBlockChildrenResponse } from "@notionhq/client";
import groupBy from "lodash/groupBy";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
interface Props {
  pages: {
    pageId: string;
    title: string;
    group: string;
    pageData: ListBlockChildrenResponse;
  }[];
}
export default function Content({ pages }: Props) {
  const grouped = groupBy(pages, (p) => p.group);
  const params = useSearchParams();

  const selectedGroup = useMemo(() => {
    const project = params.get("project")?.toLowerCase();
    if (!project || typeof project !== "string") return grouped["about"];

    return (
      Object.entries(grouped).find(([, p]) =>
        p
          .map((e) => e.title.toLowerCase())
          .includes(project.replace("-", " ").toLowerCase())
      )?.[1] || grouped["about"]
    );
  }, [params, grouped]);

  return (
    <main className="container min-h-screen mx-auto">
      <div className="flex relative flex-row justify-evenly gap-[32px] row-start-2 items-center sm:items-start">
        <ProjectNav pages={pages} />
        <ProjectGroup pages={selectedGroup} />
      </div>
    </main>
  );
}
