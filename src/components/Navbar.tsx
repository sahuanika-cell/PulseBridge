import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <Link
        href="/"
        className="text-2xl font-bold text-blue-700"
      >
        PulseBridge
      </Link>


      <div className="flex gap-5 text-gray-700">

        <Link href="/check-in">
          Check-In
        </Link>

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/support">
          Support
        </Link>

        <Link href="/community">
          Community
        </Link>

      </div>

    </nav>
  );
}