"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      router.replace("/dashboard");
    } else {
      if (result?.error) {
        setErrorMessage(result.error);
      }
    }
  };

  return (
    <div className="h-screen bg-bgLight100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white py-10 px-8 w-[93%] sm:w-1/3 rounded-lg"
      >
        {/* Show the error message here if there's one */}
        {errorMessage && (
          <div className="bg-red-100 text-red-800 p-2 rounded-md mb-4 text-sm flex justify-between">
          {errorMessage}
          <button onClick={() => setErrorMessage("")}>&times;</button>
        </div>
        )}
        <div className="flex justify-center">
          <Image
            src="/assets/images/logo.svg"
            alt="Note Icon"
            width="100"
            height="100"
          />
        </div>

        <div className="text-black text-center pt-8">
          <h1 className="text-xl font-bold pb-2">Welcome to Note</h1>
          <p className="text-xs text-gray-600">Please log in to continue</p>
        </div>

        <div className="pt-8 grid gap-y-3 text-black text-sm">
          <div className="grid gap-y-1">
            <label className="">Email Address</label>
            <input
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="text"
              className="border p-2 rounded-md"
            />
          </div>
          <div className="grid gap-y-1">
            <div className="flex justify-between">
              <label className="">Password</label>
              <Link
                className="underline text-blue500 text-xs"
                href="/verify-email"
              >
                Forgot
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="border p-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue500 text-white py-2 rounded-md"
          >
            Login
          </button>
          <hr></hr>
          <div className="text-center">
            <p className="text-gray-600 text-xs">Or log in with</p>
          </div>
          <button className="border flex justify-center items-center gap-x-2 py-2 rounded-md">
            <Image
              src="/assets/images/icon-google.svg"
              alt="Note Icon"
              className="inline-block"
              width="20"
              height="20"
            />
            <span>Google</span>
          </button>
          <hr></hr>
          <div className="text-center">
            <p className="text-gray-600 text-xs">
              No account yet?{" "}
              <Link className="text-blue500" href="/register">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
