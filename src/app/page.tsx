"use client";

import { useEffect } from "react";
import { ChevronRight, Notebook, User, Zap } from "lucide-react";
import { userLoggedIn } from "@/utils/auth";

export default function Home() {
  useEffect(() => {
    if (userLoggedIn()) window.location.href = "/dashboard";
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <main className="flex flex-col gap-2 items-center">
        <h1 className="text-8xl">
          Notesee
        </h1>

        <h2 className="text-3xl text-center font-light">
          Easing summarizing notes
        </h2>

        <ul className="flex gap-10 m-16 items-center">
          <li className="w-80 bg-black/5 rounded-2xl p-8 flex flex-col items-center gap-4">
            <User className="rounded-full w-10 h-10 bg-black text-white p-3" />
            Login to Notesee
          </li>
          <ChevronRight />
          <li className="w-80 bg-black/5 rounded-2xl p-8 flex flex-col items-center gap-4">
            <Notebook className="rounded-full w-10 h-10 bg-black text-white p-3" />
            Write/paste your notes
          </li>
          <ChevronRight />
          <li className="w-80 bg-black/5 rounded-2xl p-8 flex flex-col items-center gap-4">
            <Zap className="rounded-full w-10 h-10 bg-black text-white p-3" />
            Run the summarizer
          </li>
        </ul>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a href="/auth/login">
            <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto cursor-pointer">
              Login
            </button>
          </a>

          <a href="/auth/register">
            <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto cursor-pointer">
              Register
            </button>
          </a>
        </div>
      </main>
    </div>
  );
}
