"use client";
import { NavLinks, serviceNavCategories } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import MobileNav from "./Mobile.Nav";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="flex-between absolute h-max w-full px-6 py-4 text-light-700">
      <div className="flex-center gap-2">
        <Image src="/logo.svg" alt="logo" width={36} height={38} />
        <p
          className={`flex-center flex-col ${pathname === "/" ? "" : "text-dark-200"}`}
        >
          Rang <span className="text-primary-900">Mahal</span>
        </p>
      </div>
      <nav className="flex gap-6 max-md:hidden xs:pl-16 lg:pl-40 xl:pl-72">
        {NavLinks.map(({ title, link }) => {
          const isActive =
            (pathname.includes(link) && link.length > 1) || pathname === link;
          if (title === "Services") {
            return (
              <NavigationMenu key={title}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={`${pathname.includes("services") ? "bg-primary-900 " : "duration-300 hover:text-primary-500"} rounded-3xl  px-4 py-2 ${pathname === "/" ? "" : pathname.includes("services") ? "text-light-700" : "text-dark-100"}`}
                    >
                      Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="flex !w-max flex-col gap-4 bg-light-800 p-4 text-dark-300">
                      {serviceNavCategories.map(({ imgUrl, title, url }) => {
                        return (
                          <NavigationMenuLink
                            key={title}
                            className="px-4 py-2 hover:bg-light-700"
                          >
                            <Link
                              href={url}
                              className="flex items-center gap-4"
                            >
                              <div className="rounded-full bg-primary-500 p-2">
                                <Image
                                  src={imgUrl}
                                  alt={title}
                                  height={32}
                                  width={32}
                                  className="icon-filter"
                                />
                              </div>
                              {title}
                            </Link>
                          </NavigationMenuLink>
                        );
                      })}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            );
          }
          return (
            <Link
              key={title}
              href={link}
              className={`${isActive ? "bg-primary-900 " : "duration-300 hover:text-primary-500"} rounded-3xl  px-4 py-2 ${pathname === "/" ? "" : isActive ? "text-light-700" : "text-dark-100"}`}
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
              className={`cursor-pointer ${pathname !== "/" ? "invert" : ""}`}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-8 bg-light-700">
            <DropdownMenuItem>
              <Link
                href="/contact"
                className="text-dark-400/80 transition-colors duration-300 hover:text-dark-100"
              >
                Help
              </Link>
            </DropdownMenuItem>
            <SignedOut>
              <DropdownMenuItem>
                <Link
                  href="/login"
                  className="text-primary-900 transition-colors duration-300 hover:text-primary-500"
                >
                  Sign In
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/onBoarding"
                  className="text-primary-900 transition-colors duration-300 hover:text-primary-500"
                >
                  Sign Up
                </Link>
              </DropdownMenuItem>
            </SignedOut>
            <SignedIn>
              <SignOutButton>
                <span className="cursor-pointer pl-2 text-sm text-red-500">
                  {" "}
                  Sign Out
                </span>
              </SignOutButton>
            </SignedIn>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <MobileNav />
    </header>
  );
};

export default Navbar;
