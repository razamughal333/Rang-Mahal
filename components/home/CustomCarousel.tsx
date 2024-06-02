"use-client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { items } from "@/lib/constants";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import Autoplay from "embla-carousel-autoplay";

const CustomCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <>
      <Carousel
        setApi={setApi}
        className="mx-auto w-full"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {items.map((item) => {
            return (
              <CarouselItem key={item.id}>
                <Card className="border-0 pt-[64px]">
                  <CardContent
                    className="flex-center relative w-full  flex-col rounded-2xl bg-primary-900 p-4 pt-16 text-light-100 shadow-xl"
                    key={item.id}
                  >
                    <Image
                      src={item.imageUrl}
                      className="absolute top-[-64px] size-[128px] rounded-[50%]"
                      height="160"
                      width="160"
                      alt="user"
                    />
                    <h3 className="h3-semibold mt-2">{item.title}</h3>
                    <p className="mt-4 text-center font-light">{item.text}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      <div className="flex-center mt-8 flex gap-2">
        {Array.from({ length: count }).map((_, idx) => {
          return (
            <div
              className={`!size-3 rounded-md bg-gray-300 transition duration-500 ${current === idx + 1 ? "bg-gray-500" : ""}`}
              key={idx}
            ></div>
          );
        })}
      </div>
    </>
  );
};

export default CustomCarousel;
