"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  deleteBusinesses,
  verifyBusinesses,
} from "@/lib/actions/bussiness.action";
import { useToast } from "./ui/use-toast";

const UnVerifiedBusiness = ({ unverifiedBusinesses }: any) => {
  const { toast } = useToast();
  async function verifyBus(id: string) {
    const res = await verifyBusinesses(id);
    const parsedRes = JSON.parse(res);
    if (parsedRes.success) {
      toast({
        variant: "default",
        description: "Business has been verified successfully",
      });
    } else {
      toast({
        variant: "destructive",
        description: "Business was not able to be verified",
      });
    }
  }
  async function deleteBus(id: string) {
    const res = await deleteBusinesses(id);
    const parsedRes = JSON.parse(res);
    if (parsedRes.success) {
      toast({
        variant: "default",
        description: "Business has been deleted successfully",
      });
    } else {
      toast({
        variant: "destructive",
        description: "Business was not able to be deleted",
      });
    }
  }
  return (
    <>
      {unverifiedBusinesses.length === 0 && (
        <p className="text-center">All the businesses are already verified</p>
      )}
      <div>
        {unverifiedBusinesses.map((business: any) => (
          <div key={business._id} className="relative">
            <Link
              className="my-4 flex w-full border-2 border-dashed border-gray-400 p-2"
              href={`/service/${business._id}`}
            >
              <Image
                src={`/uploads/${business.brand_name}/${business.images[0]}`}
                alt={business.brand_name}
                className="bg-light-800"
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
            </Link>
            <div className="absolute right-2 top-2 flex gap-2">
              <Button
                className="h-max rounded-3xl bg-primary-900 px-6 py-2 text-light-900 duration-300 hover:bg-primary-500"
                onClick={() => {
                  verifyBus(business._id);
                }}
              >
                Verify
              </Button>
              <Button
                className="h-max rounded-3xl bg-red-500 px-6 py-2 text-light-900 duration-300 hover:bg-red-900"
                onClick={() => {
                  deleteBus(business._id);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UnVerifiedBusiness;
