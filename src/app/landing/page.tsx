// pages/landing.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default async function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between items-center p-4 "> 
        <div className="text-lg font-semibold text-white">Plums.</div>
        <button
          type="submit"
          onClick={() => signIn("google", { callbackUrl: "/home" })}
          className="text-lg font-semibold rounded-full border-2 border-white px-4 py-2 text-white  hover:bg-white hover:text-[#6E43B1] focus:outline-none focus:bg-white focus:text-[#6E43B1]"
        >
          Sign in with Google
        </button>
      </div>
      <div className="flex-1 flex justify-center items-center bg-gradient-to-b from-[#6E43B1] to-white">
        <div className="p-8 text-gray-200 flex">
          <div className="flex-1 text-left"> 
            <h1 className="text-6xl font-semibold mb-4">Plums</h1>
            <p className="mb-4">Rethink your personal learning.</p>
            <button
              type="submit"
              onClick={() => signIn("google", { callbackUrl: "/home" })}
              className="text-2xl font-semibold mb-4 rounded-full border-4 border-white px-4 py-2 text-white bg-transparent hover:bg-white hover:text-[#6E43B1] focus:outline-none focus:bg-white focus:text-[#6E43B1]"
            >
              Sign in with Google
            </button>
          </div>
          <div>
            <img src="your-image-url.jpg" alt="Image" className="h-auto max-h-[100%] max-w-[100%]" /> 
          </div>
        </div>
      </div>
    </div>
  );
}
