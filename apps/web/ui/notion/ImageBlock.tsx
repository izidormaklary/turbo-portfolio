import { parseCaptionFromImageBlock } from "@/utils/notion/helpers";
import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
interface Props {
  block: ImageBlockObjectResponse;
}
export default function ImageBlock({ block }: Props) {
  if (block.image.type !== "external") {
    throw new Error("Invalid block type, expected 'external'");
  }
  const { description } = parseCaptionFromImageBlock(block);
  return (
    <div>
      <div className=" aspect-[3/2]  relative w-full">
        <Image
          key={block.id}
          className="rounded-md"
          src={block.image.external.url + "?"} // Adding cache parameter to prevent caching issues
          alt={description || "Notion Image"}
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit: "contain", // cover, contain, none
          }}
        />
      </div>
      {description && (
        <div className="text-center text-sm text-foreground/70 mt-2">
          {description}
        </div>
      )}
    </div>
  );
}
