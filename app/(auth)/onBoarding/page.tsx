"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import Link from "next/link";
import { TABS } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/components/tabs/Schema";

import { Form } from "@/components/ui/form";
import AccountTab from "@/components/tabs/AccountTab";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import BusinessTypeTab from "@/components/tabs/BusinessTypeTab";
import PersonalDetailsTab from "@/components/tabs/PersonalDetailsTab";
import ContactDetailsTab from "@/components/tabs/ContactDetailsTab";
import BusinessDetailsTab from "@/components/tabs/BusinessDetailsTab";
import PackagesTab from "@/components/tabs/PackagesTab";
import { useToast } from "@/components/ui/use-toast";
import { createBusiness } from "@/lib/actions/bussiness.action";

const Page = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountType: "",
      category: "",
      full_name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
      contactNumber: "",
      secondaryContactNumber: "",
      insta_link: "",
      fb_link: "",
      logo: "",
      brand_name: "",
      booking_email: "",
      web: "",
      city: "",
      office_address: "",
      office_google_link: "",
      cities: [],
      male_staff: false,
      female_staff: false,
      transgender_staff: false,
      minPrice: 0,
      description: "",
      additionalInfo: "",
      downPayment: 0,
      downPaymentType: "",
      refundable: "",
      packages: [
        {
          packageName: "",
          packagePrice: 0,
          services: "",
        },
      ],
      images: [],
    },
  });
  function decrementCurrentTab() {
    if (!(currentTab === 0)) {
      setCurrentTab(currentTab - 1);
    }
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (values.accountType === "customer") {
      router.push("/login");
    }
    console.log(values);
    // if (values.accountType === "" && currentTab === 0) {
    //   toast({
    //     variant: "destructive",
    //     title: "Invalid selection",
    //     description: "Please select a account type",
    //   });
    //   return;
    // }
    // if (values.category === "" && currentTab === 1) {
    //   toast({
    //     variant: "destructive",
    //     title: "Invalid selection",
    //     description: "Please select a category",
    //   });
    //   return;
    // }
    // if (
    //   (values.full_name === "" ||
    //     values.email === "" ||
    //     values.phone === "" ||
    //     values.password === "" ||
    //     values.confirmPassword === "") &&
    //   currentTab === 2
    // ) {
    //   toast({
    //     variant: "destructive",
    //     title: "Invalid selection",
    //     description: "Please provide all the required fields",
    //   });
    //   return;
    // }
    // if (values.password !== values.confirmPassword && currentTab === 2) {
    //   toast({
    //     variant: "destructive",
    //     description: "password doesn't match",
    //   });
    //   return;
    // }
    // const regex = /(?=.*\d)(?=.*[!@#$%^&*])/;
    // if (!regex.test(values.password) && currentTab === 2) {
    //   toast({
    //     variant: "destructive",
    //     description:
    //       "password should contain atleast 1 digit and 1 special character",
    //   });
    //   return;
    // }
    // if (values.terms === false && currentTab === 2) {
    //   toast({
    //     variant: "destructive",
    //     description: "Please accept the terms",
    //   });
    //   return;
    // }
    // if (
    //   (values.brand_name === "" ||
    //     values.contactNumber === "" ||
    //     values.insta_link === "" ||
    //     values.booking_email === "" ||
    //     values.city === "") &&
    //   currentTab === 3
    // ) {
    //   toast({
    //     variant: "destructive",
    //     title: "Invalid selection",
    //     description: "Please provide all the required fields",
    //   });
    //   return;
    // }
    // if (
    //   (values.cities.length === 0 ||
    //     values.male_staff === false ||
    //     values.female_staff === false ||
    //     values.transgender_staff === false ||
    //     values.minPrice === 0 ||
    //     values.refundable === "" ||
    //     values.description === "") &&
    //   currentTab === 4
    // ) {
    //   toast({
    //     variant: "destructive",
    //     title: "Invalid selection",
    //     description: "Please provide all the required fields",
    //   });
    //   return;
    // }
    const logo = new FormData();
    const images = new FormData();
    logo.append("file", values.logo);
    Object.values(values.images).forEach((file) => {
      images.append("file", file);
    });
    if (!(currentTab === TABS.length - 1)) {
      setCurrentTab(currentTab + 1);
    } else {
      const res = await createBusiness({
        business: JSON.stringify({ ...values, logo }),
        logo,
        images,
        rePath: "/",
      });
      console.log(res);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs
          value={TABS[currentTab]}
          className="flex h-full min-h-screen flex-col items-center gap-10"
        >
          <div className="mr-4 mt-4 self-end">
            <p>Having trouble?</p>
            <Link href="/contact=us" className="font-medium text-primary-900">
              Get Help
            </Link>
          </div>
          <TabsContent value="account" className="h-full">
            <AccountTab form={form} />
          </TabsContent>
          <TabsContent className="w-full" value="businessType">
            <BusinessTypeTab form={form} />
          </TabsContent>
          <TabsContent value="personal_details">
            <PersonalDetailsTab form={form} />
          </TabsContent>
          <TabsContent value="contact_details">
            <ContactDetailsTab form={form} />
          </TabsContent>
          <TabsContent value="business_details">
            <BusinessDetailsTab form={form} />
          </TabsContent>
          <TabsContent value="packages">
            <PackagesTab form={form} />
          </TabsContent>
          <div className="flex gap-8 py-2 max-2xs:flex-col-reverse">
            {currentTab <= 2 && (
              <span>
                <p>Already a member? </p>
                <Link href="/login" className="text-primary-900">
                  Login
                </Link>
              </span>
            )}
            <TabsList className={`flex ${currentTab > 2 ? "gap-12" : "gap-6"}`}>
              {currentTab <= 1 ? (
                <Link
                  href="/"
                  className="rounded-full bg-gray-300 px-4 py-2 transition-colors duration-300 hover:bg-gray-400/80"
                >
                  Cancel
                </Link>
              ) : (
                <Button
                  type="button"
                  className="rounded-full bg-gray-300 px-4 py-2 transition-colors duration-300 hover:bg-gray-400/80"
                  onClick={() => decrementCurrentTab()}
                >
                  Back
                </Button>
              )}

              <Button
                type="submit"
                className="rounded-full bg-primary-900 px-8 text-light-800 transition-colors duration-300 hover:bg-primary-500"
              >
                {currentTab === TABS.length - 1 ? "Submit" : "Next"}
              </Button>
            </TabsList>
          </div>
        </Tabs>
      </form>
    </Form>
  );
};

export default Page;
