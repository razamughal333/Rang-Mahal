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
        <DialogTrigger className="h-max rounded-3xl bg-primary-900 px-6 py-2 text-light-900 duration-300 hover:bg-primary-500">
          View Images
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
