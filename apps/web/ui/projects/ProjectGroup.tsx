import React from "react";
import groupBy from "lodash/groupBy";
import Project from "./Project";

interface Props {
  pages: { pageId: string; title: string; group: string }[];
}

export default function ProjectGroup({ pages }: Props) {
  const grouped = groupBy(pages, (p) => p.group);

  return (
    <div className={``}>
      {Object.entries(grouped).map(([group, groupPages]) => (
        <div id={group} key={group} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{group}</h2>
          <div className="flex flex-col gap-4">
            {groupPages.map((page) => (
              <Project
                key={page.pageId}
                pageId={page.pageId}
                title={page.title}
                group={group}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
