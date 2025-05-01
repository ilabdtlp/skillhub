import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "See Occupants | Skill Hub by iLAB",
};

export default function OccupantsPage() {
  return (
    <div className="flex h-svh flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-bold">See who is inside Skill Hub</h1>
      <p>This page is under construction. 🚧</p>
      <Link href="/" className="text-blue-600 underline">
        Go to home page
      </Link>
    </div>
  );
}
