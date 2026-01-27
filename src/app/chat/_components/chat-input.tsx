"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ChatInputProps {
  /** Called with the trimmed user message text when the form is submitted */
  onSend: (text: string) => void;
  /** Whether the AI is currently streaming a response */
  isStreaming: boolean;
}

/** Chat message input form with a text field and send button */
export function ChatInput({ onSend, isStreaming }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    onSend(text);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="border-border focus:ring-ring flex-1 rounded-md border p-2 focus:ring-2 focus:outline-none"
        disabled={isStreaming}
      />
      <Button type="submit" disabled={!input.trim() || isStreaming}>
        {isStreaming ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending
          </>
        ) : (
          "Send"
        )}
      </Button>
    </form>
  );
}
