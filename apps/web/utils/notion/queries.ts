import {
  BlockObjectResponse,
  ImageBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
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

export async function replaceImageBlock(
  page: BlockObjectResponse,
  toDelete: ImageBlockObjectResponse,
  imgUrl: string
) {
  // append new block with external IMG url
  await notion.blocks.children.append({
    after: toDelete.id,
    block_id: page.id,
    children: [
      {
        object: "block",
        type: "image",
        image: {
          type: "external",
          external: {
            url: imgUrl,
          },
          caption: toDelete.image.caption.filter((c) => c.type !== "mention"),
        },
      },
    ],
  });
  console.log(`Appended new image block with URL: ${imgUrl}`);
  // delete the old one
  await notion.blocks.delete({
    block_id: toDelete.id,
  });
  console.log(
    `Deleted old image block ${toDelete.id} and replaced with new URL.`
  );
}
