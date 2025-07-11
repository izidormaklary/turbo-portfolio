"use cache";
import Content from "@/ui/Content";
import Hero from "@/ui/Hero";
import { getChildPages, getPageContent } from "@/utils/notion/queries";
import { BlockObjectResponse } from "@notionhq/client";
import { unstable_cacheTag as cacheTag } from "next/cache";
export default async function Home() {
  cacheTag("home");
  const pages = await getChildPages();
  const filteredPages = await Promise.all(
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
  );

  return (
    <div className="w-full ">
      <Hero />
      <Content pages={filteredPages} />
    </div>
  );
}
