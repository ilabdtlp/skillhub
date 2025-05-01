import { Metadata } from "next";

import { Form } from "@/components/checkout";
import { DateTimeBadges } from "@/components/shared";

export const metadata: Metadata = {
  title: "Check Out | Skill Hub by iLAB",
};

export default function CheckinPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <div className="flex w-full max-w-md flex-col gap-4 p-8 pb-0">
        <h1 className="text-xl font-bold">Check Out of Skill Hub</h1>
        <DateTimeBadges />
      </div>
      <Form />
    </main>
  );
}
