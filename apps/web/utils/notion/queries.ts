import { notion } from "./client";

export function getChildPages() {
  return notion.blocks.children.list({
    block_id: process.env.NEXT_PUBLIC_NOTION_PARENT_PAGE_ID!,
  });
}
export function getPageContent(pageId: string) {
  return notion.blocks.children.list({
    block_id: pageId,
  });
}
