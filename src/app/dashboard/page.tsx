"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type CheckIn = {
  date: string;
  mood: number;
  anxiety: number;
  energy: number;
  sleep: number;
  risk: "low" | "medium" | "high" | string;
  wellnessScore?: number;
};

export default function Dashboard() {
  const [riskLevel, setRiskLevel] = useState("low");
  const [history, setHistory] = useState<CheckIn[]>([]);

  useEffect(() => {
    const savedRisk = localStorage.getItem("riskLevel");

    if (savedRisk) {
      setRiskLevel(savedRisk);
    }

    const savedHistory: CheckIn[] = JSON.parse(
      localStorage.getItem("checkInHistory") || "[]"
    );

    setHistory(savedHistory);
  }, []);

  function resetHistory() {
    localStorage.removeItem("checkInHistory");
    localStorage.removeItem("riskLevel");

    setHistory([]);
    setRiskLevel("low");
  }

  const dashboardContent = {
    low: {
      title: "🟢 Stable",
      color: "text-green-600",
      background: "bg-green-50",

      message:
        "Your recent wellness check-ins show relatively balanced patterns. Continue maintaining healthy routines and connections.",

      actions: [
        "Continue your current wellness habits",
        "Stay connected with people you trust",
        "Complete regular check-ins",
      ],
    },

    medium: {
      title: "🟡 Needs Support",
      color: "text-yellow-600",
      background: "bg-yellow-50",

      message:
        "Your recent check-ins show some areas that may benefit from additional support.",

      actions: [
        "Practice healthy coping strategies",
        "Talk with someone you trust",
        "Explore appropriate wellness resources",
      ],
    },

    high: {
      title: "🔴 Support Recommended",
      color: "text-red-600",
      background: "bg-red-50",

      message:
        "Your recent check-in patterns suggest connecting with additional support may be helpful.",

      actions: [
        "Reach out to someone you trust",
        "Consider speaking with a healthcare professional",
        "Explore available support resources",
      ],
    },
  };

  const current =
    dashboardContent[
      riskLevel as keyof typeof dashboardContent
    ] || dashboardContent.low;

  /*
   * Convert older check-ins that don't have a wellnessScore.
   * This keeps the dashboard compatible with your existing
   * localStorage data.
   */

  const trendData = history.map((item, index) => {
    const sleep = Number(item.sleep);

    const sleepScore =
      sleep >= 7 && sleep <= 10
        ? 10
        : sleep >= 6 && sleep < 7
        ? 8
        : sleep > 10 && sleep <= 11
        ? 8
        : sleep >= 5 && sleep < 6
        ? 6
        : sleep > 11 && sleep <= 12
        ? 6
        : 4;

    const anxietyScore = 10 - Number(item.anxiety);

    const calculatedScore =
      (Number(item.mood) +
        anxietyScore +
        Number(item.energy) +
        sleepScore) /
      4;

    return {
      checkIn: index + 1,
      score: Number(
        (item.wellnessScore ?? calculatedScore).toFixed(1)
      ),
      date: item.date,
    };
  });

  const latestSleep = history.length
    ? history[history.length - 1].sleep
    : null;

  const recentSleep = history.slice(-7);

  const outsideTargetSleep = recentSleep.filter(
    (item) => item.sleep < 7 || item.sleep > 10
  );

  let sleepPatternMessage =
    "Complete more check-ins to identify a sleep pattern.";

  if (recentSleep.length >= 3) {
    if (outsideTargetSleep.length >= 3) {
      sleepPatternMessage =
        "🟡 Several recent check-ins show sleep outside the 7–10 hour target range. This may be a pattern worth paying attention to.";
    } else {
      sleepPatternMessage =
        "🟢 Your recent check-ins do not show a consistent pattern of sleep outside the 7–10 hour target range.";
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12 flex justify-center">
      <div className="max-w-4xl w-full">

        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          PulseBridge Dashboard
        </h1>

        <div className="bg-white rounded-xl shadow p-8">

          {/* Wellness Status */}

          <div
            className={`${current.background} rounded-xl p-6`}
          >
            <h2
              className={`text-3xl font-bold ${current.color}`}
            >
              {current.title}
            </h2>

            <p className="mt-3 text-gray-700">
              {current.message}
            </p>
          </div>

          {/* Recommended Actions */}

          <h2 className="text-2xl font-semibold mt-8">
            Recommended Actions
          </h2>

          <ul className="mt-4 space-y-3 text-gray-700">
            {current.actions.map((action) => (
              <li key={action}>
                ✓ {action}
              </li>
            ))}
          </ul>

          {/* Wellness Trends */}

          <h2 className="text-2xl font-semibold mt-10">
            Wellness Trends
          </h2>

          <p className="mt-2 text-gray-600">
            Each dot represents one check-in. The score combines
            mood, energy, sleep, and anxiety into an overall
            wellness score.
          </p>

          <div className="mt-5 bg-gray-50 rounded-xl p-5">

            {history.length < 2 ? (

              <p className="text-gray-600">
                Complete more check-ins to view your wellness
                trends.
              </p>

            ) : (

              <>
                <ResponsiveContainer
                  width="100%"
                  height={320}
                >
                  <ScatterChart
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20,
                    }}
                  >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      type="number"
                      dataKey="checkIn"
                      domain={[1, history.length]}
                      allowDecimals={false}
                      label={{
                        value: "Check-In",
                        position: "insideBottom",
                        offset: -10,
                      }}
                    />

                    <YAxis
                      type="number"
                      dataKey="score"
                      domain={[0, 10]}
                      label={{
                        value: "Wellness Score",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />

                    <Tooltip
                      cursor={{
                        strokeDasharray: "3 3",
                      }}
                      formatter={(value) => [
                        value,
                        "Wellness Score",
                      ]}
                      labelFormatter={(value) =>
                        `Check-In ${value}`
                      }
                    />

                    <Scatter
                      name="Overall Wellness"
                      data={trendData}
                      fill="#2563eb"
                    />

                  </ScatterChart>
                </ResponsiveContainer>

                {/* X-axis explanation */}

                <div className="text-center text-sm font-semibold text-gray-700 mt-2">
                  Check-In Number
                </div>

                {/* Legend */}

                <div className="flex justify-center mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                    <span>Overall Wellness</span>
                  </div>
                </div>

              </>

            )}

          </div>

          {/* Sleep Pattern */}

          <h2 className="text-2xl font-semibold mt-10">
            Sleep Pattern
          </h2>

          <div className="mt-4 bg-gray-50 rounded-xl p-5">

            {latestSleep !== null && (
              <p className="font-semibold">
                Most recent sleep: {latestSleep} hours
              </p>
            )}

            <p className="mt-2 text-gray-700">
              {sleepPatternMessage}
            </p>

            <p className="mt-3 text-sm text-gray-500">
              PulseBridge looks for repeated patterns rather than
              treating one unusual night as a problem.
            </p>

          </div>

          {/* Check-In History */}

          <h2 className="text-2xl font-semibold mt-10">
            Check-In History
          </h2>

          {history.length === 0 ? (

            <p className="mt-4 text-gray-600">
              No previous check-ins yet.
            </p>

          ) : (

            <div className="mt-5 space-y-4">

              {history
                .slice()
                .reverse()
                .map((item, index) => {

                  const anxietyScore =
                    10 - Number(item.anxiety);

                  const sleep = Number(item.sleep);

                  const sleepScore =
                    sleep >= 7 && sleep <= 10
                      ? 10
                      : sleep >= 6 && sleep < 7
                      ? 8
                      : sleep > 10 && sleep <= 11
                      ? 8
                      : sleep >= 5 && sleep < 6
                      ? 6
                      : sleep > 11 && sleep <= 12
                      ? 6
                      : 4;

                  const score =
                    item.wellnessScore ??
                    (
                      (Number(item.mood) +
                        anxietyScore +
                        Number(item.energy) +
                        sleepScore) /
                      4
                    ).toFixed(1);

                  return (
                    <div
                      key={index}
                      className="border rounded-xl p-5 bg-gray-50"
                    >

                      <p className="font-bold">
                        {item.date}
                      </p>

                      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">

                        <div>
                          <p className="text-sm text-gray-500">
                            Mood
                          </p>

                          <p className="font-semibold">
                            {item.mood}/10
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            Anxiety
                          </p>

                          <p className="font-semibold">
                            {item.anxiety}/10
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            Energy
                          </p>

                          <p className="font-semibold">
                            {item.energy}/10
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            Sleep
                          </p>

                          <p className="font-semibold">
                            {item.sleep} hours
                          </p>
                        </div>

                      </div>

                      <p className="mt-4 font-semibold">
                        Overall Wellness Score: {score}/10
                      </p>

                      <p className="mt-2 font-semibold">
                        Status:{" "}

                        {item.risk === "low" &&
                          "🟢 Stable"}

                        {item.risk === "medium" &&
                          "🟡 Needs Support"}

                        {item.risk === "high" &&
                          "🔴 Support Recommended"}
                      </p>

                    </div>
                  );
                })}

            </div>

          )}

          {/* Reset History */}

          <button
            onClick={resetHistory}
            className="mt-8 bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600"
          >
            Clear Check-In History
          </button>

          {/* Navigation */}

          <div className="mt-6 flex flex-wrap gap-4">

            <Link
              href="/check-in"
              className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
            >
              Daily Check-In
            </Link>

            <Link
              href="/community"
              className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
            >
              Community
            </Link>

          </div>

        </div>

      </div>
    </main>
  );
}