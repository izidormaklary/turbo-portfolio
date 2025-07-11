"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: "/api/summary",
  });
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // Scroll to the bottom of the chat when new messages are added
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <div
        className={` cursor-text max-w-[720px] transition-all px-5 pt-4  shadow-lg focus-within:shadow-xl  shadow-amber-200/20  border-[0.1] border-b-gray-50 text-gray-100 text-sm font-mono subpixel-antialiased 
              bg-gray-950     rounded-lg leading-normal overflow-hidden`}
      >
        <div className="top mb-2 flex">
          <div className="h-3 w-3 bg-red-500 rounded-full"></div>
          <div className="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
          <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
        </div>
        <div ref={chatRef} className="h-32 sm:h-36 overflow-y-auto">
          <div className="text-fuchsia-300">
            <span>{"Izidor-> "}</span>{" "}
            {`feel free to ask any questions you have
            about my professional life, AI will answer ;)`}
          </div>
          {messages.map((message) => (
            <div key={message.id} className="whitespace-pre-wrap ">
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return message.role === "user" ? (
                      <div
                        className="text-amber-300"
                        key={`${message.id}-${i}`}
                      >
                        <span>{"usr-> "}</span> {part.text}
                      </div>
                    ) : (
                      <div key={`${message.id}-${i}`}>
                        <span>{"AI-> "}</span>
                        {part.text}
                      </div>
                    );
                }
              })}
            </div>
          ))}
        </div>

        <form className="flex py-2 mt-2" onSubmit={handleSubmit}>
          <span className="text-amber-300">{"usr-> "}</span>{" "}
          <input
            id="chat-input"
            autoFocus={true}
            ref={inputRef}
            className="p-0 px-4 not-focus-visible:animate-pulse grow inline-block focus:ring-red-500/10 focus:outline-0"
            value={input}
            placeholder="Ask me..."
            disabled={status !== "ready"}
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
