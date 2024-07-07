import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import "react-phone-number-input/style.css";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CITIES, STAFF } from "@/lib/constants";
import { Badge } from "../ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "../ui/radio-group";
import { useToast } from "../ui/use-toast";

const BusinessDetailsTab = ({ form }: any) => {
  const { toast } = useToast();
  const handleSelectCity = (city: string, field: any) => {
    const cityValue = city.trim();
    if (cityValue !== "") {
      if (!field.value.includes(cityValue as never)) {
        form.setValue("cities", [...field.value, cityValue]);
      }
    } else {
      form.trigger();
    }
  };
  const handleTagRemove = (city: string, field: any) => {
    const newTags = field.value.filter((t: string) => city !== t);
    form.setValue("cities", newTags);
  };
  const selectFiles = (e: any) => {
    let files = e.target.files;
    if (files.length > 30) {
      toast({
        variant: "destructive",
        description: "Can't upload images more than 30",
      });
      return null;
    }
    files = Array.from(files);
    form.setValue("images", files);
  };
  return (
    <div className="flex flex-col gap-6 px-6">
      <h2 className="h2-bold">Business Details</h2>
      <p>
        Want to start your business with us?
        <br />
        Enter your following info below
      </p>
      <div>
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept=".png,.jpg,.svg,.jpeg"
                  className="hidden"
                  onChange={(e) => selectFiles(e)}
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
                Upload images upto 30
              </FormLabel>
            </FormItem>
          )}
        />
        <FormMessage />
        <FormField
          control={form.control}
          name="cities"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="text-gray-400">
                Cities Covered
                <span className="text-red-600/50">*</span>
              </FormLabel>
              <Select
                value=""
                onValueChange={(city) => handleSelectCity(city, field)}
              >
                <FormControl>
                  <>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Cities" />
                    </SelectTrigger>
                    <div className="flex-start mt-2.5 gap-2.5">
                      {field.value.length > 0 &&
                        field.value.map((city: any) => (
                          <Badge
                            key={city}
                            className="subtle-medium background-light800_dark300 text-dark400_light500 flex items-center justify-center gap-2 rounded-md border-none  px-4 py-2 capitalize"
                            onClick={() => handleTagRemove(city, field)}
                          >
                            {city}
                            <Image
                              src="/icons/close.svg"
                              alt="Close icon"
                              width={12}
                              height={12}
                              className="cursor-pointer object-contain invert-0 hover:invert-[50%]"
                            />
                          </Badge>
                        ))}
                    </div>
                  </>
                </FormControl>
                <SelectContent className="bg-light-850">
                  {CITIES.map(({ title, value }: any) => {
                    return (
                      <SelectItem
                        key={title}
                        value={value}
                        className="cursor-pointer transition-colors duration-300 hover:bg-primary-500 hover:text-light-850"
                      >
                        {title}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
      <div>
        <p className="text-gray-400">
          Staff <span className="text-red-600/50">*</span>
        </p>
        <div className="flex gap-2">
          {STAFF.map(({ imgUrl, fieldName, title }) => (
            <FormField
              key={title}
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="checkbox" className="peer hidden" {...field} />
                  </FormControl>
                  <FormLabel className="flex-center peer-checked:[&>div>img]:icon-filter  w-max cursor-pointer gap-2 rounded-md border border-solid border-gray-400 py-1 pl-1 pr-4 peer-checked:border-primary-900 peer-checked:text-primary-900 peer-checked:[&>div]:bg-primary-900">
                    <div className="rounded-md p-2">
                      <Image
                        src={imgUrl}
                        alt="male icon"
                        width={12}
                        height={12}
                        className="!size-[16px] cursor-pointer object-contain"
                      />
                    </div>
                    {title}
                  </FormLabel>
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>
      <FormField
        control={form.control}
        name="minPrice"
        render={({ field }) => (
          <FormItem className="relative ">
            <FormControl>
              <Input placeholder="" className="form-input peer" {...field} />
            </FormControl>
            <FormLabel className="form-input-label peer-focus:text-xs">
              Minimum Price
              <span className="text-red-600/50">*</span>
            </FormLabel>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="relative ">
            <FormControl>
              <Textarea
                placeholder=""
                className="form-input peer resize-none ring-0 ring-transparent"
                {...field}
              />
            </FormControl>
            <FormLabel className="form-input-label peer-focus:text-xs">
              Description
              <span className="text-red-600/50">*</span>
            </FormLabel>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="additionalInfo"
        render={({ field }) => (
          <FormItem className="relative ">
            <FormControl>
              <Textarea
                placeholder=""
                className="form-input peer resize-none ring-0 ring-transparent"
                {...field}
              />
            </FormControl>
            <FormLabel className="form-input-label peer-focus:text-xs">
              Additional Info
            </FormLabel>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="downPaymentType"
        render={({ field }) => (
          <FormItem className="relative ">
            <FormLabel className="text-gray-400">Down Payment Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-light-850">
                <SelectItem
                  value="percentage"
                  className="cursor-pointer transition-colors duration-300 hover:bg-primary-500 hover:text-light-850"
                >
                  Percentage
                </SelectItem>
                <SelectItem
                  value="fixed"
                  className="cursor-pointer transition-colors duration-300 hover:bg-primary-500 hover:text-light-850"
                >
                  Fixed Amount
                </SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="downPayment"
        render={({ field }) => (
          <FormItem className="relative ">
            <FormControl>
              <Input
                placeholder=""
                type="number"
                className="form-input peer"
                {...field}
              />
            </FormControl>
            <FormLabel className="form-input-label peer-focus:text-xs">
              Down Payment
            </FormLabel>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="refundable"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-gray-400">
              Refundable<span className="text-red-600/50">*</span>
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-2 space-y-1"
              >
                <FormItem className="w-max space-x-3  space-y-0">
                  <FormControl>
                    <RadioGroupItem
                      value="refundable"
                      className="peer hidden"
                    />
                  </FormControl>
                  <FormLabel className="flex items-center gap-4 rounded-full border border-solid border-gray-400 px-4 py-2 font-normal text-gray-400 peer-aria-checked:border-primary-500 peer-aria-checked:text-primary-500 peer-aria-checked:[&>div]:bg-primary-500">
                    <div className="size-2 rounded-full bg-gray-400 "></div>
                    REFUNDABLE
                  </FormLabel>
                </FormItem>
                <FormItem className="w-max space-x-3  space-y-0">
                  <FormControl>
                    <RadioGroupItem
                      value="non-refundable"
                      className="peer hidden"
                    />
                  </FormControl>
                  <FormLabel className="flex items-center gap-4 rounded-full border border-solid border-gray-400 px-4 py-2 font-normal text-gray-400 peer-aria-checked:border-primary-500 peer-aria-checked:text-primary-500 peer-aria-checked:[&>div]:bg-primary-500">
                    <div className="size-2 rounded-full bg-gray-400 "></div>
                    NON-REFUNDABLE
                  </FormLabel>
                </FormItem>
                <FormItem className="w-max space-x-3  space-y-0">
                  <FormControl>
                    <RadioGroupItem
                      value="partially refundable"
                      className="peer hidden"
                    />
                  </FormControl>
                  <FormLabel className="flex items-center gap-4 rounded-full border border-solid border-gray-400 px-4 py-2 font-normal text-gray-400 peer-aria-checked:border-primary-500 peer-aria-checked:text-primary-500 peer-aria-checked:[&>div]:bg-primary-500">
                    <div className="size-2 rounded-full bg-gray-400 "></div>
                    PARTIALLY REFUNDABLE
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default BusinessDetailsTab;
