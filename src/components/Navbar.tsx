"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Menu, X, User, LogOut, Settings, Bell, Sun, Moon } from "lucide-react";
import classNames from "classnames";
import { useTheme } from "../app/contexts/ThemeContext";

const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={classNames(
        "relative px-4 py-2 rounded-lg transition-all",
        isActive
          ? theme === "light"
            ? "text-black"
            : "text-white"
          : theme === "light"
          ? "text-gray-700 hover:text-black"
          : "text-gray-300 hover:text-white"
      )}
    >
      {children}
      {isActive && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400 scale-x-100 transition-transform" />}
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

  return (
    <nav className={classNames("fixed top-0 left-0 right-0 z-50 transition-all duration-300", { "bg-black": isScrolled, "bg-transparent": pathname === "/" && !isScrolled })}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Calendar className="w-8 h-8 text-purple-400 transition-transform group-hover:scale-110" />
            <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Event<span className="italic">Hub</span></span>
          </Link>

          <div className="items-center hidden gap-6 md:flex">
            {[
              { href: "/userEvent", label: "Events" },
              { href: "/organizer", label: "Organizer" },
              { href: "/admin", label: "Admin" },
            ].map(({ href, label }) => (
              <NavLink key={href} href={href}>{label}</NavLink>
            ))}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-purple-400" />}
            </button>

            <div className="relative" ref={menuRef}>
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5">
                <User className="w-5 h-5 text-purple-400" />
                <span className="text-gray-900 dark:text-white">John Doe</span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 w-56 py-2 mt-2 rounded-lg shadow-lg bg-gray-900/95 backdrop-blur-sm">
                  {[{ icon: Bell, label: "Notifications" }, { icon: Settings, label: "Settings" }, { icon: LogOut, label: "Logout", className: "text-red-400" }].map(({ icon: Icon, label, className }) => (
                    <button key={label} className={classNames("flex items-center w-full gap-2 px-4 py-2 text-gray-300 hover:bg-white/5", className)}>
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-400 md:hidden hover:text-gray-900 dark:hover:text-white">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;