"use client";

import { z } from "zod";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { createBooking } from "@/lib/actions/booking.action";
import { useToast } from "../ui/use-toast";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutCredits } from "@/lib/actions/checkout.action";

const formSchema = z.object({
  bookingName: z.string(),
  date: z.date(),
  package: z.string(),
});

const BookingForm = ({ user, businessPackages, businessId,paymentType,downPayment }: any) => {
  const { toast } = useToast();
  useEffect(() => {
    loadStripe(
      "pk_test_51Pb8SwCBaXXOnaL8wv7kqwrT0vgHEjQTktnfK2lMREguc4MGL0MyiNMFOXiSuOyf8JUDjQuptBrohBUL9Tw3AFj1003NWR4tao"
    );
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookingName: "",
      date: new Date(),
      package: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast({
        variant: "default",
        description: "Please sign in first",
      });
      return;
    }
    const userId = user?.id;
    if (values.package === "") {
      toast({
        variant: "default",
        description: "Please select a package",
      });
      return;
    }
    const newBooking = await createBooking({
      user: userId,
      business: businessId,
      pack: businessPackages[Number(values.package)],
    });
    try {
      const price=Number(businessPackages[Number(values.package)].packagePrice)
      let newPrice=0;
      if(paymentType==="percentage"){
        newPrice=downPayment*(price/100)
      }else{
        newPrice=Number(downPayment)
      }
      await checkoutCredits(
        newPrice
      );
    } catch (err) {
      toast({
        variant: "default",
        description: "Amount should be atleast equal to 0.50$",
      });
    }
  }
  return (
    <Dialog>
      <DialogTrigger className="h-max rounded-3xl bg-primary-900 px-6 py-2 text-light-900 duration-300 hover:bg-primary-500">
        Book Now
      </DialogTrigger>
      <DialogContent className="!min-w-max bg-light-900">
        <h3 className="h3-semibold">Enter the booking Details</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="bookingName"
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
                        Booking Name
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="mt-2 flex flex-col">
                      <FormLabel>Date of event</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto size-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            className="bg-light-850"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="package"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Pick a package</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {businessPackages.map((p: any, idx: number) => {
                            return (
                              <FormItem key={idx} className="flex-center gap-3">
                                <FormControl>
                                  <RadioGroupItem
                                    className="size-4 rounded-full border border-solid border-gray-400 aria-checked:bg-primary-500"
                                    value={idx.toString()}
                                  />
                                </FormControl>
                                <FormLabel className="!mt-0 flex gap-2">
                                  <p className="w-max">{p.packageName}</p>(
                                  <p className="w-max self-end">
                                    {p.packagePrice}
                                  </p>
                                  )
                                </FormLabel>
                              </FormItem>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="h-max rounded-3xl bg-primary-900 px-6 py-2 text-light-900 duration-300 hover:bg-primary-500"
            >
              Book
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
