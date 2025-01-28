"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingSpinner from "./LoadingSpinner";
import Layout from "@/components/HeroSection/Home/layout";
import Background from "@/components/HeroSection/Home/Hero/Background";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading
        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
      }
    };

    loadData();
  }, []);

  const isHomePage = pathname === "/";

  return (
    <html lang="en">
      <body className="relative">
        <Background /> {/* Persistent background */}
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <>
            <Navbar />
            <main className="relative z-10 mt-16">{children}</main>
            {isHomePage && <Layout />} Only render Layout on home page
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}