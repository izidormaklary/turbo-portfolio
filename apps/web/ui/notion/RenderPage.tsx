import { BlockObjectResponse } from "@notionhq/client";
import Paragraph from "./Paragraph";
import ImageBlock from "./ImageBlock";
import BulletList from "./BulletList";
interface Props {
  notionData: BlockObjectResponse[];
}
export default function RenderPage({ notionData }: Props): React.JSX.Element {
  console.log("RenderPage", notionData);
  return (
    <div className="flex flex-col justify-center gap-0 ">
      {notionData.map((block) => {
        switch (block.type) {
          case "paragraph":
            return <Paragraph key={block.id} block={block} />;
          case "image":
            return <ImageBlock key={block.id} block={block} />;
          case "bulleted_list_item":
            return <BulletList key={block.id} block={block} />;
          // Add more cases for other block types as needed
          default:
            return null;
        }
      })}
    </div>
  );
}
