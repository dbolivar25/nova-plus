"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { UserButton } from "@clerk/nextjs";
import { format } from "date-fns";

interface EntryData {
  freeJournal: string;
  positiveEmotions: string;
  negativeEmotions: string;
  positiveActions: string;
  negativeActions: string;
  improveTomorrow: string;
}

const JournalEntry = () => {
  const params = useParams();
  const date = params.date as string;
  const router = useRouter();

  const [entryData, setEntryData] = useState<EntryData>({
    freeJournal: "",
    positiveEmotions: "",
    negativeEmotions: "",
    positiveActions: "",
    negativeActions: "",
    improveTomorrow: "",
  });

  // Format the date for display
  const displayDate = format(new Date(date + "T00:00:00"), "MMMM d, yyyy");

  // Load existing entry from localStorage if available
  useEffect(() => {
    try {
      const allEntries = JSON.parse(
        localStorage.getItem("novaJournalEntries") || "{}",
      );
      if (allEntries[date]) {
        setEntryData(allEntries[date]);
      } else {
        // Reset state if navigating to a new date without existing entry
        setEntryData({
          freeJournal: "",
          positiveEmotions: "",
          negativeEmotions: "",
          positiveActions: "",
          negativeActions: "",
          improveTomorrow: "",
        });
      }
    } catch (error) {
      console.error("Error loading journal data:", error);
    }
  }, [date]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setEntryData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSave = () => {
    // Basic validation
    if (
      !entryData.freeJournal &&
      !entryData.positiveEmotions &&
      !entryData.negativeEmotions
    ) {
      toast("Empty Entry", {
        description: "Please write something before saving.",
      });
      return;
    }

    try {
      // Save entry to localStorage
      const allEntries = JSON.parse(
        localStorage.getItem("novaJournalEntries") || "{}",
      );
      allEntries[date] = entryData;
      localStorage.setItem("novaJournalEntries", JSON.stringify(allEntries));

      toast("Entry saved", {
        description: `Your journal entry for ${displayDate} has been saved.`,
      });
    } catch (error) {
      console.error("Error saving journal entry:", error);
      toast("Save Failed", {
        description:
          "There was an error saving your journal entry. Please try again.",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-r from-indigo-950 to-purple-950 p-4 md:p-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Calendar
          </Button>
          <UserButton />
        </div>

        <h1 className="text-3xl font-bold mb-2">Journal Entry</h1>
        <p className="text-lg text-muted-foreground mb-6">{displayDate}</p>

        <div className="space-y-6">
          {/* Free Journal Box */}
          <div className="space-y-2">
            <Label htmlFor="freeJournal" className="text-lg">
              How was your day?
            </Label>
            <Textarea
              id="freeJournal"
              value={entryData.freeJournal}
              onChange={handleChange}
              placeholder="Write freely about your thoughts, feelings, and experiences..."
              rows={8}
              className="bg-background/70"
            />
          </div>

          {/* Prompted Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="positiveEmotions">Positive emotions felt</Label>
              <Input
                id="positiveEmotions"
                value={entryData.positiveEmotions}
                onChange={handleChange}
                placeholder="e.g., Joy, gratitude, calm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="negativeEmotions">Negative emotions felt</Label>
              <Input
                id="negativeEmotions"
                value={entryData.negativeEmotions}
                onChange={handleChange}
                placeholder="e.g., Stress, frustration, sadness"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="positiveActions">Positive actions taken</Label>
              <Input
                id="positiveActions"
                value={entryData.positiveActions}
                onChange={handleChange}
                placeholder="e.g., Meditated, helped someone"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="negativeActions">
                Actions you regret or wish you hadn't done
              </Label>
              <Input
                id="negativeActions"
                value={entryData.negativeActions}
                onChange={handleChange}
                placeholder="e.g., Procrastinated, reacted angrily"
              />
            </div>
          </div>

          {/* Improvement Box */}
          <div className="space-y-2">
            <Label htmlFor="improveTomorrow" className="text-lg">
              Things to improve tomorrow
            </Label>
            <Textarea
              id="improveTomorrow"
              value={entryData.improveTomorrow}
              onChange={handleChange}
              placeholder="What small step can you take tomorrow?"
              rows={3}
              className="bg-background/70"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button size="lg" onClick={handleSave}>
              Save Entry
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JournalEntry;
