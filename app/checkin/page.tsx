import { Metadata } from "next";

import { Form } from "@/components/checkin";
import { DateTimeBadges } from "@/components/shared";

export const metadata: Metadata = {
  title: "Check In | Skill Hub by iLAB",
};

export default function CheckinPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <div className="flex w-full max-w-md flex-col gap-4 p-8 pb-0">
        <h1 className="text-xl font-bold">Check In to Skill Hub</h1>
        <DateTimeBadges />
      </div>
      <Form />
    </main>
  );
}
