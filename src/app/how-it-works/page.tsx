export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-700">
          How PulseBridge Works
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          PulseBridge is a prototype designed to connect wellness
          check-ins with appropriate support.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-5">

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-3xl">📝</div>
            <h2 className="text-xl font-bold mt-4">
              1. Check-In
            </h2>
            <p className="mt-2 text-gray-600">
              A user records information about their current
              wellness.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-3xl">📊</div>
            <h2 className="text-xl font-bold mt-4">
              2. Identify Patterns
            </h2>
            <p className="mt-2 text-gray-600">
              PulseBridge organizes check-in information and
              highlights changes over time.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-3xl">⚠️</div>
            <h2 className="text-xl font-bold mt-4">
              3. Wellness Status
            </h2>
            <p className="mt-2 text-gray-600">
              The prototype categorizes patterns as stable,
              needing support, or support recommended.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-3xl">🤝</div>
            <h2 className="text-xl font-bold mt-4">
              4. Connect
            </h2>
            <p className="mt-2 text-gray-600">
              Users can explore community and professional
              support resources.
            </p>
          </div>

        </div>

        <div className="mt-10 bg-blue-50 rounded-xl p-6">

          <h2 className="text-2xl font-bold text-blue-700">
            Designed for Accessibility
          </h2>

          <p className="mt-3 text-gray-700">
            The long-term vision for PulseBridge is to make
            wellness support easier to access for people who may
            face geographic, technological, or community-based
            barriers.
          </p>

        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-6">

          <p className="text-sm text-yellow-800">
            <strong>Prototype disclaimer:</strong> PulseBridge
            is a student innovation project. It does not diagnose
            medical conditions, replace healthcare professionals,
            or provide emergency medical services.
          </p>

        </div>

      </div>
    </main>
  );
}