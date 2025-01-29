"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (error: string) => {
    switch (error) {
      case "Configuration":
        return "There is a problem with the server configuration.";
      case "AccessDenied":
        return "Access denied. You may not have permission to sign in.";
      case "Verification":
        return "The verification link may have expired or already been used.";
      default:
        return "An error occurred during authentication.";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 text-center bg-white/5 backdrop-blur-sm rounded-xl">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>
        
        <h1 className="mb-4 text-2xl font-bold text-white">Authentication Error</h1>
        
        <p className="mb-6 text-gray-300">
          {error ? getErrorMessage(error) : "An unknown error occurred."}
        </p>

        <Link
          href="/auth/signin"
          className="inline-block px-6 py-3 text-white transition-colors bg-purple-500 rounded-lg hover:bg-purple-600"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}