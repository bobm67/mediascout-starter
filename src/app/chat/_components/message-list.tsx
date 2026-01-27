"use client";

import { useState, type ReactNode } from "react";
import { Copy, Check, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { markdownComponents } from "./markdown-components";

// ---- Types ----

type TextPart = { type?: string; text?: string };

/** Flexible message shape that supports both parts-based and content-based formats */
export interface MaybePartsMessage {
  display?: ReactNode;
  parts?: TextPart[];
  content?: TextPart[];
}

/** Shape of a chat message with the fields needed for rendering */
export interface ChatMessage extends MaybePartsMessage {
  id: string;
  role: string;
  createdAt?: Date;
}

export interface MessageListProps {
  messages: ChatMessage[];
  isStreaming: boolean;
}

// ---- Utility functions ----

/** Extracts plain text from a message for clipboard copying */
export function getMessageText(message: MaybePartsMessage): string {
  const parts = Array.isArray(message.parts)
    ? message.parts
    : Array.isArray(message.content)
      ? message.content
      : [];
  return parts
    .filter((p) => p?.type === "text" && p.text)
    .map((p) => p.text)
    .join("\n");
}

/** Renders message content as markdown or returns the display node */
function renderMessageContent(message: MaybePartsMessage): ReactNode {
  if (message.display) return message.display;
  const parts = Array.isArray(message.parts)
    ? message.parts
    : Array.isArray(message.content)
      ? message.content
      : [];
  return parts.map((p, idx) =>
    p?.type === "text" && p.text ? (
      <ReactMarkdown key={idx} components={markdownComponents}>
        {p.text}
      </ReactMarkdown>
    ) : null
  );
}

function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

// ---- Sub-components ----

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="hover:bg-muted rounded p-1 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <Copy className="text-muted-foreground h-3.5 w-3.5" />
      )}
    </button>
  );
}

function ThinkingIndicator() {
  return (
    <div className="bg-muted flex max-w-[80%] items-center gap-2 rounded-lg p-3">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="text-muted-foreground text-sm">AI is thinking...</span>
    </div>
  );
}

// ---- Main component ----

/** Renders the scrollable list of chat messages with copy buttons and a thinking indicator */
export function MessageList({ messages, isStreaming }: MessageListProps) {
  return (
    <div className="mb-4 min-h-[50vh] space-y-4 overflow-y-auto">
      {messages.map((message) => {
        const messageText = getMessageText(message);
        const timestamp = message.createdAt
          ? formatTimestamp(new Date(message.createdAt))
          : null;

        return (
          <div
            key={message.id}
            className={`group rounded-lg p-3 ${
              message.role === "user"
                ? "bg-primary text-primary-foreground ml-auto max-w-[80%]"
                : "bg-muted max-w-[80%]"
            }`}
          >
            <div className="mb-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {message.role === "user" ? "You" : "AI"}
                </span>
                {timestamp && <span className="text-xs opacity-60">{timestamp}</span>}
              </div>
              {message.role === "assistant" && messageText && (
                <div className="opacity-0 transition-opacity group-hover:opacity-100">
                  <CopyButton text={messageText} />
                </div>
              )}
            </div>
            <div>{renderMessageContent(message)}</div>
          </div>
        );
      })}
      {isStreaming && messages[messages.length - 1]?.role === "user" && <ThinkingIndicator />}
    </div>
  );
}
