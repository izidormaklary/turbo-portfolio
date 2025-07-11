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

  const { selectedGroup, previousGroupFirstProject, nextGroupFirstProject } =
    useMemo(() => {
      const project = params.get("project")?.toLowerCase();

      const groupEntries = Object.entries(grouped);
      const [selectedGroupName, selectedGroup] = groupEntries.find(
        ([g, pages]) =>
          pages
            .map((e) => e.title.toLowerCase())
            .includes(project?.replace("-", " ").toLowerCase() || "about")
      ) || ["about", grouped["about"]];
      const groupNames = Object.keys(grouped);
      const selectedGroupIndex = groupNames.indexOf(selectedGroupName);
      const previousGroupFirstProject =
        grouped[
          selectedGroupIndex > 0
            ? groupNames[selectedGroupIndex - 1]
            : groupNames[groupNames.length - 1]
        ][0];
      const nextGroupFirstProject =
        grouped[
          selectedGroupIndex < groupNames.length - 1
            ? groupNames[selectedGroupIndex + 1]
            : groupNames[0]
        ][0];
      return {
        selectedGroup,
        previousGroupFirstProject: {
          title: previousGroupFirstProject.title,
          group: previousGroupFirstProject.group,
        },
        nextGroupFirstProject: {
          title: nextGroupFirstProject.title,
          group: nextGroupFirstProject.group,
        },
      };
    }, [params, grouped]);

  return (
    <main className="container min-h-screen mx-auto">
      <div className="flex relative flex-row justify-evenly gap-[32px] row-start-2 items-center sm:items-start">
        <ProjectNav pages={pages} />
        <ProjectGroup
          pages={selectedGroup}
          previousGroupFirstProject={previousGroupFirstProject}
          nextGroupFirstProject={nextGroupFirstProject}
        />
      </div>
    </main>
  );
}
