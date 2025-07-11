import { NextRequest } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText, cosineSimilarity, embed } from "ai";

import chunks from "../../../data/chunks.json";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const { embedding: userQueryEmbedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: messages[messages.length - 1].content,
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

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: messages,
    maxTokens: 1000,
    system: `You are a helpful assistant, who should answer questions about Izidor a full-stack developer, this is his portfolio, in case of confusion about the purpose elaborate.
    Use the following context in order of relevance to answer questions about him, feel free to rephrase: \n${ranked.map((c) => c.chunk).join("\n\n")}
    Make sure your messages are not repetitive. If no relevant information is in the context, respond  "Sorry, I don't know."`,
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
