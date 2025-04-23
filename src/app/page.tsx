"use client";

import { useEffect } from "react";
import { ChevronRight, Notebook, User, Zap } from "lucide-react";
import { userLoggedIn } from "@/utils/auth";

export default function Home() {
  useEffect(() => {
    if (userLoggedIn()) window.location.href = "/dashboard";
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <main className="py-10 flex flex-col gap-2 items-center w-full">
        <h1 className="text-8xl">
          Notesee
        </h1>

        <h2 className="text-3xl text-center font-light">
          Easing summarizing notes
        </h2>

        <ul className="flex flex-col gap-10 my-16 items-center justify-center md:flex-row">
          <li className="w-80 bg-black/5 rounded-2xl p-8 flex flex-col items-center gap-4">
            <User className="rounded-full w-10 h-10 bg-black text-white p-3" />
            Login to Notesee
          </li>
          <ChevronRight className="rotate-90 md:rotate-0" />
          <li className="w-80 bg-black/5 rounded-2xl p-8 flex flex-col items-center gap-4">
            <Notebook className="rounded-full w-10 h-10 bg-black text-white p-3" />
            Write/paste your notes
          </li>
          <ChevronRight className="rotate-90 md:rotate-0" />
          <li className="w-80 bg-black/5 rounded-2xl p-8 flex flex-col items-center gap-4">
            <Zap className="rounded-full w-10 h-10 bg-black text-white p-3" />
            Run the summarizer
          </li>
        </ul>

        <div className="p-4 flex gap-4 justify-center items-center flex-col sm:flex-row w-3/4">
          <a href="/auth/login" className="w-full md:w-fit">
            <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto cursor-pointer w-full">
              Login
            </button>
          </a>

          <a href="/auth/register" className="w-full md:w-fit">
            <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto cursor-pointer w-full">
              Register
            </button>
          </a>
        </div>
      </main>
    </div>
  );
}
