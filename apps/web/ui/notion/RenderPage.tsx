import {
  BlockObjectResponse,
  ParagraphBlockObjectResponse,
} from "@notionhq/client";
import Paragraph from "./Paragraph";
interface Props {
  notionData: BlockObjectResponse[];
}
export default function RenderPage({ notionData }: Props): React.JSX.Element {
  return (
    <div className="notion-page">
      {notionData.map((block) => {
        switch (block.type) {
          case "paragraph":
            return (
              <Paragraph
                key={block.id}
                block={block as ParagraphBlockObjectResponse}
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
