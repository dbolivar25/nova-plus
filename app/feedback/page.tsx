"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Zap, Sparkles, Target } from 'lucide-react';
import { motion } from "framer-motion";
import { UserButton } from '@clerk/nextjs';

// Placeholder data - In a real app, this would come from Nova's analysis using BAML
const placeholderFeedback = {
  startDate: 'April 21, 2025',
  endDate: 'April 27, 2025',
  patterns: [
    { icon: Zap, text: "Feeling anxious in the mornings appeared frequently this week." },
    { icon: Sparkles, text: "You consistently mentioned feeling grateful after your evening walks." },
    { icon: Target, text: "Procrastination on project tasks came up on 3 separate days." },
  ],
  solutions: [
    {
      struggle: "Morning Anxiety",
      what: "5-minute guided breathwork session",
      when: "Right after waking up, before checking phone",
      where: "Sitting comfortably on your bed or a chair",
      conditions: "Phone on airplane mode, perhaps soft ambient music.",
      icon: Zap
    },
    {
      struggle: "Project Procrastination",
      what: "Use the 'Pomodoro Technique' - 25 minutes focused work, 5 min break",
      when: "Schedule the first Pomodoro session for 9:00 AM",
      where: "Your designated workspace, clear of distractions",
      conditions: "Silence notifications, have a clear task goal for the session.",
      icon: Target
    },
    {
      struggle: "Maintaining Evening Calm", 
      what: "Continue your evening walks",
      when: "Around sunset, as you have been doing",
      where: "Your usual park route",
      conditions: "Leave work thoughts behind, focus on nature or music.",
      icon: Sparkles
    }
  ]
};

const WeeklyFeedback = () => {
  const router = useRouter();
  const feedback = placeholderFeedback; // Use placeholder

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-r from-indigo-950 to-purple-950 p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => router.push('/dashboard')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>

        <Card className="shadow-xl bg-card/80 backdrop-blur-sm mb-8">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-3xl">Nova's Weekly Reflection</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Insights from {feedback.startDate} - {feedback.endDate}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold text-center mb-4">Patterns Noticed:</h3>
            <ul className="space-y-3 list-none p-0 text-center max-w-xl mx-auto">
              {feedback.patterns.map((pattern, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  className="flex items-center justify-center space-x-3"
                >
                  <pattern.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{pattern.text}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold text-center mb-6">Personalized Suggestions for Next Week:</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedback.solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <solution.icon className="w-6 h-6 text-primary"/>
                    <CardTitle className="text-xl">{solution.struggle}</CardTitle>
                  </div>
                  <CardDescription>Try this:</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-2 text-sm">
                  <p><strong className="font-medium text-primary/90">What:</strong> {solution.what}</p>
                  <p><strong className="font-medium text-primary/90">When:</strong> {solution.when}</p>
                  <p><strong className="font-medium text-primary/90">Where:</strong> {solution.where}</p>
                  <p><strong className="font-medium text-primary/90">Conditions:</strong> {solution.conditions}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button size="lg" onClick={() => router.push('/dashboard')}>Return to Dashboard</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default WeeklyFeedback;
