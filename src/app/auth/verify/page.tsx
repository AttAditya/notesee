export default function Verify() {
  return (
    <div className="flex justify-center items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-[-.01em] text-center w-full">
          Verify your email
        </h1>
        <p className="text-lg text-center">
          We have sent you a verification email.
          Please check your inbox and click the link to verify your email address.

        </p>
        <a href="/auth/login">
          <button className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition duration-200 mt-[16px] cursor-pointer">
            Go to Login
          </button>
        </a>
      </main>
    </div>
  )
}