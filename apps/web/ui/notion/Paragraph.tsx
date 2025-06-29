import { ParagraphBlockObjectResponse } from "@notionhq/client";
import RichText from "./RichText";

interface Props {
  block: ParagraphBlockObjectResponse;
}
export default function Paragraph({ block }: Props) {
  return (
    <p key={block.id} className=" min-h-8 text-lg ">
      {block.paragraph.rich_text.map((text, index: number) => (
        <RichText key={index} richText={text} />
      ))}
    </p>
  );
}
