"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type CheckIn = {
  date: string;
  mood: number;
  anxiety: number;
  energy: number;
  sleep: number;
  risk: "low" | "medium" | "high";
  wellnessScore: number;
};

export default function CheckIn() {
  const router = useRouter();

  const [mood, setMood] = useState(5);
  const [anxiety, setAnxiety] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [sleep, setSleep] = useState("7");

  const [result, setResult] = useState("");
  const [sleepMessage, setSleepMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const today = new Date().toLocaleDateString();

    const savedHistory: CheckIn[] = JSON.parse(
      localStorage.getItem("checkInHistory") || "[]"
    );

    const todaysCheckIn = savedHistory.find(
      (item) => item.date === today
    );

    if (todaysCheckIn) {
      setMood(todaysCheckIn.mood);
      setAnxiety(todaysCheckIn.anxiety);
      setEnergy(todaysCheckIn.energy);
      setSleep(String(todaysCheckIn.sleep));
      setIsEditing(true);

      setResult(
        "You have already completed today's check-in. You can edit your values below if they have changed."
      );
    }
  }, []);

  function getSleepPattern(history: CheckIn[], currentSleep: number) {
    const recentSleep = [
      ...history.slice(-6).map((item) => item.sleep),
      currentSleep,
    ];

    if (recentSleep.length < 3) {
      return "not-enough-data";
    }

    const outsideTarget = recentSleep.filter(
      (hours) => hours < 7 || hours > 10
    );

    if (outsideTarget.length >= 3) {
      return "needs-attention";
    }

    return "normal";
  }

  function getSleepScore(hours: number) {
    if (hours >= 7 && hours <= 10) {
      return 10;
    }

    if (hours >= 6 && hours < 7) {
      return 8;
    }

    if (hours > 10 && hours <= 11) {
      return 8;
    }

    if (hours >= 5 && hours < 6) {
      return 6;
    }

    if (hours > 11 && hours <= 12) {
      return 6;
    }

    return 4;
  }

  function analyzeWellness() {
    const sleepHours = Number(sleep);

    if (
      sleep.trim() === "" ||
      Number.isNaN(sleepHours) ||
      sleepHours < 0 ||
      sleepHours > 24
    ) {
      setResult("Please enter a valid number of sleep hours.");
      return;
    }

    const today = new Date().toLocaleDateString();

    const existingHistory: CheckIn[] = JSON.parse(
      localStorage.getItem("checkInHistory") || "[]"
    );

    const sleepPattern = getSleepPattern(
      existingHistory.filter((item) => item.date !== today),
      sleepHours
    );

    const sleepScore = getSleepScore(sleepHours);

    // Anxiety is inverted because lower anxiety contributes
    // positively to the overall wellness score.
    const anxietyScore = 10 - anxiety;

    const wellnessScore =
      (mood + anxietyScore + energy + sleepScore) / 4;

    let riskLevel: "low" | "medium" | "high" = "low";

    if (
      mood <= 3 ||
      anxiety >= 8 ||
      energy <= 3 ||
      wellnessScore <= 4
    ) {
      riskLevel = "high";
    } else if (
      mood <= 6 ||
      anxiety >= 5 ||
      energy <= 5 ||
      wellnessScore <= 6
    ) {
      riskLevel = "medium";
    }

    let message =
      " 🟢 Your recent wellness indicators appear relatively balanced. Continue checking in and maintaining healthy routines.";

    if (riskLevel === "medium") {
      message =
        " 🟡 Some areas of your wellbeing may need attention. Consider practicing healthy coping strategies and talking with someone you trust.";
    }

    if (riskLevel === "high") {
      message =
        " 🔴 Your check-in shows several areas that may benefit from additional support. Consider reaching out to someone you trust or an appropriate healthcare professional.";
    }

  

    const newCheckIn: CheckIn = {
      date: today,
      mood,
      anxiety,
      energy,
      sleep: sleepHours,
      risk: riskLevel,
      wellnessScore: Number(wellnessScore.toFixed(1)),
    };

    // Remove today's previous check-in if one exists.
    // This makes editing replace today's entry rather than
    // creating multiple entries for the same day.
    const updatedHistory = [
      ...existingHistory.filter((item) => item.date !== today),
      newCheckIn,
    ];

    localStorage.setItem(
      "checkInHistory",
      JSON.stringify(updatedHistory)
    );

    localStorage.setItem("riskLevel", riskLevel);

    setIsEditing(true);
    setResult(message);
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-12">
      <h1 className="text-4xl font-bold text-blue-700">
        Daily Check-In
      </h1>

      <p className="mt-3 text-gray-600 text-center max-w-xl">
        Answer a few questions to help PulseBridge understand
        your wellbeing today.
      </p>

      <div className="mt-8 bg-white rounded-xl shadow p-8 max-w-lg w-full">

        {isEditing && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              <strong>Today's check-in is already saved.</strong>
              <br />
              You can change your answers below. Saving again will
              update today's check-in instead of creating another one.
            </p>
          </div>
        )}

        {/* Mood */}

        <label className="font-semibold">
          How is your mood today? ({mood}/10)
        </label>

        <input
          type="range"
          min="1"
          max="10"
          value={mood}
          onChange={(e) => setMood(Number(e.target.value))}
          className="w-full"
        />

        {/* Anxiety */}

        <label className="font-semibold mt-6 block">
          Anxiety level ({anxiety}/10)
        </label>

        <input
          type="range"
          min="1"
          max="10"
          value={anxiety}
          onChange={(e) => setAnxiety(Number(e.target.value))}
          className="w-full"
        />

        {/* Energy */}

        <label className="font-semibold mt-6 block">
          Energy level ({energy}/10)
        </label>

        <input
          type="range"
          min="1"
          max="10"
          value={energy}
          onChange={(e) => setEnergy(Number(e.target.value))}
          className="w-full"
        />

        {/* Sleep */}

        <label className="font-semibold mt-6 block">
          How many hours did you sleep?
        </label>

        <input
          type="number"
          min="0"
          max="24"
          step="0.5"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
          placeholder="Example: 8"
          className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />



        {/* Analyze */}

        <button
          onClick={analyzeWellness}
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
        >
          {isEditing
            ? "Update Today's Check-In"
            : "Analyze My Wellness"}
        </button>

        {/* Result */}

        {result && (
          <>
            <div className="mt-6 p-4 bg-blue-50 rounded-xl text-gray-700">
              {result}
            </div>

            {sleepMessage && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl text-gray-700">
                <strong>Sleep Pattern</strong>
                <p className="mt-1">{sleepMessage}</p>
              </div>
            )}

            <button
              onClick={() => router.push("/dashboard")}
              className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
            >
              View Wellness Dashboard
            </button>
          </>
        )}
      </div>
    </main>
  );
}