"use client";

import { FormEvent, useEffect, useState } from "react";

import { SuccessModal } from "../shared";

type PendingCheckout = {
  id: number;
  name: string;
  ageGroup: string;
  gender: string;
  purpose: string;
  checkinTime: string;
  checkoutTime?: string;
};

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
  });
  const [pendingCheckouts, setPendingCheckouts] = useState<PendingCheckout[]>(
    [],
  );

  useEffect(() => {
    const fetchPendingCheckouts = async () => {
      try {
        const response = await fetch("/api/checkout", { method: "GET" });
        const data = await response.json();
        setPendingCheckouts(data);
      } catch (error) {
        console.error("Error fetching pending checkouts:", error);
      }
    };

    fetchPendingCheckouts();
  }, []);

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

  const calculateDuration = (
    checkinTime: string,
    checkoutTime: string,
  ): string => {
    const checkinDate = new Date(checkinTime);
    const checkoutDate = new Date(checkoutTime);
    const diffMs = checkoutDate.getTime() - checkinDate.getTime();

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return `${hours} h, ${minutes} m, ${seconds} s`;
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const selectedRow = pendingCheckouts.find(
        (row) => row.name === formData.name,
      );
      if (!selectedRow) {
        throw new Error("Selected name not found in pending checkouts.");
      }

      const checkOutTime = getFormattedTimestamp();
      const duration = calculateDuration(selectedRow.checkinTime, checkOutTime);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rowId: selectedRow.id,
          values: [
            selectedRow.name,
            selectedRow.ageGroup,
            selectedRow.gender,
            selectedRow.purpose,
            selectedRow.checkinTime,
            checkOutTime,
            duration,
            formData.rating,
          ],
        }),
      });

      setIsLoading(false);

      if (!response.ok) {
        throw new Error("Failed to complete checkout.");
      }

      setShowSuccessModal(true);
    } catch (error: unknown) {
      console.error("Error completing checkout:", error);
      alert((error as Error).message || "Failed to complete checkout.");
    }
  };

  return showSuccessModal ? (
    <SuccessModal action="checkout" />
  ) : (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-2 p-8 sm:mt-4 sm:rounded-lg sm:shadow-lg"
    >
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Select your name</legend>

        <select
          defaultValue=""
          className="select w-full"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        >
          <option value="" disabled>
            Select
          </option>
          {pendingCheckouts.map((row) => (
            <option key={row.id} value={row.name}>
              {row.name}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Rate your experience</legend>

        <div className="rating">
          <input
            type="radio"
            name="rating"
            className="mask mask-star"
            aria-label="1 star"
            value="1"
            onChange={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
          />
          <input
            type="radio"
            name="rating"
            className="mask mask-star"
            aria-label="2 star"
            value="2"
            onChange={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
          />
          <input
            type="radio"
            name="rating"
            className="mask mask-star"
            aria-label="3 star"
            value="3"
            onChange={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
          />
          <input
            type="radio"
            name="rating"
            className="mask mask-star"
            aria-label="4 star"
            value="4"
            onChange={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
          />
          <input
            type="radio"
            name="rating"
            className="mask mask-star"
            aria-label="5 star"
            value="5"
            onChange={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
          />
        </div>

        <p className="label overflow-clip">
          This rating is for the Skill Hub experience,
          <br />
          not for the program you attended.
        </p>
      </fieldset>

      <button
        type="submit"
        className="btn btn-primary btn-block mt-4"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Check Out"
        )}
      </button>
    </form>
  );
}
