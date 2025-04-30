import CheckinFormComponent from "@/components/CheckinForm";
import CheckinSuccessModalComponent from "@/components/CheckinSuccessModal";
import DateTimeBadgesComponent from "@/components/DateTimeBadges";

export default function CheckinPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <div className="flex w-full max-w-md flex-col gap-4 p-8 pb-0">
        <h1 className="text-xl font-bold">Check In to Skill Hub</h1>
        <DateTimeBadgesComponent />
      </div>
      <CheckinFormComponent />
      {/* <CheckinSuccessModalComponent /> */}
    </main>
  );
}
