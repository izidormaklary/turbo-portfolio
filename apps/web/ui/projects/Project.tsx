import React from "react";
import {
  BlockObjectResponse,
  ListBlockChildrenResponse,
} from "@notionhq/client";
import RenderPage from "@/ui/notion/RenderPage";
import ProjectHeader from "./ProjectHeader";

interface Props {
  pageId: string;
  title: string;
  group: string;
  pageData: ListBlockChildrenResponse;
}

export default function Project({ pageId, title, pageData }: Props) {
  return (
    <div id={pageId} className={``}>
      <ProjectHeader title={title} />
      <RenderPage notionData={pageData.results as BlockObjectResponse[]} />
    </div>
  );
}

// ;{ "object": "list", "results": [ { "object": "block", "id": "2188dc1a-c22d-805f-ae4d-c11d326074d6", "parent": { "type": "page_id", "page_id": "2188dc1a-c22d-8063-b752-cfe6ec234a31" }, "created_time": "2025-06-20T12:52:00.000Z", "last_edited_time": "2025-06-20T13:03:00.000Z", "created_by": { "object": "user", "id": "25402768-0b3c-47a2-9606-65dc5ae09880" }, "last_edited_by": { "object": "user", "id": "25402768-0b3c-47a2-9606-65dc5ae09880" }, "has_children": false, "archived": false, "in_trash": false, "type": "paragraph", "paragraph": { "rich_text": [ { "type": "text", "text": { "content": "My journey with web-development started in Antwerp with a 7 month bootcamp provided by becode Antwerp. Their goal was to help motivated job seekers landing their first job as developers.\nTheir methodology was based on teamwork with on-demand guidance, which was a perfect fit for me. We were mainly figuring things out on our own but also learned when to ask questions and how to formulate them.", "link": null }, "annotations": { "bold": false, "italic": false, "strikethrough": false, "underline": false, "code": false, "color": "default" }, "plain_text": "My journey with web-development started in Antwerp with a 7 month bootcamp provided by becode Antwerp. Their goal was to help motivated job seekers landing their first job as developers.\nTheir methodology was based on teamwork with on-demand guidance, which was a perfect fit for me. We were mainly figuring things out on our own but also learned when to ask questions and how to formulate them.", "href": null } ], "color": "default" } }, { "object": "block", "id": "2188dc1a-c22d-8066-9df8-df9d5eb86f4f", "parent": { "type": "page_id", "page_id": "2188dc1a-c22d-8063-b752-cfe6ec234a31" }, "created_time": "2025-06-20T13:03:00.000Z", "last_edited_time": "2025-06-20T13:04:00.000Z", "created_by": { "object": "user", "id": "25402768-0b3c-47a2-9606-65dc5ae09880" }, "last_edited_by": { "object": "user", "id": "25402768-0b3c-47a2-9606-65dc5ae09880" }, "has_children": false, "archived": false, "in_trash": false, "type": "paragraph", "paragraph": { "rich_text": [ { "type": "text", "text": { "content": "In short it wasn’t only about learning specific things but mainly learning how to grow as developers", "link": null }, "annotations": { "bold": false, "italic": false, "strikethrough": false, "underline": false, "code": false, "color": "default" }, "plain_text": "In short it wasn’t only about learning specific things but mainly learning how to grow as developers", "href": null } ], "color": "default" } }, { "object": "block", "id": "2188dc1a-c22d-8031-b3bd-cd13e9dbdf80", "parent": { "type": "page_id", "page_id": "2188dc1a-c22d-8063-b752-cfe6ec234a31" }, "created_time": "2025-06-20T13:03:00.000Z", "last_edited_time": "2025-06-20T13:03:00.000Z", "created_by": { "object": "user", "id": "25402768-0b3c-47a2-9606-65dc5ae09880" }, "last_edited_by": { "object": "user", "id": "25402768-0b3c-47a2-9606-65dc5ae09880" }, "has_children": false, "archived": false, "in_trash": false, "type": "paragraph", "paragraph": { "rich_text": [], "color": "default" } }, { "object": "block", "id": "2188dc1a-c22d-8045-aff0-e252d6d66b1c", "parent": { "type": "page_id", "page_id": "2188dc1a-c22d-8063-b752-cfe6ec234a31" }, "created_time": "2025-06-20T12:54:00.000Z", "last_edited_time": "2025-06-20T12:54:00.000Z", "created_by": { "object": "user", "id": "25402768-0b3c-47a2-9606-65dc5ae09880" }, "last_edited_by": { "object": "user", "id": "25402768-0b3c-47a2-9606-65dc5ae09880" }, "has_children": false, "archived": false, "in_trash": false, "type": "paragraph", "paragraph": { "rich_text": [], "color": "default" } } ], "next_cursor": null, "has_more": false, "type": "block", "block": {}, "request_id": "11137f2a-d69c-496c-bb82-4a0ab6ede734" }
// component that renders the project entry based on the above data structure
