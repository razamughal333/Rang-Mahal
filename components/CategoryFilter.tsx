"use client";
import React, { useEffect, useState } from "react";

import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "./ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function CategoryFilters({ filters }: any) {
  const [cities, setCities] = useState<string[]>([""]);
  const [staffs, setStaff] = useState<string[]>([""]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const newCities = cities.join(",");
    if (cities[0] !== "" || newCities !== ",") {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "cities",
        value: newCities,
      });
      router.push(newUrl, { scroll: false });
    }
  }, [cities]);
  useEffect(() => {
    const newStaff = staffs.join(",");
    if (staffs[0] !== "" || newStaff !== ",") {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "staff",
        value: newStaff,
      });
      router.push(newUrl, { scroll: false });
    }
  }, [staffs]);
  function handleSetCities(e: any, city: string) {
    if (e) {
      if (!cities.includes(city)) {
        setCities([...cities, city]);
      }
    } else {
      const newCities = cities.filter((element) => element !== city);
      setCities(newCities);
    }
  }
  function handleSetStaff(e: any, staff: string) {
    if (e) {
      if (!staffs.includes(staff)) {
        setStaff([...staffs, staff]);
      }
    } else {
      const newStaff = staffs.filter((element) => element !== staff);
      setStaff(newStaff);
    }
  }
  return (
    <>
      <div className="w-[250px]">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-0">
            <AccordionTrigger>Filters</AccordionTrigger>
            <AccordionContent className="pl-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>City</AccordionTrigger>
                  <AccordionContent className="grid grid-cols-2">
                    <div className="flex gap-2">
                      <Checkbox
                        className="border-gray-900"
                        id="Karachi"
                        onCheckedChange={(e) => handleSetCities(e, "Karachi")}
                      />
                      <label htmlFor="Karachi">Karachi</label>
                    </div>
                    <div className="flex gap-2">
                      <Checkbox
                        className="border-gray-900"
                        id="Lahore"
                        onCheckedChange={(e) => handleSetCities(e, "Lahore")}
                      />
                      <label htmlFor="Lahore">Lahore</label>
                    </div>
                    <div className="flex gap-2">
                      <Checkbox
                        className="border-gray-900"
                        id="Islamabad"
                        onCheckedChange={(e) => handleSetCities(e, "Islamabad")}
                      />
                      <label htmlFor="Islamabad">Islamabad</label>
                    </div>
                    <div className="flex gap-2">
                      <Checkbox
                        className="border-gray-900"
                        id="Rawalpindi"
                        onCheckedChange={(e) =>
                          handleSetCities(e, "Rawalpindi")
                        }
                      />
                      <label htmlFor="Rawalpindi">Rawalpindi</label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Staff</AccordionTrigger>
                  <AccordionContent className="grid grid-cols-2">
                    <div className="flex gap-2">
                      <Checkbox
                        className="border-gray-900"
                        id="male"
                        onCheckedChange={(e) => handleSetStaff(e, "male")}
                      />
                      <label htmlFor="male">Male</label>
                    </div>
                    <div className="flex gap-2">
                      <Checkbox
                        className="border-gray-900"
                        id="female"
                        onCheckedChange={(e) => handleSetStaff(e, "female")}
                      />
                      <label htmlFor="female">Female</label>
                    </div>
                    <div className="flex gap-2">
                      <Checkbox
                        className="border-gray-900"
                        id="transgender"
                        onCheckedChange={(e) =>
                          handleSetStaff(e, "transgender")
                        }
                      />
                      <label htmlFor="transgender">Transgender</label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

export default CategoryFilters;
