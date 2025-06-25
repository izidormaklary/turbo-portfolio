import { RichTextItemResponse } from "@notionhq/client";

interface Props {
  richText: RichTextItemResponse;
}

export default function NotionRichTextSpan({
  richText,
}: Props): React.JSX.Element {
  return (
    <span
      className={`${
        richText.annotations.bold ? "font-bold" : ""
      } ${richText.annotations.italic ? "italic" : ""} ${
        richText.annotations.underline ? "underline" : ""
      } ${richText.annotations.code ? "bg-foreground/10  text-red-400 font-mono p-1 rounded" : ""}`}
    >
      {richText.plain_text}
    </span>
  );
}
