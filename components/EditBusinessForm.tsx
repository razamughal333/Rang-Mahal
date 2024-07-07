"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import Link from "next/link";
import { VENDORTABS } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/components/tabs/Schema";

import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import BusinessTypeTab from "@/components/tabs/BusinessTypeTab";
import PersonalDetailsTab from "@/components/tabs/PersonalDetailsTab";
import ContactDetailsTab from "@/components/tabs/ContactDetailsTab";
import BusinessDetailsTab from "@/components/tabs/BusinessDetailsTab";
import PackagesTab from "@/components/tabs/PackagesTab";
import { useToast } from "@/components/ui/use-toast";
import { editBusiness } from "@/lib/actions/bussiness.action";

const EditBusinessForm = ({ business, id }: any) => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountType: business.accountType || "",
      category: business.category || "",
      full_name: business.full_name || "",
      email: business.email || "",
      phone: business.phone || "",
      password: "",
      confirmPassword: business.confirmPassword || "",
      terms: business.terms || false,
      contactNumber: business.contactNumber || "",
      secondaryContactNumber: business.secondaryContactNumber || "",
      insta_link: business.insta_link || "",
      fb_link: business.fb_link || "",
      logo: business.logo || "",
      brand_name: business.brand_name || "",
      booking_email: business.booking_email || "",
      web: business.web || "",
      city: business.city || "",
      office_address: business.office_address || "",
      office_google_link: business.office_google_link || "",
      cities: business.cities || [],
      male_staff: business.male_staff || false,
      female_staff: business.female_staff || false,
      transgender_staff: business.transgender_staff || false,
      minPrice: business.minPrice?.toString() || "",
      description: business.description || "",
      additionalInfo: business.additionalInfo || "",
      downPayment: business.downPayment?.toString() || "",
      downPaymentType: business.downPaymentType || "percentage",
      refundable: business.refundable || "",
      packages: business.packages || [
        {
          packageName: "",
          packagePrice: "",
          services: "",
        },
      ],
      images: business.images || [],
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
    console.log(values);
    if (values.category === "" && currentTab === 0) {
      toast({
        variant: "destructive",
        title: "Invalid selection",
        description: "Please select a category",
      });
      return;
    }
    if (
      (values.full_name === "" || values.email === "" || values.phone === "") &&
      currentTab === 1
    ) {
      toast({
        variant: "destructive",
        title: "Invalid selection",
        description: "Please provide all the required fields",
      });
      return;
    }
    if (values.password !== values.confirmPassword && currentTab === 1) {
      toast({
        variant: "destructive",
        description: "password doesn't match",
      });
      return;
    }
    const regex = /(?=.*\d)(?=.*[!@#$%^&*])/;
    if (
      !regex.test(values.password) &&
      values.password !== "" &&
      currentTab === 1
    ) {
      toast({
        variant: "destructive",
        description:
          "password should contain atleast 1 digit and 1 special character",
      });
      return;
    }
    if (values.terms === false && currentTab === 1) {
      toast({
        variant: "destructive",
        description: "Please accept the terms",
      });
      return;
    }
    if (
      (values.brand_name === "" ||
        values.contactNumber === "" ||
        values.insta_link === "" ||
        values.booking_email === "" ||
        values.city === "") &&
      currentTab === 2
    ) {
      toast({
        variant: "destructive",
        title: "Invalid selection",
        description: "Please provide all the required fields",
      });
      return;
    }
    if (
      (values.cities.length === 0 ||
        (values.male_staff === false &&
          values.female_staff === false &&
          values.transgender_staff === false) ||
        values.minPrice === "" ||
        values.refundable === "" ||
        values.description === "") &&
      currentTab === 3
    ) {
      toast({
        variant: "destructive",
        title: "Invalid selection",
        description: "Please provide all the required fields",
      });
      return;
    }
    const logo = new FormData();
    const images = new FormData();
    logo.append("file", values.logo);
    Object.values(values.images).forEach((file) => {
      images.append("file", file);
    });
    if (!(currentTab === VENDORTABS.length - 1)) {
      setCurrentTab(currentTab + 1);
    } else {
      const res = await editBusiness({
        business: JSON.stringify({ ...values, logo }),
        logo,
        images,
        rePath: "/services",
        id,
      });
      const parsedRes = JSON.parse(res);
      console.log(parsedRes);
      if (parsedRes!.success) {
        toast({
          variant: "default",
          description: "Business edited successfully",
        });
        router.push(`/service/${parsedRes!.business._id}`);
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs
          value={VENDORTABS[currentTab]}
          className="mt-12 flex h-full min-h-screen flex-col items-center gap-10"
        >
          <TabsContent className="w-full" value="businessType">
            <BusinessTypeTab form={form} edit={true} />
          </TabsContent>
          <TabsContent value="personal_details">
            <PersonalDetailsTab form={form} edit={true} />
          </TabsContent>
          <TabsContent value="contact_details">
            <ContactDetailsTab form={form} />
          </TabsContent>
          <TabsContent value="business_details">
            <BusinessDetailsTab form={form} edit={true} />
          </TabsContent>
          <TabsContent value="packages">
            <PackagesTab form={form} />
          </TabsContent>
          <div className="flex gap-8 py-2 max-2xs:flex-col-reverse">
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
                {currentTab === VENDORTABS.length - 1 ? "Edit" : "Next"}
              </Button>
            </TabsList>
          </div>
        </Tabs>
      </form>
    </Form>
  );
};

export default EditBusinessForm;
