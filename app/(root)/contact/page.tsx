/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import emailjs from "@emailjs/browser";

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(30, { message: "Name must not be longer than 30 characters." }),

  email: z
    .string({ required_error: "Please select an email to display." })
    .email(),

  phone: z
    .string()
    .min(9, { message: "Phone number must be at least 9 characters." })
    .max(15, {
      message: "Phone number must not be longer than 15 characters.",
    }),

  message: z.string().max(160).min(4),

  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const defaultValues: Partial<ContactFormValues> = {
  name: "",
  email: "",
  message: "",
  phone: "",
};

const ContactForm = () => {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const submitForm = async (data: ContactFormValues) => {
    if (data.message === "") {
      toast({
        title: "Invalid Message",
        description: "message can't be empty",
        variant: "default",
      });
      return null;
    }
    const OPTIONS = {
      publicKey: "WwM_Fy0_mS8IhqhFG",
      // Do not allow headless browsers
      blockHeadless: true,
      blockList: {
        // Block the suspended emails
        list: [],
        watchVariable: "userEmail",
      },
      limitRate: {
        id: "app",
        throttle: 10000,
      },
    };
    const templateParams = {
      to_email: "tahirumair861@gmail.com",
      message: data.message,
      name: data.name,
      phone: data.phone,
      from_email: data.email,
    };

    emailjs
      .send("service_ftefxpj", "template_h4so4hd", templateParams, OPTIONS)
      .then(
        (response) => {
          toast({
            variant: "default",
            description: "Your message has been received",
          });
        },
        (error) => {
          console.log(error);
          toast({
            variant: "destructive",
            description: "Your message was not able to be send",
          });
        }
      );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="my-20 w-full max-w-lg rounded bg-white p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Contact Us</h2>
        <p className="mb-6">
          Hey! Leave a message and we'll get back to you ASAP.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your Name"
                      autoComplete="true"
                      {...field}
                      className="w-full rounded border p-2"
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter your full name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      autoComplete="true"
                      {...field}
                      className="w-full rounded border p-2"
                    />
                  </FormControl>
                  <FormDescription>
                    We'll never share your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <span className="flex items-center rounded-l border bg-gray-200 p-2">
                        +92
                      </span>
                      <Input
                        type="tel"
                        placeholder="Your Phone"
                        autoComplete="true"
                        {...field}
                        className="w-full rounded-r border p-2"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Please enter a valid phone number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your Message"
                      {...field}
                      className="w-full resize-none rounded border p-2"
                      autoComplete="true"
                    />
                  </FormControl>
                  <FormDescription>
                    Feel free to ask us anything.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-full rounded bg-primary-500 p-2 text-white hover:bg-primary-900 hover:text-light-700"
              >
                Send
              </Button>
            </div>
          </form>
        </Form>
        <p className="mt-4 text-gray-600">
          You may also contact us at{" "}
          <span className="font-bold text-primary-500">03470855791</span>
        </p>
      </div>
    </div>
  );
};

export default ContactForm;
