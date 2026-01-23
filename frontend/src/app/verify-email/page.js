// FILE: src/app/verify-email/page.js
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing verification token.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Verification failed");
        }

        setStatus("success");
        setMessage("Email verified successfully! You can now log in.");

        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (err) {
        setStatus("error");
        setMessage(err.message || "Verification failed");
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md text-center">
        {status === "loading" && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Verifying...</h1>
            <p className="text-gray-600">Please wait while we verify your email.</p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-green-600">Success 🎉</h1>
            <p className="text-gray-700 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to login page...</p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-red-600">Verification Failed</h1>
            <p className="text-gray-700 mb-6">{message}</p>
            <button
              onClick={() => router.push("/login")}
              className="btn-primary"
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
