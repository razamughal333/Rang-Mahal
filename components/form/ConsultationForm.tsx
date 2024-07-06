"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";

const formSchema = z.object({
  full_name: z.string(),
  phone_no: z.string(),
});

export default function ConsultationForm() {
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      phone_no: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (values.full_name === "" && values.phone_no === "") {
      toast({
        variant: "primary",
        title: "Invalid selection",
        description: "Please select a category or location",
      });
    }
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-center size-full flex-wrap gap-4 pt-8 max-sm:flex-col md:p-8"
      >
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem className="relative min-w-[210px]">
              <FormControl>
                <Input className="form-input peer" {...field} />
              </FormControl>
              <FormLabel className="form-input-label peer-focus:text-xs">
                Full Name
              </FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_no"
          render={({ field }) => (
            <FormItem className="relative min-w-[210px]">
              <FormControl>
                <Input
                  type="number"
                  className="peer w-full rounded-none border-0 border-b-2 border-b-gray-300 outline-none transition-colors duration-300 focus:border-b-primary-500"
                  {...field}
                />
              </FormControl>
              <FormLabel className="absolute left-2 top-2 text-gray-400 transition-all duration-300 peer-focus:left-0 peer-focus:top-[-16px] peer-focus:text-xs">
                Phone Number
              </FormLabel>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="rounded-3xl bg-primary-900 px-4 text-light-900 duration-300 hover:bg-primary-500"
        >
          Send
        </Button>
      </form>
    </Form>
  );
}
