"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckIn() {

  const router = useRouter();


  const [mood, setMood] = useState(5);
  const [anxiety, setAnxiety] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [sleep, setSleep] = useState(7);

  const [result, setResult] = useState("");



  function analyzeWellness() {

    let riskLevel = "low";
    let message =
      "Your wellness indicators appear balanced. Keep maintaining your healthy routines.";


    // Risk assessment logic
    if (
      mood <= 3 ||
      anxiety >= 8 ||
      energy <= 3 ||
      sleep <= 4
    ) {

      riskLevel = "high";

      message =
        "Your check-in suggests that additional support may be helpful. Consider connecting with trusted people or support resources.";

    } 
    
    else if (
      mood <= 6 ||
      anxiety >= 5 ||
      energy <= 5 ||
      sleep <= 6
    ) {

      riskLevel = "medium";

      message =
        "Some areas of your wellbeing may need attention. Consider practicing self-care and reaching out for support.";

    }


    // Save current risk level
    localStorage.setItem(
      "riskLevel",
      riskLevel
    );


    // Save check-in history
    const checkIn = {

      date: new Date().toLocaleDateString(),

      mood,
      anxiety,
      energy,
      sleep,

      risk: riskLevel

    };


    const existingHistory =
      JSON.parse(
        localStorage.getItem("checkInHistory") || "[]"
      );


    existingHistory.push(checkIn);


    localStorage.setItem(
      "checkInHistory",
      JSON.stringify(existingHistory)
    );


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


        <label className="font-semibold">
          How is your mood today? ({mood}/10)
        </label>

        <input

          type="range"

          min="1"

          max="10"

          value={mood}

          onChange={(e) =>
            setMood(Number(e.target.value))
          }

          className="w-full"

        />



        <label className="font-semibold mt-6 block">
          Anxiety level ({anxiety}/10)
        </label>


        <input

          type="range"

          min="1"

          max="10"

          value={anxiety}

          onChange={(e) =>
            setAnxiety(Number(e.target.value))
          }

          className="w-full"

        />



        <label className="font-semibold mt-6 block">
          Energy level ({energy}/10)
        </label>


        <input

          type="range"

          min="1"

          max="10"

          value={energy}

          onChange={(e) =>
            setEnergy(Number(e.target.value))
          }

          className="w-full"

        />



        <label className="font-semibold mt-6 block">
          Hours of sleep ({sleep})
        </label>


        <input

          type="range"

          min="0"

          max="12"

          value={sleep}

          onChange={(e) =>
            setSleep(Number(e.target.value))
          }

          className="w-full"

        />



        <button

          onClick={analyzeWellness}

          className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"

        >

          Analyze My Wellness

        </button>



        {result && (

          <>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl text-gray-700">

              {result}

            </div>



            <button

              onClick={() =>
                router.push("/dashboard")
              }

              className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"

            >

              View Support Dashboard

            </button>

          </>

        )}



      </div>


    </main>

  );

}