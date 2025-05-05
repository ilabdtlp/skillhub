"use client";

import { useEffect, useState } from "react";

type Occupant = {
  id: number;
  name: string;
  ageGroup: string;
  gender: string;
  purpose: string;
  checkinTime: string;
};

export default function List() {
  const [occupants, setOccupants] = useState<Occupant[]>([]);
  const [durations, setDurations] = useState<{ [id: number]: string }>({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch occupants data
  useEffect(() => {
    const fetchOccupants = async () => {
      try {
        const response = await fetch("/api/occupants", { method: "GET" });
        const data: Occupant[] = await response.json();
        setOccupants(data);

        // Initialize durations
        const initialDurations: { [id: number]: string } = {};
        data.forEach((occupant) => {
          initialDurations[occupant.id] = calculateDuration(
            occupant.checkinTime,
          );
        });
        setDurations(initialDurations);
      } catch (error) {
        console.error("Error fetching occupants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOccupants();
  }, []);

  // Update durations live
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedDurations: { [id: number]: string } = {};
      occupants.forEach((occupant) => {
        updatedDurations[occupant.id] = calculateDuration(occupant.checkinTime);
      });
      setDurations(updatedDurations);
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [occupants]);

  // Helper function to calculate duration
  const calculateDuration = (checkInTime: string): string => {
    const checkInDate = new Date(checkInTime);

    // Validate the date
    if (isNaN(checkInDate.getTime())) {
      return "Invalid duration";
    }

    const now = new Date();
    const diffMs = now.getTime() - checkInDate.getTime();

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // Helper function to determine avatar URL
  const getAvatarUrl = (gender: string, name: string): string => {
    const baseUrl = "https://avatar.iran.liara.run/public/";
    const genderPath =
      gender.toLowerCase() === "male"
        ? "boy"
        : gender.toLowerCase() === "female"
          ? "girl"
          : "";
    const usernameParam = `?username=${encodeURIComponent(name)}`;
    return `${baseUrl}${genderPath}${usernameParam}`;
  };

  if (isLoading) {
    return <p>Loading occupants...</p>;
  }

  if (occupants.length === 0) {
    return <p>No one is currently checked in.</p>;
  }

  return (
    <ul className="grid gap-4 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {occupants.map((occupant) => (
        <li key={occupant.id} className="h-auto">
          <div className="card bg-base-100 h-full gap-4 p-4 shadow-sm">
            <figure className="p-0">
              <img
                src={getAvatarUrl(occupant.gender, occupant.name)}
                alt={`${occupant.name}'s avatar`}
                className="size-24"
              />
            </figure>
            <div className="card-body items-center p-0 text-center">
              <h2 className="card-title">{occupant.name}</h2>
              <div className="card-actions">
                <div className="badge badge-primary badge-soft">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-[1em]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                  {occupant.purpose}
                </div>

                <div className="badge badge-secondary badge-soft">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-[1em]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                  {durations[occupant.id] || "0h 0m 0s"}
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
