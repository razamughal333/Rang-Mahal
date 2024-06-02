"use client";
import { NavLinks } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import MobileNav from "./Mobile.Nav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="flex-between absolute h-max w-full px-6 py-4 text-light-700">
      <div className="flex-center gap-2">
        <Image src="/logo.svg" alt="logo" width={36} height={38} />
        <p className="flex-center flex-col">
          Rang <span className="text-primary-900">Mahal</span>
        </p>
      </div>
      <nav className="flex gap-6 max-md:hidden xs:pl-16 lg:pl-40 xl:pl-72">
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
      <div className="max-md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              src="/icons/hamburger.svg"
              alt="menu"
              width={36}
              height={36}
              className="cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-8 bg-light-700">
            <DropdownMenuItem>
              <Link
                href="contact-us"
                className="text-dark-400/80 transition-colors duration-300 hover:text-dark-100"
              >
                Help
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="login"
                className="text-primary-900 transition-colors duration-300 hover:text-primary-500"
              >
                Sign In
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="onBoarding"
                className="text-primary-900 transition-colors duration-300 hover:text-primary-500"
              >
                Sign Up
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <MobileNav />
    </header>
  );
};

export default Navbar;
