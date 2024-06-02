import Image from "next/image";
import React from "react";
import FooterLinks from "./FooterLinks";
import { footerLinks, socialLinks } from "@/lib/constants";
import { Separator } from "./ui/separator";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary-900 p-2">
      <div className="flex items-center gap-4">
        <Image src="/logo.svg" alt="logo" width={48} height={48} />
        <h1 className="h1-bold font-semibold text-light-800">
          Rang <span className="block"></span> Mahal
        </h1>
      </div>
      <div className="flex justify-end gap-8 px-4 py-8 text-light-800 xs:px-16">
        {footerLinks.map((links: any) => (
          <FooterLinks links={links} key={links.title} />
        ))}
      </div>
      <Separator className="mx-auto h-[2px] w-[90%] bg-dark-600" />
      <div className="flex items-center justify-between gap-4 px-8 py-4 text-light-800 max-xs:flex-col-reverse">
        <p className="text-center">&copy; Rang Mahal. All rights reserved</p>
        <div className="flex gap-4 ">
          {socialLinks.map(({ img, link }: any) => {
            return (
              <Link href={link} key={link}>
                <Image src={img} alt="social" width={24} height={24} />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
