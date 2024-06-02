"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNavLinks } from "@/lib/constants";

const NavContent = () => {
  const pathname = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {MobileNavLinks.map(({ link, title }) => {
        const isActive =
          (pathname.includes(link) && link.length > 1) || pathname === link;
        return (
          <SheetClose asChild key={link}>
            <Link
              href={link}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {title}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

function MobileNav() {
  return (
    <div className=" md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Image src="/icons/hamburger.svg" alt="Menu" width={36} height={36} />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="background-light900_dark200 overflow-y-auto border-none"
        >
          <Link href="/" className="flex items-center gap-1">
            <Image src="/logo.svg" alt="Devflow" width={23} height={23} />
            <p className="h2-bold text-dark100_light900 font-spaceGrotesk ">
              Rang
              <span className="text-primary-900">Mahal</span>
            </p>
          </Link>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNav;
