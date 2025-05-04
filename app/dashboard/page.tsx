"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserButton } from '@clerk/nextjs';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MoonStar, SendHorizontal, User } from 'lucide-react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MainScreen = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'nova', text: "Hello! I'm Nova. How can I help you reflect today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      const dateString = date.toISOString().split('T')[0];
      router.push(`/entry/${dateString}`);
    } else {
      setSelectedDate(undefined);
    }
  };

  const generateNovaResponse = (userInput: string) => {
    // Generic responses for the AI
    const genericResponses = [
      "That's insightful. Can you elaborate a bit more?",
      "How did that make you feel?",
      "Thank you for sharing that. What else comes to mind?",
      "I hear you. What kind of support feels right at this moment?",
      "Let's delve into that. What thoughts or sensations are present?",
      "Interesting perspective. What led you to that thought?",
      "Acknowledging that is important. What's the core feeling here?"
    ];
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newUserMessage = { sender: 'user', text: inputValue };
    setMessages(prev => [...prev, newUserMessage]);
    const currentInput = inputValue;
    setInputValue('');

    // Simulate Nova's response generation
    setTimeout(() => {
      const novaResponseText = generateNovaResponse(currentInput);
      const novaMessage = { sender: 'nova', text: novaResponseText };
      setMessages(prev => [...prev, novaMessage]);
    }, 1200);
  };

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableViewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollableViewport) {
        scrollableViewport.scrollTop = scrollableViewport.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-950 to-purple-950 flex flex-col p-4 md:p-8 relative">
      {/* Header Area */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-2xl font-bold">Your Journal</h1>

        <div className="flex items-center gap-4">
          {/* Nova Chatbot Trigger */}
          <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80 transition-colors">
                <MoonStar className="h-6 w-6" />
                <span className="sr-only">Open Nova Chat</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[550px] h-[70vh] flex flex-col">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <MoonStar className="mr-2 h-5 w-5 text-primary" /> Nova Chat
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="flex-grow p-4 -mx-6 border-y" ref={scrollAreaRef}>
                <div className="space-y-4 pr-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex items-start gap-3",
                        msg.sender === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      {msg.sender === 'nova' && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">N</AvatarFallback>
                        </Avatar>
                      )}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "max-w-[75%] rounded-lg p-3 text-sm",
                          msg.sender === 'user'
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        {msg.text}
                      </motion.div>
                      {msg.sender === 'user' && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="pt-4 border-t">
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex w-full items-center space-x-2">
                  <Input
                    id="message"
                    placeholder="Type your reflection..."
                    className="flex-1"
                    autoComplete="off"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                    <SendHorizontal className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </div>
            </DialogContent>
          </Dialog>

          {/* User Button */}
          <UserButton afterSignOutUrl="/" />
        </div>
      </motion.header>

      {/* Main Content Area - Calendar */}
      <motion.main
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="flex-grow flex flex-col items-center justify-center"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="rounded-md border w-full max-w-md bg-card/80 backdrop-blur-sm shadow-lg"
        />
        
        {/* Link to Weekly Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6"
        >
          <Button variant="outline" onClick={() => router.push('/feedback')}>
            View Weekly Feedback
          </Button>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default MainScreen;
