"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Menu, X, User, LogOut, Settings, Bell, Sun, Moon } from "lucide-react";
import { useTheme } from "../app/contexts/ThemeContext";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        relative px-4 py-2 rounded-lg transition-all
        ${isActive 
          ? theme === "light" 
            ? "text-black" 
            : "text-white"
          : theme === "light"
            ? "text-gray-700 hover:text-black"
            : "text-gray-300 hover:text-white"
        }
      `}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400 scale-x-100 transition-transform" />
      )}
    </Link>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isHomePage = pathname === "/";
  const isLoading = status === "loading";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setUserMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const getNavBackground = () => {
    if (isHomePage) {
      return isScrolled ? "bg-black/95 backdrop-blur-sm" : "bg-transparent";
    }
    return theme === "light" ? "bg-white shadow-md" : "bg-gray-900";
  };

  const navLinks = [
    { href: "/userEvent", label: "Events", showAlways: true },
    { href: "/organizer", label: "Organizer", requiresAuth: true },
    { href: "/admin", label: "Admin", requiresAdmin: true },
  ];

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    setUserMenuOpen(false);
  };

  const userMenuItems = [
    { icon: Bell, label: "Notifications", onClick: () => {} },
    { icon: Settings, label: "Settings", onClick: () => {} },
    { icon: LogOut, label: "Sign out", onClick: handleSignOut, className: "text-red-400" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavBackground()}`}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Calendar className="w-8 h-8 text-purple-400 transition-transform group-hover:scale-110" />
            <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Event<span className="italic">Hub</span>
            </span>
          </Link>

          <div className="items-center hidden gap-6 md:flex">
            {navLinks.map(({ href, label, requiresAuth, requiresAdmin }) => {
              if ((requiresAuth && !session) || (requiresAdmin && session?.user?.role !== 'admin')) {
                return null;
              }
              return <NavLink key={href} href={href}>{label}</NavLink>;
            })}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-purple-400" />
              )}
            </button>

            {isLoading ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            ) : session ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User avatar"}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  ) : (
                    <User className="w-5 h-5 text-purple-400" />
                  )}
                  <span className={theme === "light" ? "text-gray-900" : "text-white"}>
                    {session.user?.name || "User"}
                  </span>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 w-56 py-2 mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-900 dark:bg-opacity-95 backdrop-blur-sm">
                    {userMenuItems.map(({ icon: Icon, label, onClick, className }) => (
                      <button
                        key={label}
                        onClick={onClick}
                        className={`
                          flex items-center w-full gap-2 px-4 py-2
                          ${theme === "light" ? "text-gray-700" : "text-gray-300"}
                          hover:bg-gray-100 dark:hover:bg-white/5
                          ${className || ""}
                        `}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="px-4 py-2 font-semibold text-white transition-colors rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
              >
                Sign In
              </button>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-400 md:hidden hover:text-gray-900 dark:hover:text-white"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="px-2 pt-2 pb-3 space-y-1 md:hidden">
            {navLinks.map(({ href, label, requiresAuth, requiresAdmin }) => {
              if ((requiresAuth && !session) || (requiresAdmin && session?.user?.role !== 'admin')) {
                return null;
              }
              return (
                <Link
                  key={href}
                  href={href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  {label}
                </Link>
              );
            })}
            {!session && (
              <button
                onClick={() => signIn()}
                className="block w-full px-3 py-2 text-base font-medium text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                Sign In
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;