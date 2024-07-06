import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";

const PersonalDetailsTab = ({ form }: any) => {
  return (
    <div className="flex flex-col gap-6 px-6">
      <h2 className="h2-bold">Personal Details</h2>
      <p className="text-sm">
        Listing your business is only a few steps away.
        <br /> Enter your following info.
      </p>
      <FormField
        control={form.control}
        name="full_name"
        render={({ field }) => (
          <FormItem className="relative ">
            <FormControl>
              <Input className="form-input peer" placeholder="" {...field} />
            </FormControl>
            <FormLabel className="form-input-label peer-focus:text-xs">
              Full Name
              <span className="text-red-600/50">*</span>
            </FormLabel>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="relative ">
            <FormControl>
              <Input placeholder="" className="form-input peer" {...field} />
            </FormControl>
            <FormLabel className="form-input-label">
              Email<span className="text-red-600/50">*</span>
            </FormLabel>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-400">
              Phone Number <span className="text-red-600">*</span>
            </FormLabel>
            <FormControl>
              <PhoneInput
                placeholder="Enter phone number"
                {...field}
                className="[&>input]:w-full [&>input]:border-b-2 [&>input]:text-gray-400 [&>input]:outline-none [&>input]:transition-colors [&>input]:duration-300 focus:[&>input]:border-primary-900"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem className="relative ">
            <FormControl>
              <Input
                placeholder=""
                type="password"
                className="form-input peer"
                {...field}
              />
            </FormControl>
            <FormLabel className="form-input-label peer-focus:text-xs">
              Password<span className="text-red-600/50">*</span>
            </FormLabel>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem className="relative ">
            <FormControl>
              <Input
                placeholder=""
                type="password"
                className="form-input peer"
                {...field}
              />
            </FormControl>
            <FormLabel className="form-input-label peer-focus:text-xs">
              Retype Password<span className="text-red-600/50">*</span>
            </FormLabel>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="terms"
        render={({ field }) => (
          <FormItem className="flex  items-center gap-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="!mt-0 cursor-pointer text-xs">
              Agree to{" "}
              <Link href="/terms" className="text-primary-900 hover:underline">
                Terms & Conditions
              </Link>
            </FormLabel>
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalDetailsTab;
