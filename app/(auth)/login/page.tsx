"use client";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import GoogleCaptchaWrapper from "@/components/google-captcha-wrapper";
import axios from "axios";

const formSchema = z.object({
  phone: z
    .string()
    .min(12, "Phone number must be at least 10 digits")
    .max(20, "Phone number must be at least 20 digits"),
});

const Page = () => {
  return (
    <GoogleCaptchaWrapper>
      <LoginForm />
    </GoogleCaptchaWrapper>
  );
};

const LoginForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not available yet");
      return;
    }
    executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken: string) => {
      submitLoginForm(gReCaptchaToken, values.phone);
    });
    console.log(values);
  }
  const submitLoginForm = (gReCaptchaToken: string, phone: string) => {
    async function goAsync() {
      const response = await axios({
        method: "post",
        url: "/api/captcha",
        data: JSON.stringify({
          phone,
          gRecaptchaToken: gReCaptchaToken,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response?.data?.success === true) {
        console.log(response);
        // setNotification(`Success with score: ${response?.data?.score}`);
      } else {
        // setNotification(`Failure with score: ${response?.data?.score}`);
      }
    }
    goAsync().then(() => {}); // suppress typescript error
  };
  return (
    <div className="flex size-full min-h-screen flex-col items-center justify-center">
      <div className="mb-8 flex flex-col gap-4">
        <h2 className="h2-bold">
          Welcome to Rang <span className="text-primary-900">Mahal</span>
        </h2>
        <p className="paragraph-regular">Login or Sign up</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Phone Number <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder="Enter phone number"
                    {...field}
                    className="[&>input]:border-b-2 [&>input]:text-gray-400 [&>input]:outline-none [&>input]:transition-colors [&>input]:duration-300 focus:[&>input]:border-primary-900"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-8">
            <Link
              href="/"
              className="rounded-full bg-gray-300 px-4 py-2 transition-colors duration-300 hover:bg-gray-400"
            >
              Cancel
            </Link>
            <Button
              type="submit"
              className="rounded-full bg-primary-900 text-light-800 transition-colors duration-300 hover:bg-primary-500"
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
