/* eslint-disable camelcase */
"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

const Images = ({ brand_name, images }: any) => {
  const [currentImg, setCurrentImg] = useState<number>(0);
  function incCurrentImg() {
    setCurrentImg((prev) => (prev + 1) % images.length);
  }
  function decCurrentImg() {
    setCurrentImg((prev) => (prev - 1) % images.length);
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger className="group relative h-max rounded-3xl">
          <Image
            src={`/uploads/${brand_name}/${images[0]}`}
            alt="verified"
            className="rounded-xl [&~button]:border-none"
            height={400}
            width={600}
          />
          <div className="absolute top-0 hidden size-full items-center justify-center rounded-xl bg-dark-200/50 text-light-100 group-hover:flex">
            <p className="h3-semibold">View more</p>
          </div>
        </DialogTrigger>
        <DialogContent className="flex items-center border-none p-20">
          <button
            disabled={currentImg === 0}
            className={`h-max p-4 text-xl text-white ${currentImg === 0 ? "invisible" : ""}`}
            onClick={decCurrentImg}
          >
            &#8592;
          </button>
          {
            <Image
              src={`/uploads/${brand_name}/${images[currentImg]}`}
              alt="verified"
              className="[&~button]:border-none"
              height={400}
              width={600}
            />
          }

          <button
            disabled={currentImg === images.length - 1}
            className={`h-max p-4 text-xl text-white ${currentImg === images.length - 1 ? "invisible" : ""}`}
            onClick={incCurrentImg}
          >
            &#8594;
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Images;
