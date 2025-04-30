"use client";

import { useState, useEffect } from "react";

export default function CheckoutSuccessModalComponent({
  timerDuration = 5000,
}) {
  const [showModal, setShowModal] = useState(true);
  const [remainingTime, setRemainingTime] = useState(timerDuration / 1000);

  useEffect(() => {
    if (showModal) {
      const countdown = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(countdown);
            setShowModal(false);
            window.location.href = "/";
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [showModal]);

  return (
    showModal && (
      <dialog id="checkout_success" className="modal" open>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Checked Out Successfully!</h3>
          <p className="py-4">
            Thank you for visiting Skill Hub! Redirecting to the home page in{" "}
            {remainingTime} seconds.
          </p>
        </div>
      </dialog>
    )
  );
}
