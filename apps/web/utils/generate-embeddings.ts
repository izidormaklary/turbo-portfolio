// /utils/generateEmbeddings.ts
import { notion } from "@/utils/notion/client";
import { openai } from "@ai-sdk/openai";
import { embedMany } from "ai";

import {
  BlockObjectResponse,
  ParagraphBlockObjectResponse,
} from "@notionhq/client";
import fs from "node:fs";
import { resolve } from "node:path";

const dataPath = resolve(process.cwd(), "./data");

async function run() {
  // getting all pages from notion
  const parentPage = await notion.blocks.children.list({
    block_id: process.env.NEXT_PUBLIC_NOTION_PARENT_PAGE_ID!,
  });

  // Filter out pages that are not child pages
  const notionPageIds = (parentPage.results as BlockObjectResponse[])
    .filter((page) => page.type === "child_page")
    .map((page) => page.id);
  const chunks = await Promise.all(
    //  Map over the notionPageIds to get the content of each page
    //  and extract paragraphs from each page
    notionPageIds.map(async (pageId): Promise<[string, string[]]> => {
      const pageContent = await notion.blocks.children.list({
        block_id: pageId,
      });
      const content = pageContent.results as BlockObjectResponse[];

      const paragraphs = (
        content.filter(
          (block) => block.type === "paragraph"
        ) as ParagraphBlockObjectResponse[]
      )
        .filter(
          (b) => b.type === "paragraph" && b.paragraph.rich_text.length > 0
        )
        .map((block) =>
          block.paragraph.rich_text
            .map((text) => text.plain_text)
            .filter(Boolean)
            .join("")
            .replace(/\n/g, " ")
            .split(". ")
            .filter(Boolean)
        );
      return [pageId, paragraphs.flat()];
    })
  );

  const embeddeds = await Promise.all(
    // Map over the chunks to embed each paragraph
    chunks.map(async ([pageId, paragraphs]) => {
      console.log(`Generating embeddings for page: ${pageId}`);

      const { embeddings, usage } = await embedMany({
        model: openai.embedding("text-embedding-3-small"),
        values: paragraphs,
      });
      console.log(
        `Generated ${embeddings.length} embeddings for page: ${pageId}`
      );
      console.log(`Embedding usage for page ${pageId}: ${usage.tokens} tokens`);
      // Ensure embeddings are returned in the same order as paragraphs
      return paragraphs.map((chunk, i) => ({
        chunk,
        id: `${pageId}-${i}`,
        embedding: embeddings[i],
      }));
    })
  );
  const filePath = resolve(dataPath, "chunks.json");
  const flattenedEmbeddings = embeddeds.flat();
  const existingFile = fs.readFileSync(filePath, "utf-8");
  if (existingFile) {
    const deprecatedPath = resolve(
      dataPath,
      `chunks-deprecated-${new Date().toISOString()}.json`
    );
    fs.renameSync(filePath, deprecatedPath);
  }
  fs.writeFileSync(filePath, JSON.stringify(flattenedEmbeddings));
}

run();
