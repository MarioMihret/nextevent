"use client"; // Mark this file as a client component

import React, { useState, useEffect } from "react";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/index";
import LoadingSpinner from "./LoadingSpinner";
import Layout from "@/components/HeroSection/Home/layout";
import Background from "@/components/HeroSection/Home/Hero/Background"; // Import the Background component

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <html lang="en">
      <body className="relative">
      
          <Background /> {/* Persistent background */}
          {loading ? (
            <div className="flex items-center justify-center min-h-screen">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <Navbar />
              <main className="relative z-10 mt-16">{children}</main>
              <Layout />
              <Footer />
            </>
          )}
       
      </body>
    </html>
  );
}
