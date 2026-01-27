"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { ChatInput } from "./_components/chat-input";
import { ChatWelcome } from "./_components/chat-welcome";
import { MessageList, type ChatMessage } from "./_components/message-list";

const STORAGE_KEY = "chat-messages";

export default function ChatPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const { messages, sendMessage, status, error, setMessages } = useChat({
    onError: (err) => {
      toast.error(err.message || "Failed to send message");
    },
  });
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  // Load messages from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed: unknown = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          }
        } catch {
          // Invalid JSON, ignore
        }
      }
    }
  }, [setMessages]);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined" && messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
    toast.success("Chat cleared");
  };

  const handleSend = (text: string) => {
    sendMessage({ role: "user", parts: [{ type: "text", text }] });
  };

  if (isPending) {
    return <div className="container mx-auto px-4 py-12">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">Redirecting to sign in...</div>
    );
  }

  const isStreaming = status === "streaming";
  const chatMessages = messages as ChatMessage[];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold">AI Chat</h1>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">Welcome, {session.user.name}!</span>
            {messages.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearMessages}>
                Clear chat
              </Button>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-destructive/10 border-destructive/20 mb-4 rounded-lg border p-4">
            <p className="text-destructive text-sm">
              Error: {error.message || "Something went wrong"}
            </p>
          </div>
        )}

        {chatMessages.length === 0 ? (
          <div className="mb-4 min-h-[50vh]">
            <ChatWelcome />
          </div>
        ) : (
          <MessageList messages={chatMessages} isStreaming={isStreaming} />
        )}

        <ChatInput onSend={handleSend} isStreaming={isStreaming} />
      </div>
    </div>
  );
}
