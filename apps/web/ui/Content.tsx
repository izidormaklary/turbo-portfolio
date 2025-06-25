import { BlockObjectResponse } from "@notionhq/client";
import Project from "./projects/Project";
import ProjectNav from "./projects/ProjectNav";
import { useStaticPages } from "@/utils/notion/queries";

export default function Content() {
  const pages = useStaticPages();
  const filtered = (pages.results as BlockObjectResponse[])
    .filter((e) => e.type === "child_page")
    .map((e) => {
      const [group, title] = e.child_page.title.split(":");
      return {
        id: e.id,
        title,
        group,
        priority: e.child_page?.title?.toLowerCase().includes("priority")
          ? 1
          : 0,
      };
    });
  return (
    <div className="container mx-auto">
      <main className="flex flex-row gap-[32px] row-start-2 items-center sm:items-start">
        <ProjectNav pages={filtered} />
        <div className="flex flex-col">
          {filtered.map((p) => (
            <Project pageId={p.id} title={p.title} key={p.id} />
          ))}
        </div>
      </main>
    </div>
  );
}
