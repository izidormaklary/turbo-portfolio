import { notion } from "./client";
import { use } from "react";
import { NotionAPI } from "notion-client";
export function useStaticPages() {
  return use(
    notion.blocks.children.list({
      block_id: process.env.NEXT_PUBLIC_NOTION_PARENT_PAGE_ID!,
    })
  );
}
export function usePage(pageId: string) {
  return use(
    notion.blocks.children.list({
      block_id: pageId,
    })
  );
}

export function useNotionPage(pageId: string) {
  // console.log(
  //   "useNotionPage called",
  //   process.env.NEXT_PUBLIC_NOTION_AUTH_TOKEN
  // );
  const notion2 = new NotionAPI({
    authToken: process.env.NOTION_API_KEY2!,
    activeUser: process.env.NOTION_API_USER2,
  });

  return use(notion2.getPage(pageId!));
}
