"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json(); // Await the response to get the data

    if (res.ok) {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.ok) {
        router.replace("/dashboard");
      } else {
        setErrorMessage(result.error || "Failed to sign in. Please try again.");
      }
    } else {
      setErrorMessage(data.message || "An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white py-10 px-8 w-[93%] sm:w-1/3 rounded-lg">
      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-2 rounded-md mb-4 text-sm flex justify-between">
          {errorMessage}
          <button onClick={() => setErrorMessage("")}>&times;</button>
        </div>
      )}

      <div className="flex justify-center">
        <Image src="/assets/images/logo.svg" alt="Logo" width="100" height="100" />
      </div>

      <div className="text-black text-center pt-8">
        <h1 className="text-xl font-bold pb-2">Create Your Account</h1>
        <p className="text-xs text-gray-600">
          Sign up to start organizing your notes and boost your productivity
        </p>
      </div>

      <div className="pt-8 grid gap-y-3 text-black text-sm">
        <div className="grid gap-y-1">
          <label htmlFor="email">Email Address</label>
          <input
            name="email"
            placeholder="email@example.com"
            type="text"
            className="border p-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-y-1">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className="border p-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-xs text-gray-600 flex items-center gap-x-1">
            <Image src="/assets/images/icon-info.svg" alt="Info Icon" width="15" height="15" />
            <span>At least 8 characters</span>
          </div>
        </div>
        <button type="submit" className="bg-blue500 text-white py-2 rounded-md">
          Sign up
        </button>
        <hr />
        <div className="text-center">
          <p className="text-gray-600 text-xs">Or log in with</p>
        </div>
        <button
          type="button" 
          className="border flex justify-center items-center gap-x-2 py-2 rounded-md"
        >
          <Image src="/assets/images/icon-google.svg" alt="Google Icon" width="20" height="20" />
          <span>Google</span>
        </button>
        <hr />
        <div className="text-center">
          <p className="text-gray-600 text-xs">
            Already have an account?{" "}
            <Link className="text-blue500" href="/">
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
