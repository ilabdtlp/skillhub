export default function CalendarPage() {
  return (
    <main className="flex flex-1 px-3">
      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FKolkata&showPrint=0&showCalendars=0&showTz=0&mode=AGENDA&src=Y2U0NWRmMWRkMTkxM2ZhOTk0MWM5Y2FlYmIzYWYzY2RmYzZmNzVmOGI2Mjg1Zjk5ZmFhZTI2ZDI4NjhiNWM1YUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23e4c441"
        className="border-base-300 w-full rounded-xl border"
      ></iframe>
    </main>
  );
}
