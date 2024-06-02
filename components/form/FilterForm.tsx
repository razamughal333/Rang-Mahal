"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  category: z.string(),
  location: z.string(),
});

export default function FilterForm() {
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      location: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (values.category === "" && values.location === "") {
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
        className="flex size-full flex-col items-center justify-end space-y-8"
      >
        <div className="grid w-full gap-10 px-10 sm:grid-cols-2 sm:px-32">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className=" h3-semibold rounded-lg border-2 p-6 text-white">
                      <SelectValue placeholder="select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="h3-semibold border-2 text-light-700">
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className=" h3-semibold rounded-lg border-2 p-6 text-white">
                      <SelectValue placeholder="select Location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="h3-semibold border-2 text-light-700">
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="mx-auto rounded-3xl bg-primary-900 px-6 text-light-900 duration-300 hover:bg-primary-500"
        >
          Search
        </Button>
      </form>
    </Form>
  );
}
