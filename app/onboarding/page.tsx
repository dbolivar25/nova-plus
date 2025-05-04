"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { UserButton } from "@clerk/nextjs";

interface SurveyData {
  visionMonth: string;
  vision1Year: string;
  vision5Years: string;
  vision10Years: string;
  vision20Years: string;
  visionLifelong: string;
  routineWeekday: string;
  routineWeekend: string;
  doingWell: string;
  strugglingWith: string;
  changeOneThing: string;
  anythingElse: string;
}

const OnboardingSurvey = () => {
  const router = useRouter();
  const [surveyData, setSurveyData] = useState<SurveyData>({
    visionMonth: "",
    vision1Year: "",
    vision5Years: "",
    vision10Years: "",
    vision20Years: "",
    visionLifelong: "",
    routineWeekday: "",
    routineWeekend: "",
    doingWell: "",
    strugglingWith: "",
    changeOneThing: "",
    anythingElse: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setSurveyData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !surveyData.visionLifelong ||
      !surveyData.routineWeekday ||
      !surveyData.doingWell ||
      !surveyData.strugglingWith
    ) {
      toast("Incomplete Survey", {
        description:
          "Please fill in at least the core vision, routine, and reflection fields.",
      });
      return;
    }

    try {
      // Save survey data
      localStorage.setItem("novaSurveyData", JSON.stringify(surveyData));
      localStorage.setItem("novaSurveyCompleted", "true");

      toast("Survey Submitted", {
        description: "Thank you for sharing! Let's get started.",
      });

      // Navigate to the instructions page
      router.push("/instructions");
    } catch (error) {
      console.error("Error saving survey data:", error);
      toast("Submission Error", {
        description:
          "There was an error saving your responses. Please try again.",
      });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-950 to-purple-950 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="flex justify-end w-full max-w-3xl mb-4">
        <UserButton afterSignOutUrl="/" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl font-bold mb-8 text-center"
      >
        Tell Nova About Yourself
      </motion.h1>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-6">
        {/* Section 1: Your Vision */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card>
            <CardHeader>
              <CardTitle>Section 1: Your Vision</CardTitle>
              <CardDescription>
                What are your aspirations across different timelines?
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="visionMonth">Next Month</Label>
                <Input
                  id="visionMonth"
                  value={surveyData.visionMonth}
                  onChange={handleChange}
                  placeholder="e.g., Read one book"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision1Year">1 Year</Label>
                <Input
                  id="vision1Year"
                  value={surveyData.vision1Year}
                  onChange={handleChange}
                  placeholder="e.g., Get a promotion"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision5Years">5 Years</Label>
                <Input
                  id="vision5Years"
                  value={surveyData.vision5Years}
                  onChange={handleChange}
                  placeholder="e.g., Buy a house"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision10Years">10 Years</Label>
                <Input
                  id="vision10Years"
                  value={surveyData.vision10Years}
                  onChange={handleChange}
                  placeholder="e.g., Start a family"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision20Years">20 Years</Label>
                <Input
                  id="vision20Years"
                  value={surveyData.vision20Years}
                  onChange={handleChange}
                  placeholder="e.g., Travel the world"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="visionLifelong">Lifelong Vision*</Label>
                <Textarea
                  id="visionLifelong"
                  value={surveyData.visionLifelong}
                  onChange={handleChange}
                  placeholder="What is the ultimate version of yourself you aspire to be?"
                  required
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Section 2: Your Routine */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card>
            <CardHeader>
              <CardTitle>Section 2: Your Routine</CardTitle>
              <CardDescription>Describe your typical days.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="routineWeekday">Weekday Routine*</Label>
                <Textarea
                  id="routineWeekday"
                  value={surveyData.routineWeekday}
                  onChange={handleChange}
                  placeholder="Walk me through a typical Monday to Friday."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="routineWeekend">Weekend Routine</Label>
                <Textarea
                  id="routineWeekend"
                  value={surveyData.routineWeekend}
                  onChange={handleChange}
                  placeholder="What do your Saturdays and Sundays usually look like?"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Section 3: Where You Are Now */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card>
            <CardHeader>
              <CardTitle>Section 3: Where You Are Now</CardTitle>
              <CardDescription>Reflect on your current state.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doingWell">What are you doing well?*</Label>
                <Textarea
                  id="doingWell"
                  value={surveyData.doingWell}
                  onChange={handleChange}
                  placeholder="Acknowledge your strengths and successes."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="strugglingWith">
                  What are you struggling with?*
                </Label>
                <Textarea
                  id="strugglingWith"
                  value={surveyData.strugglingWith}
                  onChange={handleChange}
                  placeholder="Be honest about your challenges."
                  required
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Section 4: Final Touch */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card>
            <CardHeader>
              <CardTitle>Section 4: Final Touch</CardTitle>
              <CardDescription>Anything else to share?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="changeOneThing">
                  If you could change one thing about how your days feel, what
                  would it be?
                </Label>
                <Textarea
                  id="changeOneThing"
                  value={surveyData.changeOneThing}
                  onChange={handleChange}
                  placeholder="e.g., Feel less rushed in the mornings."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="anythingElse">
                  Anything else you want Nova to know?
                </Label>
                <Textarea
                  id="anythingElse"
                  value={surveyData.anythingElse}
                  onChange={handleChange}
                  placeholder="Context, hopes, fears... share freely."
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" size="lg">
                Submit Survey
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </form>
    </div>
  );
};

export default OnboardingSurvey;
