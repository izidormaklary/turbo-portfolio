"use client";
import React from "react";
import Project from "./Project";
import { ListBlockChildrenResponse } from "@notionhq/client";

interface Props {
  pages: {
    pageId: string;
    title: string;
    group: string;
    pageData: ListBlockChildrenResponse;
  }[];
}

export default function ProjectGroup({ pages }: Props) {
  return (
    // <h2 className="text-2xl font-bold mb-4">{group}</h2>
    <div className="flex flex-col gap-4 bg-foreground/5 text-foreground grow rounded-md p-10">
      {pages.map((page) => (
        <Project
          key={page.pageId}
          pageId={page.pageId}
          title={page.title}
          group={page.group}
          pageData={page.pageData}
        />
      ))}
    </div>
  );
}
