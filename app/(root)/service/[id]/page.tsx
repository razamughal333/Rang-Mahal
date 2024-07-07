import Images from "@/components/Images";
// import { Button } from "@/components/ui/button";
import { getBusinessesById } from "@/lib/actions/bussiness.action";
import Image from "next/image";
import React from "react";

const page = async ({ params }: any) => {
  const business = await getBusinessesById(params.id);
  const parsedBusiness = JSON.parse(business).business;
  if (!parsedBusiness) {
    return null;
  }
  return (
    <div className="px-10 py-20">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Image
                src="/icons/verified-DP-2.svg"
                alt="verified"
                height={32}
                width={32}
              />
              <h1 className="h1-bold">{parsedBusiness.brand_name}</h1>
            </div>
            <p className="flex gap-2">
              <Image src="/icons/map.svg" alt="map" height={20} width={20} />
              {parsedBusiness.office_address}
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <Images
              brand_name={parsedBusiness.brand_name}
              images={parsedBusiness.images}
            />
            {/* <Button className="h-max rounded-3xl bg-primary-900 px-6 py-2 text-light-900 duration-300 hover:bg-primary-500">
              Book Now
            </Button> */}
          </div>
        </div>
        <div className="my-4 h-[2px] w-full bg-gray-400 px-4"></div>
        <div className="flex flex-col gap-8">
          <h2 className="h2-bold mb-4">Details</h2>
          <div>
            <h3 className="paragraph-semibold flex gap-2">
              <Image
                src="/icons/staff.svg"
                alt="staff"
                height={16}
                width={16}
              />
              STAFF
            </h3>
            <p className="paragraph-regular pl-6">
              {parsedBusiness.male_staff && "Male"}
              {parsedBusiness.male_staff && parsedBusiness.female_staff && ","}
              {parsedBusiness.female_staff && "Female"}
              {(parsedBusiness.female_staff || parsedBusiness.male_staff) &&
                parsedBusiness.transgender_staff &&
                ","}
              {parsedBusiness.transgender_staff && "Transgender"}
            </p>
          </div>
          <div>
            <h3 className="paragraph-semibold flex gap-2">
              <Image
                src="/icons/cancellation_policy.svg"
                alt="cancellation_policy"
                height={16}
                width={16}
              />
              CANCELLATION POLICY
            </h3>
            <p className="paragraph-regular pl-6">
              {parsedBusiness.refundable}
            </p>
          </div>
          <div>
            <h3 className="paragraph-semibold flex gap-2">
              <Image
                src="/icons/description.svg"
                alt="description"
                height={16}
                width={16}
              />
              DESCRIPTION
            </h3>
            <p className="paragraph-regular pl-6">
              {parsedBusiness.description}
            </p>
          </div>
          <div>
            <h3 className="paragraph-semibold flex gap-2">
              <Image
                src="/icons/additional-info.svg"
                alt="additional"
                height={16}
                width={16}
              />
              ADDITIONAL INFORMATION
            </h3>
            <p className="paragraph-regular pl-6">
              {parsedBusiness.additionalInfo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
