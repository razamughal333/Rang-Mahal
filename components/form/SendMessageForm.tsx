"use client";

import { z } from "zod";

import React from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import emailjs from "@emailjs/browser";

const formSchema = z.object({
  message: z.string(),
  subject: z.string(),
});

const SendMessageForm = ({ businessEmail, user }: any) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      subject: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.message === "") {
      toast({
        title: "Invalid Message",
        description: "message can't be empty",
        variant: "default",
      });
      return null;
    }
    if (!user) {
      toast({
        variant: "default",
        description: "You must be logged in to submit a review",
      });
      return;
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
      to_email: businessEmail,
      message: values.message,
      name: user.username,
      subject: values.subject,
      from_email: user.email,
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
  }
  return (
    <Dialog>
      <DialogTrigger className="h-max rounded-3xl bg-primary-900 px-6 py-2 text-light-900 duration-300 hover:bg-primary-500">
        Send Message
      </DialogTrigger>
      <DialogContent className="bg-light-900">
        <h1 className="h3-bold">Send a message to a business owner</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="subject"
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
                    Subject
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="relative ">
                  <FormControl>
                    <Textarea
                      placeholder=""
                      className="form-input peer resize-none focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormLabel className="form-input-label peer-focus:text-xs">
                    Message
                  </FormLabel>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="h-max rounded-3xl bg-primary-900 px-6 py-2 text-light-900 duration-300 hover:bg-primary-500"
            >
              Send
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SendMessageForm;
