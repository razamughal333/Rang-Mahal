import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { socialDetails } from "@/lib/constants";
import Image from "next/image";

const ContactDetailsTab = ({ form }: any) => {
  const setLogo = (e: any) => {
    let files = e.target.files;

    files = Array.from(files);
    console.log(files);
    form.setValue("logo", files[0]);
  };
  return (
    <div className="flex flex-col gap-6 px-6">
      <h2 className="h2-bold">Contact Details</h2>
      <div className="flex items-center gap-4">
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="file"
                  accept=".png,.jpg,.svg,.jpeg"
                  className="hidden"
                  onChange={(e) => setLogo(e)}
                />
              </FormControl>
              <FormLabel className="cursor-pointer text-center text-xs text-gray-400">
                <Image
                  src="/icons/upload.svg"
                  alt="upload"
                  className="mx-auto"
                  width={64}
                  height={64}
                />
                Pick a logo
              </FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brand_name"
          render={({ field }) => (
            <FormItem className="relative ">
              <FormControl>
                <Input placeholder="" className="form-input peer" {...field} />
              </FormControl>
              <FormLabel className="form-input-label peer-focus:text-xs">
                Brand Name
                <span className="text-red-600/50">*</span>
              </FormLabel>
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-4 max-xs:flex-col">
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-400">
                Contact Number <span className="text-red-600">*</span>
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
          name="secondaryContactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-400">
                Secondary Contact Number
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
      </div>
      <div className="flex flex-col gap-4">
        <p>
          Enter your social links<span className="text-red-600/50">*</span>
        </p>
        {socialDetails.map(({ id, title, formName, required }: any) => {
          return (
            <FormField
              key={id}
              control={form.control}
              name={formName}
              render={({ field }) => (
                <FormItem className="relative ">
                  <FormControl>
                    <Input
                      placeholder=""
                      className="form-input peer"
                      {...field}
                    />
                  </FormControl>
                  <FormLabel className="form-input-label peer-focus:text-xs">
                    {title}
                    {required && <span className="text-red-600/50">*</span>}
                  </FormLabel>
                </FormItem>
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ContactDetailsTab;
