"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "/public/logo.png";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

const Navbar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const routes: { title: string; href: string }[] = [
    { title: "Features", href: "#features" },
    { title: "Reasources", href: "#resources" },
    { title: "Pricing", href: "#pricing" },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex items-center justify-between p-1 border-b border-b-border">
      <Link href={"/"} className="shrink-0 px-4">
        <Image
          src={Logo}
          alt="Spark Royalty Logo"
          width={175}
          height={175}
          priority
          className="w-auto h-auto"
        />
      </Link>
      <div
        className={`flex items-center grow md:visible h-[calc(100vh-71.48px)] md:h-auto justify-start flex-col md:justify-end md:flex-row absolute md:static top-[71.5px]  right-0 w-full  ${
          menuOpen ? "visible" : "invisible"
        }`}
      >
        <div className="flex flex-col md:flex-row justify-end w-full py-2 px-4 gap-1 bg-background">
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              className={`inline-flex h-10 w-full items-center md:w-auto rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground`}
            >
              {route.title}
            </Link>
          ))}

          {children}
        </div>

        <div className="h-full w-full bg-background/60 md:hidden" />
      </div>

      <button onClick={toggleMenu} className="md:hidden">
        {menuOpen ? (
          <XMarkIcon className="h-7 w-7" />
        ) : (
          <Bars3Icon className="h-7 w-7" />
        )}
      </button>
    </div>
  );
};

export default Navbar;
