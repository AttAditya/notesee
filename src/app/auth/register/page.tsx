"use client";

import supabase from "@/lib/supabase";
import { useRef } from "react";

export default function Register() {
  const emailRef = useRef<HTMLInputElement|null>(null);
  const passwordRef = useRef<HTMLInputElement|null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Registration error:", error.message);
      alert("Registration failed. Please try again.");
    } else {
      alert("Registration successful!");
      window.location.href = "/auth/verify";
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-[-.01em] text-center w-full">
          Register
        </h1>

        <div className="flex flex-col gap-[8px] w-full min-w-[400px] max-w-[400px] border border-gray-300 px-4 py-4 pb-2 rounded-lg items-stretch">
          <form className="flex flex-col gap-[16px]" onSubmit={handleSubmit}>
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded p-2"
            />
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded p-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition duration-200 mt-[16px]"
            >
              Register
            </button>
          </form>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}