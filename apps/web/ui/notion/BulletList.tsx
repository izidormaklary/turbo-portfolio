import RichText from "./RichText";
import { BulletedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface Props {
  block: BulletedListItemBlockObjectResponse;
}
export default function BulletList({ block }: Props) {
  console.log("BulletList", block);
  return (
    <ul key={block.id} className="list-disc  pl-8 py-2 text-lg">
      <li>
        {block.bulleted_list_item.rich_text.map((text, index: number) => (
          <RichText key={index} richText={text} />
        ))}
      </li>
    </ul>
  );
}
