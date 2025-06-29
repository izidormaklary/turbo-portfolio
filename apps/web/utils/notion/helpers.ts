import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export function parseCaptionFromImageBlock(block: ImageBlockObjectResponse) {
  // Remove any leading or trailing whitespace
  const captionText = block.image.caption.find((c) => c.type === "text")!;
  const entriesRaw = captionText.plain_text.split(",");

  return Object.fromEntries(
    entriesRaw.map((entry) => {
      const [key, value] = entry.split(":").map((e) => e.trim());
      return [key.trim(), value];
    })
  ) as {
    title: string;
    description: string;
  };
}
