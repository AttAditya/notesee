export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-[-.01em] text-center sm:text-left">
          Summarize your Notes in seconds!
        </h1>

        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Login with your Google account
          </li>
          <li className="mb-2 tracking-[-.01em]">
            Write/paste your notes
          </li>
          <li className="tracking-[-.01em]">
            Run the summarizer
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a href="/auth/login">
            <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto cursor-pointer">
              Login
            </button>
          </a>
        </div>
      </main>
    </div>
  );
}
