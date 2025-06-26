import React from "react";
import groupBy from "lodash/groupBy";
import ProjectGroup from "./ProjectGroup";

interface Props {
  pages: { pageId: string; title: string; group: string }[];
}

export default function ProjectsContainer({ pages }: Props) {
  const grouped = groupBy(pages, (p) => p.group);

  return (
    <div className={` `}>
      {Object.entries(grouped).map(([group, groupPages]) => (
        <ProjectGroup key={group} pages={groupPages} />
      ))}
    </div>
  );
}
