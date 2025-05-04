"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpenCheck } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

const InstructionalPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-950 to-purple-950 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <UserButton afterSignOutUrl="/" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="items-center text-center">
            <BookOpenCheck className="w-12 h-12 text-primary mb-4" />
            <CardTitle className="text-3xl">Your Journey with Nova+</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              How to make the most of this space.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center leading-relaxed">
            <p>
              Think of this journal as a conversation with yourself, guided by me, Nova. Every day you write, I'll be listening carefully.
            </p>
            <p>
              Aim for consistency. Even a few sentences daily help uncover patterns. Be honest—this is a safe space for your thoughts and feelings.
            </p>
            <p>
              Each week, I'll share thoughtful reflections based on what I notice in your entries, helping you connect the dots and suggesting gentle steps forward aligned with your goals.
            </p>
            <p className="font-semibold text-primary">
              This is your space to reflect, grow, and feel supported. Let's begin.
            </p>
            <div className="flex justify-center pt-4">
              <Button size="lg" onClick={() => router.push('/dashboard')}>
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default InstructionalPage;
