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
  risk: string;
};

export default function Dashboard() {
  const [riskLevel, setRiskLevel] = useState("low");
  const [history, setHistory] = useState<CheckIn[]>([]);

  useEffect(() => {
    const savedRisk = localStorage.getItem("riskLevel");

    if (savedRisk) {
      setRiskLevel(savedRisk);
    }

    const savedHistory = JSON.parse(
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
        "Your recent wellness check-ins show balanced patterns. Continue maintaining healthy routines and connections.",

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
        "Practice stress management strategies",
        "Talk with someone you trust",
        "Explore wellness resources",
      ],
    },

    high: {
      title: "🔴 Support Recommended",
      color: "text-red-600",
      background: "bg-red-50",

      message:
        "Your recent check-ins suggest connecting with additional support resources may be helpful.",

      actions: [
        "Reach out to someone you trust",
        "Explore professional support options",
        "Use available support resources",
      ],
    },
  };

  const current =
    dashboardContent[
      riskLevel as keyof typeof dashboardContent
    ] || dashboardContent.low;

  const moodData = history.map((item, index) => ({
    checkIn: index + 1,
    score: Number(item.mood),
    date: item.date,
  }));

  const anxietyData = history.map((item, index) => ({
    checkIn: index + 1,
    score: Number(item.anxiety),
    date: item.date,
  }));

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
            Each dot represents a check-in. Higher scores indicate
            higher reported levels.
          </p>

          <div className="mt-5 bg-gray-50 rounded-xl p-5">

            {history.length < 2 ? (

              <p className="text-gray-600">
                Complete more check-ins to view your wellness trends.
              </p>

            ) : (

              <>
                {/* Graph */}

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >
                  <ScatterChart
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 10,
                      left: 20,
                    }}
                  >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      type="number"
                      dataKey="checkIn"
                      domain={[1, history.length]}
                      allowDecimals={false}
                      tickCount={history.length}
                    />

                    <YAxis
                      type="number"
                      dataKey="score"
                      domain={[0, 10]}
                    />

                    <Tooltip
                      cursor={{
                        strokeDasharray: "3 3",
                      }}
                      formatter={(value) => [
                        value,
                        "Score",
                      ]}
                      labelFormatter={(value) =>
                        `Check-In ${value}`
                      }
                    />

                    <Scatter
                      name="Mood"
                      data={moodData}
                      fill="#2563eb"
                    />

                    <Scatter
                      name="Anxiety"
                      data={anxietyData}
                      fill="#dc2626"
                    />

                  </ScatterChart>
                </ResponsiveContainer>

                {/* Check-In label */}

                <div className="text-center text-sm font-semibold text-gray-700 mt-2">
                  Check-In
                </div>

                {/* Legend */}

                <div className="flex justify-center gap-8 mt-4 text-sm">

                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                    <span>Mood</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-600"></span>
                    <span>Anxiety</span>
                  </div>

                </div>
              </>

            )}

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
                .map((item, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-5 bg-gray-50"
                  >

                    <p className="font-bold">
                      {item.date}
                    </p>

                    <p>
                      Mood: {item.mood}/10
                    </p>

                    <p>
                      Anxiety: {item.anxiety}/10
                    </p>

                    <p>
                      Energy: {item.energy}/10
                    </p>

                    <p>
                      Sleep: {item.sleep} hours
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

                ))}

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

          <div className="mt-6">

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