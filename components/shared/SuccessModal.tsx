"use client";

import { useState, useEffect } from "react";

interface Props {
  action: "checkin" | "checkout";
  duration?: number;
}

export default function SuccessModal({
  action,
  duration = 5000,
}: Readonly<Props>) {
  const [remainingTime, setRemainingTime] = useState(duration / 1000);

  // Redirect to home page after X seconds
  useEffect(() => {
    const countdown = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown);
          window.location.href = "/";
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  return (
    <dialog id="checkin_success" className="modal" open>
      {/* Show success modal according to action */}
      {action == "checkin" ? (
        <div className="modal-box">
          <h3 className="text-lg font-bold">Check In Successful!</h3>
          <p className="py-4">
            Thank you for checking in! You will be redirected to the home page
            in {remainingTime} seconds.
          </p>
        </div>
      ) : (
        <div className="modal-box">
          <h3 className="text-lg font-bold">Checked Out Successfully!</h3>
          <p className="py-4">
            Thank you for visiting Skill Hub! Redirecting to the home page in{" "}
            {remainingTime} seconds.
          </p>
        </div>
      )}
    </dialog>
  );
}
