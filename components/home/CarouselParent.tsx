"use client";
import React from "react";
import CustomCarousel from "./CustomCarousel";

const CarouselParent = () => {
  return (
    <section className="px-12 py-20 lg:px-24">
      <h2 className="h2-bold mb-4">Reviews</h2>
      <CustomCarousel />
    </section>
  );
};

export default CarouselParent;
