import { Client } from "@notionhq/client";

// Initializing a client
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  fetch: (url, options) => {
    console.log("Notion API Request:", url);
    return fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
      },
    });
  },
});
