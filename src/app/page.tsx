export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold text-blue-700">
        PulseBridge
      </h1>

      <p className="mt-6 text-xl text-gray-700 text-center max-w-2xl">
        An AI-powered mental wellness support platform which helps detect
        moments of distress. Additionally it provides resources that people
        can use if they start to feel alone or bad.
      </p>

  <a
  href="/check-in"
  className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl text-lg hover:bg-blue-700"
>
  Start Check-In
</a>
    </main>
  );
}