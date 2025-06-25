import { notion } from "./client";
import { use } from "react";

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
