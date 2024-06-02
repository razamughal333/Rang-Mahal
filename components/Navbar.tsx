"use client";
import { NavLinks } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import MobileNav from "./Mobile.Nav";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="flex-between absolute h-max w-full px-6 py-4 text-light-700 xs:pr-16 lg:pr-40 xl:pr-72">
      <div className="flex-center gap-2">
        <Image src="/logo.svg" alt="logo" width={36} height={38} />
        <p className="flex-center flex-col">
          Rang <span className="text-primary-900">Mahal</span>
        </p>
      </div>
      <nav className="flex gap-6 max-md:hidden">
        {NavLinks.map(({ title, link }) => {
          const isActive =
            (pathname.includes(link) && link.length > 1) || pathname === link;
          return (
            <Link
              key={title}
              href={link}
              className={`${isActive ? "bg-primary-900" : "duration-300 hover:text-primary-500"} rounded-3xl  px-4 py-2`}
            >
              {title}
            </Link>
          );
        })}
      </nav>
      <MobileNav />
    </header>
  );
};

export default Navbar;
