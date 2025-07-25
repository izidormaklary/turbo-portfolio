import { Client } from "@notionhq/client";

// Initializing a client
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  fetch: (url, options) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
      },
    });
  },
});
