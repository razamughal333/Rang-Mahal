import DateVerification from "@/components/DateVerification";
import BookingForm from "@/components/form/BookingForm";
import { ReviewForm } from "@/components/form/ReviewForm";
import SendMessageForm from "@/components/form/SendMessageForm";
import Images from "@/components/Images";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
import { getBusinessesById } from "@/lib/actions/bussiness.action";
import { getReviews } from "@/lib/actions/review.action";
import { getUser } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params }: any) => {
  const business = await getBusinessesById(params.id);
  const parsedBusiness = JSON.parse(business).business;
  const { userId } = auth();
  const res = await getUser({ clerkId: userId });
  const user = JSON.parse(res);
  const reviews = await getReviews({ business: parsedBusiness._id.toString() });
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
                src={`/uploads/${parsedBusiness.brand_name}/${parsedBusiness.logo}`}
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
            <BookingForm
              user={user}
              paymentType={parsedBusiness.downPaymentType}
              downPayment={parsedBusiness.downPayment}
              businessId={parsedBusiness._id.toString()}
              businessPackages={parsedBusiness.packages}
            />
          </div>
        </div>
        <div className="my-4 h-[2px] w-full bg-gray-400 px-4"></div>
        <div className="grid grid-cols-2">
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
                {parsedBusiness.male_staff &&
                  parsedBusiness.female_staff &&
                  ","}
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
            <div>
              <h3 className="paragraph-semibold flex gap-2">
                <Image
                  src="/icons/cities_covered.svg"
                  alt="additional"
                  height={16}
                  width={16}
                />
                CITIES
              </h3>
              <div className="paragraph-regular flex gap-4 pl-6">
                {parsedBusiness.cities.map((c: any) => {
                  return (
                    <p
                      className="size-max rounded-md bg-primary-500 px-4 py-2 text-light-800"
                      key={c}
                    >
                      {c}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <h2 className="h2-bold mb-4">Contact Info</h2>
              <div>
                <h3 className="paragraph-semibold flex gap-2">
                  <Image
                    src="/icons/phone.png"
                    alt="phone"
                    height={16}
                    width={16}
                  />
                  CONTACT NUMBER
                </h3>
                <p className="paragraph-regular pl-6">
                  {parsedBusiness.contactNumber}
                </p>
              </div>
              <div>
                <h3 className="paragraph-semibold flex gap-2">
                  <Image
                    src="/icons/email.png"
                    alt="cancellation_policy"
                    height={16}
                    width={16}
                  />
                  BOOKING EMAIL
                </h3>
                <p className="paragraph-regular pl-6">
                  {parsedBusiness.booking_email}
                </p>
              </div>
              <div>
                <h3 className="paragraph-semibold flex gap-2">
                  <Image
                    src="/icons/insta.png"
                    alt="description"
                    height={16}
                    width={16}
                  />
                  <Link
                    className="transition-colors duration-300 hover:text-primary-500"
                    href={parsedBusiness.insta_link}
                  >
                    INSTAGRAM
                  </Link>
                </h3>
              </div>
            </div>
          </div>

          <div>
            <Images
              brand_name={parsedBusiness.brand_name}
              images={parsedBusiness.images}
            />
            <SendMessageForm
              businessEmail={parsedBusiness.booking_email}
              user={user}
            />
          </div>
          <div className="mt-8">
            <h3 className="h3-semibold mb-2">Packages</h3>
            <div className="flex flex-col gap-2">
              {parsedBusiness.packages.map((p: any) => {
                return (
                  <Accordion
                    type="single"
                    className="h-max w-[300px] rounded-lg bg-primary-900 px-2 text-light-800"
                    collapsible
                    key={p.packageName}
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="gap-4">
                        <div className="flex gap-2">
                          <p className="w-max">{p.packageName}</p>(
                          <p className="w-max self-end">{p.packagePrice}</p>)
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-wrap ">
                        {p.services}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </div>
          </div>
          <div>
            <DateVerification
              businessEmail={parsedBusiness.booking_email}
              user={user}
            />
          </div>
          <div className="col-span-2">
            <ReviewForm
              reviews={reviews}
              user={user}
              businessId={parsedBusiness._id.toString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
