"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/Button";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [islogin, setIsLogin] = useState(false);
  const navItems = [
    { name: "Rules", path: "/" },
    { name: "Question", path: "/" },
    { name: "Convenors", path: "/" },
    { name: "Leaderboard", path: "/leaderboard" },
  ];

  useEffect(() => {
    setIsLogin(!!localStorage.getItem("TOKEN"));
  }, []);

  if (["/login", "/register", "/"].includes(pathname)) return null;

  const logout = () => {
    localStorage.removeItem("TOKEN");
    router.push("/register");
  };

  return (
    <div className="relative font-[Unlock]  md:flex items-center justify-between  bg-gradient-to-r from-[#43392C] to-[#A9906F] ">
      <div className="max-w-7xl md:w-screen flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
        {/* logo */}

        <div className="w-3/12 md:flex justify-center  py-3  ">
          <Link href="#" className="flex justify-center gap-x-2 items-center">
            <Image src="/Xpedition.png" alt="" width={100} height={100} />
          </Link>
        </div>

        {/* Nav items */}

        <div className="w-6/12 md:flex hidden justify-evenly items-center">
          <ul className="w-full flex justify-evenly">
            {navItems.map((item, index) => (
              <li key={index} className="relative group">
                <Link href={item.path} className="text-white">
                  {item.name}
                </Link>

                {pathname === item.path && (
                  <span className="absolute left-0 bottom-0 w-full h-[3px] bg-white"></span>
                )}
                {pathname !== item.path && (
                  <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-white transition-all duration-200 group-hover:w-full"></span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Login */}

        <div className=" w-3/12 md:flex hidden justify-center gap-x-4">
          {islogin ? (
            <Button
              onClick={logout}
              className="px-3 py-1 rounded-lg border-2 bg-[#35452B]/30 border-white text-white"
            >
              {/* change the login to png */}
              Log out
            </Button>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1 rounded-lg border-2 bg-[#35452B]/30 border-white text-white"
            >
              {/* change the login to png */}
              Log in
            </Link>
          )}
        </div>

        {/* Hamburger Button - Only Visible on Mobile */}

        <div className="md:hidden">
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-amber-200 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {menuOpen && (
        <div className=" absolute z-100 w-full md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-r from-[#43392C] to-[#A9906F] shadow-inner">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className={`block px-3 py-4 rounded-md text-base text-center font-medium relative group ${
                  pathname === item.path
                    ? "text-amber-200 bg-amber-900/50"
                    : "text-[#F5F0E8] hover:bg-amber-900/30 hover:text-amber-200"
                } transition-colors duration-200`}
              >
                {item.name}

                {/* Active/hover indicator */}
                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-[#F5F0E8] transition-all duration-300 ${
                    pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
