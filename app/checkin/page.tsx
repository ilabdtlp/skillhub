import Link from "next/link";

export default function CheckinPage() {
  return (
    <div className="flex h-svh flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-bold">Check in to Skill Hub</h1>
      <p>This page is under construction. 🚧</p>
      <Link href="/" className="text-blue-600 underline">
        Go to home page
      </Link>
    </div>
  );
}
