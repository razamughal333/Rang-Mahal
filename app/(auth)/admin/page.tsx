"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { vendorFormSchema } from "@/components/tabs/Schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { authenticateAdmin } from "@/lib/actions/admin.action";

const Page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof vendorFormSchema>>({
    resolver: zodResolver(vendorFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof vendorFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (values.email === "" && values.password === "") {
      toast({
        variant: "destructive",
        title: "Invalid Credentials",
        description: "Please provide your credentials",
      });
    }
    const res = await authenticateAdmin(values.email, values.password);
    const parsedRes = JSON.parse(res);
    if (!parsedRes.success) {
      toast({
        variant: "destructive",
        title: "Invalid Credentials",
        description: "Please provide valid credentials",
      });
    } else {
      router.push(`/adminPanel`);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-center h-screen w-full flex-col gap-4"
      >
        <h2 className="h2-semibold mb-3">Admin Panel</h2>
        <p className="paragraph-regular mb-3">Enter admin credentials</p>
        <div className="flex flex-col items-center justify-center gap-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative ">
                <FormControl>
                  <Input
                    placeholder=""
                    type="email"
                    className="form-input peer"
                    {...field}
                  />
                </FormControl>
                <FormLabel className="form-input-label peer-focus:text-xs">
                  Email
                </FormLabel>
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
                    type="password"
                    placeholder=""
                    className="form-input peer"
                    {...field}
                  />
                </FormControl>
                <FormLabel className="form-input-label peer-focus:text-xs">
                  Password
                </FormLabel>
              </FormItem>
            )}
          />
          <Button className="h-max rounded-3xl bg-primary-900 px-6 py-2 text-light-900 duration-300 hover:bg-primary-500">
            Log in
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Page;
