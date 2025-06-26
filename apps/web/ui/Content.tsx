import { BlockObjectResponse } from "@notionhq/client";
import ProjectNav from "./projects/ProjectNav";
import { useStaticPages } from "@/utils/notion/queries";
import ProjectGroup from "./projects/ProjectGroup";

export default function Content() {
  const pages = useStaticPages();
  const filtered = (pages.results as BlockObjectResponse[])
    .filter((e) => e.type === "child_page")
    .map((e) => {
      const [group, title] = e.child_page.title.split(":");
      return {
        pageId: e.id,
        title,
        group,
        priority: e.child_page?.title?.toLowerCase().includes("priority")
          ? 1
          : 0,
      };
    });

  return (
    <div className="container mx-auto">
      <main className="flex flex-row justify-evenly gap-[32px] row-start-2 items-center sm:items-start">
        <ProjectNav pages={filtered} />
        <div className="flex flex-col items-center ">
          <ProjectGroup pages={filtered} />
        </div>
      </main>
    </div>
  );
}
