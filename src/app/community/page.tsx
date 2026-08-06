export default function Community() {
const groups = [
  {
    title: " Student Stress Support",
    description:
      "A space focused on managing school pressure, exams, and daily challenges.",
    link: "https://good2talk.ca/",
  },
  {
    title: " Wellness Habits",
    description:
      "Share ideas about routines, sleep, mindfulness, and healthy habits.",
    link: "https://www.health.harvard.edu/healthy-aging-and-longevity/10-habits-for-good-health",
  },
  {
    title: " Social Connection",
    description:
      "A community focused on reducing isolation and building connections.",
    link: "https://www.chitchat.gg/",
  },
];


  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12 flex flex-col items-center">

      <h1 className="text-4xl font-bold text-blue-700">
        PulseBridge Community
      </h1>


      <p className="mt-3 text-gray-600 text-center max-w-xl">
        A supportive space where people can learn, connect, and access wellness resources.
      </p>


      <div className="mt-8 bg-white rounded-xl shadow p-8 max-w-lg w-full">

        <h2 className="text-2xl font-semibold">
          Support Communities
        </h2>


        <div className="mt-5 space-y-4">

          {groups.map((group) => (
            <div
              key={group.title}
              className="border rounded-lg p-4"
            >
              <h3 className="font-bold text-lg">
                {group.title}
              </h3>

              <p className="text-gray-600 mt-2">
                {group.description}
              </p>


              <a
                href={group.link}
                target="_blank"
                rel="noopener noreferrer"
                 className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
             Learn More
            </a>

            </div>
          ))}

        </div>


      </div>

    </main>
  );
}