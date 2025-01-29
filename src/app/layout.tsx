'use client';

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";

// Mock components/providers for the example
const NextAuthProvider = ({ children }) => <>{children}</>;
const ThemeProvider = ({ children }) => <>{children}</>;
const Navbar = () => <nav className="fixed top-0 z-20 w-full h-16 bg-white/80 backdrop-blur-sm"></nav>;
const Footer = () => <footer className="w-full py-6 bg-gray-100"></footer>;
const Background = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 -z-10"></div>
);
const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
  </div>
);

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className="min-h-screen">
      <NextAuthProvider>
        <ThemeProvider>
          {/* Background will always be present */}
          <Background />

          {/* Suspense will show the loading spinner until the Navbar and other async components are loaded */}
          <Suspense fallback={<LoadingSpinner />}>
            <Navbar />
            <main className="relative z-10 min-h-screen pt-16">
              {/* Render the children (page content) */}
              {children}
            </main>

            {/* Conditionally render additional content for the homepage */}
            {isHomePage && <div className="py-8">Home Page Layout</div>}

            {/* Always show the Footer */}
            <Footer />
          </Suspense>
        </ThemeProvider>
      </NextAuthProvider>
    </div>
  );
}
