import { NextRequest } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText, cosineSimilarity, embed } from "ai";

import chunks from "../../../data/chunks.json";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const {
    messages: prompts,
  }: { messages: { role: string; content: string }[] } = await req.json();

  const { embedding: userQueryEmbedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: prompts[prompts.length - 1].content,
  });
  const ranked = (
    chunks as { chunk: string; id: string; embedding: number[] }[]
  )
    .map((chunk) => ({
      ...chunk,
      similarity: cosineSimilarity(userQueryEmbedding, chunk.embedding),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5)
    .filter((r) => r.similarity > 0.13); // Filter out low similarity chunks

  const messages: { role: "system" | "user"; content: string }[] = [
    {
      role: "system",
      content: `You are a helpful assistant, who should answer questions about Izidor a full-stack developer, this is his portfolio, in case of confusion about the purpose elaborate.
    Use the following context in order of relevance to answer questions about him, feel free to rephrase: \n${ranked.map((c) => c.chunk).join("\n\n")}
    Make sure your messages are not repetitive. If no relevant information is in the context, respond  "Sorry, I don't know."`,
    },
    ...prompts.map((prompt) => ({
      role: "user" as const,
      content: prompt.content,
    })),
  ];

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: messages,
    // tools: {
    //   contact: {
    //     description: "Give Izidors contact details",
    //     parameters: null,
    //     execute: async () => {
    //       return {
    //         email: `maklaryizidor@gmail.com`,
    //         linkedIn: `https://www.linkedin.com/in/izidor-maklary/`,
    //         github: `https://github.com/izidormaklary`,
    //       };
    //     },
    //   },
    // },
  });

  return result.toDataStreamResponse();
}
