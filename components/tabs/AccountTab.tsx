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

const AccountTab = ({ form }: any) => {
  return (
    <div className="flex-center h-full flex-col gap-8">
      <h1 className="h3-bold">
        Join Rang <span className="text-primary-900">Mahal</span>
      </h1>
      <p>How to sign up?</p>
      <FormField
        control={form.control}
        name="accountType"
        render={({ field }) => (
          <FormItem className="flex ">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-20 space-y-1 max-2xs:flex-col"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormLabel
                    className={`flex-center size-32 cursor-pointer flex-col gap-4 rounded-lg border border-gray-300 text-sm font-semibold  ${field.value === "customer" ? "bg-primary-900 text-light-800" : ""}`}
                  >
                    <Image
                      src="/icons/buyer.svg"
                      alt="buyer"
                      width={48}
                      height={48}
                      className={`${field.value === "customer" ? "icon-filter" : ""}`}
                    />
                    As a buyer
                  </FormLabel>
                  <FormControl>
                    <RadioGroupItem
                      value="customer"
                      className="invisible absolute"
                    />
                  </FormControl>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormLabel
                    className={`flex-center size-32 cursor-pointer flex-col gap-4 rounded-lg border border-gray-300 text-sm font-semibold ${field.value === "seller" ? " bg-primary-900 text-light-800" : ""}`}
                  >
                    <Image
                      src="/icons/seller.svg"
                      alt="seller"
                      width={48}
                      height={48}
                      className={`${field.value === "seller" ? "icon-filter" : ""}`}
                    />
                    Business Owner
                  </FormLabel>
                  <FormControl>
                    <RadioGroupItem
                      value="seller"
                      className="invisible absolute"
                    />
                  </FormControl>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default AccountTab;
