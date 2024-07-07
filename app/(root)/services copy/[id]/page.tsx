import { getBusinessesByFilter } from "@/lib/actions/bussiness.action";
import React from "react";
import { CatDescription } from "@/lib/constants";
import Image from "next/image";
import CategoryFilters from "@/components/CategoryFilter";

const page = async ({ params, searchParams }: any) => {
  console.log(searchParams);
  const businesses = await getBusinessesByFilter(params.id, searchParams);
  const parsedBusinesses = JSON.parse(businesses).businesses;

  const detail = CatDescription[params.id as keyof typeof CatDescription];
  return (
    <div className="px-10 py-20">
      <h1 className="h1-bold">{detail.title}</h1>
      <p className="paragraph-semibold">{detail.description}</p>
      <div className="grid grid-cols-[max-content_auto] gap-4">
        <CategoryFilters />
        <div>
          {parsedBusinesses.map((business: any) => (
            <div
              key={business._id}
              className="flex w-full border-2 border-dashed border-gray-400 p-2"
            >
              <Image
                src={`/uploads/${business.brand_name}/${business.images[0]}`}
                alt={business.brand_name}
                height={200}
                width={200}
              />
              <div className="flex w-full flex-col justify-between px-8 py-2">
                <h2 className="h2-bold">{business.brand_name}</h2>
                <p className="flex gap-2">
                  <Image
                    src="/icons/map.svg"
                    alt="map"
                    height={20}
                    width={20}
                  />
                  {business.office_address}
                </p>
                <p>{business.description}</p>
                <div className="mx-auto my-2 h-[2px] w-full rounded-full bg-gray-500"></div>
                <div className="flex justify-between">
                  <h3 className="h3-semibold flex gap-4">
                    <Image
                      src="/icons/venues-verified.svg"
                      alt="map"
                      height={20}
                      width={20}
                    />
                    {business.brand_name}
                  </h3>
                  <h3 className="h3-semibold flex gap-4">
                    Starting at PKR
                    {" " + business.minPrice}
                  </h3>
                </div>
              </div>
            </div>
          ))}
          {parsedBusinesses.map((business: any) => (
            <div
              key={business._id}
              className="flex w-full border-2 border-dashed border-gray-400 p-2"
            >
              <Image
                src={`/uploads/${business.brand_name}/${business.images[0]}`}
                alt={business.brand_name}
                height={200}
                width={200}
              />
              <div className="flex w-full flex-col justify-between px-8 py-2">
                <h2 className="h2-bold">{business.brand_name}</h2>
                <p className="flex gap-2">
                  <Image
                    src="/icons/map.svg"
                    alt="map"
                    height={20}
                    width={20}
                  />
                  {business.office_address}
                </p>
                <p>{business.description}</p>
                <div className="mx-auto my-2 h-[2px] w-full rounded-full bg-gray-500"></div>
                <div className="flex justify-between">
                  <h3 className="h3-semibold flex gap-4">
                    <Image
                      src="/icons/venues-verified.svg"
                      alt="map"
                      height={20}
                      width={20}
                    />
                    {business.brand_name}
                  </h3>
                  <h3 className="h3-semibold flex gap-4">
                    Starting at PKR
                    {" " + business.minPrice}
                  </h3>
                </div>
              </div>
            </div>
          ))}
          {parsedBusinesses.map((business: any) => (
            <div
              key={business._id}
              className="flex w-full border-2 border-dashed border-gray-400 p-2"
            >
              <Image
                src={`/uploads/${business.brand_name}/${business.images[0]}`}
                alt={business.brand_name}
                height={200}
                width={200}
              />
              <div className="flex w-full flex-col justify-between px-8 py-2">
                <h2 className="h2-bold">{business.brand_name}</h2>
                <p className="flex gap-2">
                  <Image
                    src="/icons/map.svg"
                    alt="map"
                    height={20}
                    width={20}
                  />
                  {business.office_address}
                </p>
                <p>{business.description}</p>
                <div className="mx-auto my-2 h-[2px] w-full rounded-full bg-gray-500"></div>
                <div className="flex justify-between">
                  <h3 className="h3-semibold flex gap-4">
                    <Image
                      src="/icons/venues-verified.svg"
                      alt="map"
                      height={20}
                      width={20}
                    />
                    {business.brand_name}
                  </h3>
                  <h3 className="h3-semibold flex gap-4">
                    Starting at PKR
                    {" " + business.minPrice}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
