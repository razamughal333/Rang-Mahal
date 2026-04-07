"use client";
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "./ui/button";
import emailjs from "@emailjs/browser";
import { useToast } from "./ui/use-toast";

const DateVerification = ({ businessEmail, user }: any) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const { toast } = useToast();
  function checkAvailability() {
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
      from_email: user.email,
      date: date?.toLocaleString(),
    };

    emailjs
      .send("service_ftefxpj", "template_9j28etw", templateParams, OPTIONS)
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
    <div className="flex flex-col gap-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="size-max rounded-md border"
      />
      <div>
        <Button
          className="h-max rounded-3xl bg-primary-900 px-6 py-2 text-light-900 duration-300 hover:bg-primary-500"
          onClick={() => {
            checkAvailability();
          }}
        >
          Check Availability
        </Button>
      </div>
    </div>
  );
};

export default DateVerification;
