"use client";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { businessTypes } from "@/lib/constants";

const BusinessTypeTab = ({ form, edit }: any) => {
  return (
    <div className="flex-center h-full flex-col gap-8">
      <h1 className="h3-bold">
        {edit ? "" : "Join "}Rang{" "}
        <span className="text-primary-900">Mahal</span>
      </h1>
      <p>{edit ? "Edit your Business" : "What is your line of business?"}</p>
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem className="flex ">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-wrap justify-center gap-20 px-6 max-sm:gap-12"
              >
                {businessTypes.map(({ imgUrl, title, value }) => {
                  return (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0"
                      key={title}
                    >
                      <FormLabel
                        className={`flex-center size-32 cursor-pointer flex-col gap-4 rounded-lg border border-gray-300 text-sm font-semibold  ${field.value === title ? " bg-primary-900 text-light-800" : ""}`}
                      >
                        <Image
                          src={imgUrl}
                          alt={title}
                          width={48}
                          height={48}
                          className={`${field.value === title ? "icon-filter" : ""}`}
                        />
                        {title}
                      </FormLabel>
                      <FormControl>
                        <RadioGroupItem
                          value={value}
                          className="invisible absolute"
                        />
                      </FormControl>
                    </FormItem>
                  );
                })}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default BusinessTypeTab;
