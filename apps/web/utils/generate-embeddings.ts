// /utils/generateEmbeddings.ts
import { notion } from "@/utils/notion/client";
import { openai } from "@ai-sdk/openai";
import { embedMany, generateText } from "ai";

import { BlockObjectResponse } from "@notionhq/client";
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
    .map((page) => ({ id: page.id, title: page.child_page.title }));
  const chunks = await Promise.all(
    //  Map over the notionPageIds to get the content of each page
    //  and extract paragraphs from each page
    notionPageIds.map(
      async ({ id: pageId, title }): Promise<[string, string[]]> => {
        const pageContent = await notion.blocks.children.list({
          block_id: pageId,
        });
        const content = pageContent.results as BlockObjectResponse[];

        const paragraphs = content
          .filter((block) => block.type === "paragraph")
          .filter(
            (b) => b.type === "paragraph" && b.paragraph.rich_text.length > 0
          )
          .map(
            (block) =>
              block.paragraph.rich_text
                .map((text) => text.plain_text)
                .filter(Boolean)
                .join("")
            // .replace(/\n/g, " ")
            // .split(". ")
            // .filter(Boolean)
          );
        return [title, paragraphs];
      }
    )
  );

  const generateSentences = await generateText({
    model: openai.chat("gpt-4o"),
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant that generates concise and informative sentences from text, which will then serve as a brain of a chatbot. The chatbot will use embeddings of these sentences to match the embedded user prompt. A user prompt will be matched to the top 3 most similar sentences, and they will be passed along the prompt as context when generating a response via gpt-4o-mini.
          You will be given a text, that entails multiple pages (every page starts with a header that includes the grouping and title of the page separated by a colon eg.: group:title).
          Your task is to generate concise sentences summarizing all the text available on the pages.
          Include sentences providing an overview over all the page's content (eg.: when user asks: "What technologies is he familiar with?" there should be a sentence which includes all the technologies he is familiar with mentioned in every page)..
         The output format should be just one sentence per line, but generate as many lines as needed. There should be rather more sentences than less, so that the chatbot can provide a good answer to the user. Make sure you cover everything from multiple point of views.
          `,
      },
      {
        role: "user",
        content: `Her are the pages, generate at least 60 sentences and make sure at least 3 lists his techinical skills mentioned on every page :\n\n${chunks
          .map(([title, paragraphs]) => `${title}:\n${paragraphs.join("\n")}`)
          .join("\n\n")}`,
      },
    ],
    temperature: 0.4,
  });

  const sentencesArr = generateSentences.text.split("\n");
  const { embeddings, values } = await embedMany({
    model: openai.embedding("text-embedding-3-small"),
    values: sentencesArr,
  });
  console.log(`Generated ${sentencesArr.length} embeddings.`);

  const embeddingsJson = values.map((chunk, i) => ({
    chunk,
    embedding: embeddings[i],
  }));

  const filePath = resolve(dataPath, "chunks.json");
  const existingFile = fs.readFileSync(filePath, "utf-8");
  if (existingFile) {
    const deprecatedPath = resolve(
      dataPath,
      `chunks-deprecated-${new Date().toISOString()}.json`
    );
    fs.renameSync(filePath, deprecatedPath);
  }
  fs.writeFileSync(filePath, JSON.stringify(embeddingsJson));
}

run();
