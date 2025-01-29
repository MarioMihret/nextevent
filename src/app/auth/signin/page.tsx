"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Github, ToggleLeft as Google } from "lucide-react";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (provider: string) => {
    try {
      setIsLoading(true);
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white/5 backdrop-blur-sm rounded-xl">
        <h1 className="mb-6 text-2xl font-bold text-center text-white">Sign In to EventHub</h1>
        
        <div className="space-y-4">
          <button
            onClick={() => handleSignIn("github")}
            disabled={isLoading}
            className="flex items-center justify-center w-full gap-3 px-4 py-3 text-white transition-colors bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>

          <button
            onClick={() => handleSignIn("google")}
            disabled={isLoading}
            className="flex items-center justify-center w-full gap-3 px-4 py-3 text-gray-900 transition-colors bg-white rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <Google className="w-5 h-5" />
            Continue with Google
          </button>
        </div>

        {isLoading && (
          <div className="mt-4 text-center text-gray-400">
            Redirecting to provider...
          </div>
        )}
      </div>
    </div>
  );
}