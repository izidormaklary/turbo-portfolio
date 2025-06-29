import {
  BlockObjectResponse,
  ParagraphBlockObjectResponse,
} from "@notionhq/client";
import Paragraph from "./Paragraph";
import ImageBlock from "./ImageBlock";
import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
interface Props {
  notionData: BlockObjectResponse[];
}
export default function RenderPage({ notionData }: Props): React.JSX.Element {
  return (
    <div className="flex flex-col justify-center gap-4 ">
      {notionData.map((block) => {
        switch (block.type) {
          case "paragraph":
            return (
              <Paragraph
                key={block.id}
                block={block as ParagraphBlockObjectResponse}
              />
            );
          case "image":
            return (
              <ImageBlock
                key={block.id}
                block={block as ImageBlockObjectResponse}
              />
            );
          // Add more cases for other block types as needed
          default:
            return null;
        }
      })}
    </div>
  );
}
