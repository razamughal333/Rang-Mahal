import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import "react-phone-number-input/style.css";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const PackagesTab = ({ form }: any) => {
  const handlePackages = (e: any, field: any, type: string, idx: number) => {
    const value = e.target.value;
    const packages = form.getValues().packages;
    if (type === "name") {
      packages[idx].packageName = value;
    } else if (type === "price") {
      packages[idx].packagePrice = value;
    } else if (type === "service") {
      packages[idx].services = value;
    }
    form.setValue("packages", packages);
  };
  const addNewPackage = () => {
    const packages = form.getValues().packages;
    packages.push({
      packageName: "",
      packagePrice: 0,
      services: "",
    });
    form.setValue("packages", packages);
  };
  const deletePackage = (idx: any) => {
    const packages = form.getValues().packages;
    packages.splice(idx, idx);
    form.setValue("packages", packages);
  };
  return (
    <div className="flex flex-col gap-6 px-6">
      <h2 className="h2-bold">Packages</h2>
      <p>
        Enter the packages you offer
        <br />
        You can enter upto 20 packages
      </p>
      <div>
        <FormField
          control={form.control}
          name="packages"
          render={({ field }) => (
            <div className="flex flex-col items-center gap-8">
              {field.value.map((item: any, idx: number) => {
                return (
                  <div
                    key={idx}
                    className="flex flex-col gap-4 rounded-md border border-solid border-gray-400 p-4"
                  >
                    <div className="flex gap-2">
                      <FormItem className="relative">
                        <FormControl>
                          <Input
                            className="form-input peer"
                            placeholder=""
                            onChange={(e) =>
                              handlePackages(e, field, "name", idx)
                            }
                          />
                        </FormControl>
                        <FormLabel className="form-input-label peer-focus:text-xs">
                          Package Name
                          <span className="text-red-600/50">*</span>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="relative">
                        <FormControl>
                          <Input
                            className="form-input peer"
                            placeholder=""
                            type="number"
                            onChange={(e) =>
                              handlePackages(e, field, "price", idx)
                            }
                          />
                        </FormControl>
                        <FormLabel className="form-input-label peer-focus:text-xs">
                          Package Price
                          <span className="text-red-600/50">*</span>
                        </FormLabel>
                      </FormItem>
                    </div>
                    <FormItem className="relative">
                      <FormControl>
                        <Textarea
                          placeholder=""
                          onChange={(e) =>
                            handlePackages(e, field, "service", idx)
                          }
                          className="form-input peer resize-none ring-0 ring-transparent"
                        />
                      </FormControl>
                      <FormLabel className="form-input-label peer-focus:text-xs">
                        Services
                        <span className="text-red-600/50">*</span>
                      </FormLabel>
                    </FormItem>
                    <Button
                      type="button"
                      className="mx-auto mt-4  rounded-full bg-red-500 px-8 text-light-800 transition-colors duration-300 hover:bg-red-800"
                      onClick={() => deletePackage(idx)}
                    >
                      Delete
                    </Button>
                  </div>
                );
              })}
              <Button
                type="button"
                className="mx-auto mt-4  rounded-full bg-primary-900 px-8 text-light-800 transition-colors duration-300 hover:bg-primary-500"
                onClick={() => addNewPackage()}
              >
                Add new Package
              </Button>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default PackagesTab;
