// pages/login.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#6E43B1] to-white">
      <div className="p-8 text-gray-200 text-center">
        <h1 className="text-6xl font-semibold mb-4">Plums</h1>
        <p className="mb-4">Rethink your personal learning.</p>
          <button type="submit" onClick={()=>signIn("google", { callbackUrl: '/home' })} className="text-2xl font-semibold mb-4 rounded-full border-4 border-gray-200 px-4 py-2 text-gray-200 hover:bg-gray-200 hover:text-[#FAABBA] focus:outline-none focus:bg-gray-200 focus:text-purple-800">
            Sign in with Google
          </button>
      </div>
    </div>
  );
}

