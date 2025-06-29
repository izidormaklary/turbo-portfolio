import { Suspense, use } from "react";
import Content from "@/ui/Content";
import Hero from "@/ui/Hero";
import { getChildPages, getPageContent } from "@/utils/notion/queries";
import { BlockObjectResponse } from "@notionhq/client";
export default function Home() {
  const pages = use(getChildPages());
  const filteredPages = use(
    Promise.all(
      (pages.results as BlockObjectResponse[])
        .filter((e) => e.type === "child_page")
        .map(async (e) => {
          const pageData = await getPageContent(e.id);
          const [group, title] = e.child_page.title.split(":");

          return {
            pageId: e.id,
            title,
            group,
            pageData,
            priority: e.child_page?.title?.toLowerCase().includes("priority")
              ? 1
              : 0,
          };
        })
    )
  );
  return (
    <div className="w-full ">
      <Hero />
      <Content pages={filteredPages} />
    </div>
  );
}
