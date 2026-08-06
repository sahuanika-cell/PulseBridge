export default function Support() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12 flex flex-col items-center">

      <h1 className="text-4xl font-bold text-blue-700">
        PulseBridge Support Hub
      </h1>

      <p className="mt-3 text-gray-600 text-center max-w-xl">
        Connect with educational resources, communities, and support organizations.
      </p>


      <div className="mt-8 bg-white rounded-xl shadow p-8 max-w-lg w-full">


        <h2 className="text-2xl font-semibold">
          Recommended Support
        </h2>

        <p className="mt-3 text-gray-600">
          Based on your wellness patterns, exploring additional support may be helpful.
        </p>


        <h2 className="text-2xl font-semibold mt-8">
          Organizations
        </h2>


        <div className="mt-4 space-y-3">

          <div className="border rounded-lg p-4">
            <h3 className="font-bold">
              Mental Health Organizations
            </h3>
            <p className="text-gray-600">
              Access professional resources and guidance.
            </p>
          </div>


          <div className="border rounded-lg p-4">
            <h3 className="font-bold">
              Community Support Networks
            </h3>
            <p className="text-gray-600">
              Find groups and programs focused on connection.
            </p>
          </div>


        </div>


        <h2 className="text-2xl font-semibold mt-8">
          Learn More
        </h2>


        <ul className="mt-3 space-y-2">
          <li> Understanding stress and anxiety</li>
          <li> Building social connections</li>
          <li> Creating healthy routines</li>
        </ul>


      </div>

    </main>
  );
}