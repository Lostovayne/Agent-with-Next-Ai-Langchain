"use client";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface ChatInterfaceProps {
  chatId: Id<"chats">;
  initialMessages: Doc<"messages">[];
}

export const ChatInterface = ({ chatId, initialMessages }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Doc<"messages">[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [streamedResponse, setStreamedResponse] = useState<string>("");
  const [currentTool, setCurrentTool] = useState<{ name: string; input: unknown } | null>(null);

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    // Reset UI State for new message
    setInput("");
    setStreamedResponse("");
    setCurrentTool(null);
    setIsLoading(true);
  };

  return (
    <div>
      <main className="flex flex-col h-[calc(100vh-theme(spacing.14))]">
        {/* Messages */}
        <section className="bg-red-50 flex-1"></section>

        {/* footer */}
        <footer className="border-t bg-white p-4">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Ai Agent..."
                className="flex-1 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-sm pl-2 pr-12 bg-gray-50 placeholder:text-gray-500"
              />
              <Button
                className={cn(
                  "absolute right-1.5 rounded-xl size-9 p-0 flex items-center justify-center transition-all",
                  input.trim() ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm" : "bg-gray-100 text-gray-400"
                )}
                type="submit"
                disabled={isLoading || !input.trim()}
              >
                <ArrowRight />
              </Button>
            </div>
          </form>
        </footer>
      </main>
    </div>
  );
};
