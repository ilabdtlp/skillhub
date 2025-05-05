import { Metadata } from "next";

import { DateTimeBadges } from "@/components/shared";
import { List } from "@/components/occupants";

export const metadata: Metadata = {
  title: "See Occupants | Skill Hub by iLAB",
};

export default function CheckinPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <div className="flex w-full flex-col gap-4 p-8 pb-0">
        <h1 className="text-xl font-bold">See Who is Inside Skill Hub</h1>
        <DateTimeBadges />
      </div>
      <List />
    </main>
  );
}
