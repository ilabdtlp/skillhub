"use client";

import { FormEvent, useEffect, useState } from "react";

import CheckinSuccessModalComponent from "./CheckinSuccessModal";

type PendingCheckout = {
  name: string;
};

export default function CheckinFormComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    ageGroup: "15 to 25",
    gender: "",
    purpose: "Guest",
  });
  const [pendingCheckouts, setPendingCheckouts] = useState<PendingCheckout[]>(
    [],
  );
  const [nameConflict, setNameConflict] = useState(false);

  useEffect(() => {
    const fetchPendingCheckouts = async () => {
      try {
        const response = await fetch("/api/checkout", { method: "GET" });
        const data: PendingCheckout[] = await response.json();
        setPendingCheckouts(data);
      } catch (error) {
        console.error("Error fetching pending check outs:", error);
      }
    };

    fetchPendingCheckouts();
  }, []);

  const handleNameChange = (name: string) => {
    setFormData({ ...formData, name });

    const conflict = pendingCheckouts.some((row) => row.name === name);
    setNameConflict(conflict);
  };

  const getFormattedTimestamp = (): string => {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear());

    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const weekday = now.toLocaleDateString("en-US", { weekday: "long" });

    return `${weekday}, ${day}/${month}/${year}, ${time}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const checkinTime = getFormattedTimestamp();

      const response = await fetch("/api/checkin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          range: "checkin_data!A:D",
          values: [
            [
              formData.name,
              formData.ageGroup,
              formData.gender,
              formData.purpose,
              checkinTime,
            ],
          ],
        }),
      });

      setIsLoading(false);

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data.");
    }
  };

  return showSuccessModal ? (
    <CheckinSuccessModalComponent />
  ) : (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-2 p-8 sm:mt-4 sm:rounded-lg sm:shadow-lg"
    >
      <fieldset className="fieldset">
        <legend className="fieldset-legend">What is your name?</legend>
        <input
          required
          type="text"
          className={`input w-full ${nameConflict && "input-error"}`}
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
        />
        {nameConflict && (
          <p className="text-error label">
            A person with same name is already checked in.
          </p>
        )}
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Select your age group</legend>

        <select
          className="select w-full"
          required
          value={formData.ageGroup}
          onChange={(e) =>
            setFormData({ ...formData, ageGroup: e.target.value })
          }
        >
          <option value="Below 15">Below 15</option>
          <option value="15 to 25">15 to 25</option>
          <option value="25 to 45">25 to 45</option>
          <option value="45 Above">45 Above</option>
        </select>
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Select your gender</legend>

        <div className="join w-full">
          <input
            className="join-item btn btn-neutral btn-outline flex-1"
            type="radio"
            name="gender"
            value="Male"
            aria-label="Male"
            required
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          />
          <input
            className="join-item btn btn-neutral btn-outline flex-1"
            type="radio"
            name="gender"
            value="Female"
            aria-label="Female"
            required
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          />
          <input
            className="join-item btn btn-neutral btn-outline flex-1"
            type="radio"
            name="gender"
            value="Other"
            aria-label="Other"
            required
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          />
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">What is your purpose?</legend>

        <select
          className="select w-full"
          required
          value={formData.purpose}
          onChange={(e) =>
            setFormData({ ...formData, purpose: e.target.value })
          }
        >
          <option value="Guest">Guest</option>
          <option value="Staff">Staff</option>
          <option value="DTLP">DTLP</option>
          <option value="CLAP">CLAP</option>
          <option value="CEEM">CEEM</option>
          <option value="Other Event">Other Event</option>
        </select>
      </fieldset>

      <button
        type="submit"
        className="btn btn-primary btn-block mt-4"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Check In"
        )}
      </button>
    </form>
  );
}
