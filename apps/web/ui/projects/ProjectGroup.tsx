"use client";
import React, { useCallback } from "react";
import Project from "./Project";
import { ListBlockChildrenResponse } from "@notionhq/client";
import Link from "next/link";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

interface Props {
  pages: {
    pageId: string;
    title: string;
    group: string;
    pageData: ListBlockChildrenResponse;
  }[];
  previousGroupFirstProject: {
    title: string;
    group: string;
  };
  nextGroupFirstProject: {
    title: string;
    group: string;
  };
}
export default function ProjectGroup({
  pages,
  previousGroupFirstProject,
  nextGroupFirstProject,
}: Props) {
  const onNavClick = useCallback((pageId: string) => {
    window.history.pushState(null, "", `/?project=${pageId.replace(" ", "-")}`);
    // router.push(`/home/${pageId}`);
  }, []);
  return (
    <div className="grow">
      {/* <h2 className="text-2xl font-bold mb-4">{group}</h2> */}
      <div className="flex flex-col items-center gap-4  bg-foreground/5 text-foreground rounded-md p-10">
        {pages.map((page) => (
          <Project
            key={page.pageId}
            pageId={page.pageId}
            title={page.title}
            group={page.group}
            pageData={page.pageData}
          />
        ))}
        <div className="flex flex-row gap-4 justify-evenly w-full">
          <button
            className="flex items-center gap-2 hover:text-amber-100/70 cursor-pointer"
            onClick={() => onNavClick(previousGroupFirstProject.title)}
          >
            <FiArrowLeft className="w-4 h-4" />
            {previousGroupFirstProject.group}
          </button>
          <button
            className="flex items-center gap-2 hover:text-amber-100/70 cursor-pointer"
            onClick={() => onNavClick(nextGroupFirstProject.title)}
          >
            {nextGroupFirstProject.group}
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
