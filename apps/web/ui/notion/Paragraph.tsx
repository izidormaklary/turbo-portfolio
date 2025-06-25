import { ParagraphBlockObjectResponse } from "@notionhq/client";
import RichText from "./RichText";

interface Props {
  block: ParagraphBlockObjectResponse;
}
export default function Paragraph({ block }: Props) {
  return (
    <p key={block.id} className="py-2 text-lg text-foreground/90">
      {block.paragraph.rich_text.map((text, index: number) => (
        <RichText key={index} richText={text} />
      ))}
    </p>
  );
}
