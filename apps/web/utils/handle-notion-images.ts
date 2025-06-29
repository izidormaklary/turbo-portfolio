import { BlockObjectResponse } from "@notionhq/client";
import {
  getChildPages,
  getPageContent,
  replaceImageBlock,
} from "./notion/queries";
import { uploadImageToImageKit } from "./imagekit/queries";
import { parseCaptionFromImageBlock } from "./notion/helpers";
import { readFileSync } from "node:fs";
import { notion } from "./notion/client";

async function run() {
  const pages = await getChildPages();
  const filteredPages = (pages.results as BlockObjectResponse[]).filter(
    (e) => e.type === "child_page"
  );
  //for of loop to iterate through each page without going over limits
  for (const page of filteredPages) {
    const pageData = await getPageContent(page.id);
    const [group] = page.child_page.title.split(":");
    const imageBlocks = (pageData.results as BlockObjectResponse[]).filter(
      (block) => block.type === "image"
    );

    for (const block of imageBlocks) {
      const { image } = block;
      const fileUrl =
        image.type === "file" ? image.file.url : image.external.url;
      if (!fileUrl.includes("imagekit.io")) {
        // If the image is not already hosted on ImageKit, fetch it from Notion
        const notionImageRes = await fetch(fileUrl);
        const imageBuffer = await notionImageRes.arrayBuffer();
        const fileExtension =
          notionImageRes.headers.get("content-type")?.split("/")[1] || "jpg";
        const { title } = parseCaptionFromImageBlock(block);

        console.log(`Processing image block ${block.id} with title: ${title}`);
        try {
          const imgUrl = await uploadImageToImageKit(
            Buffer.from(imageBuffer).toString("base64"),
            group,
            title,
            fileExtension
          );

          // append new block with external IMG url and delete the old one
          await replaceImageBlock(page, block, imgUrl);
          console.log(`Updated image block ${block.id} with URL: ${imgUrl}`);
        } catch (error) {
          console.error(`Failed to upload image block ${block.id}:`, error);
        }
      } else {
        console.log(`Skipping block ${block.id}, already imagekit.`);
      }
    }
  }
}
run();
