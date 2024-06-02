import Link from "next/link";
import React from "react";

const FooterLinks = ({ links }: any) => {
  const { title, footerLinks } = links;
  return (
    <div>
      <h3 className="h3-semibold mb-6">{title}</h3>
      <div className="flex flex-col gap-4">
        {footerLinks.map(({ title, link }: any) => {
          return (
            <Link
              href={link}
              key={title}
              className="transition-all duration-300 hover:text-light-700 hover:underline"
            >
              {title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FooterLinks;
