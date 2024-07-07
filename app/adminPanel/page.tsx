import { getAllBusinesses } from "@/lib/actions/bussiness.action";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VerifiedBusiness from "@/components/VerifiedBusiness";
import UnVerifiedBusiness from "@/components/UnVerifiedBusiness";

const Page = async () => {
  const businesses = await getAllBusinesses();
  const parsedBusinesses = JSON.parse(businesses);
  const verifiedBusinesses = [];
  const unverifiedBusinesses = [];
  for (const business of parsedBusinesses) {
    if (business.status === false) {
      unverifiedBusinesses.push(business);
    } else {
      verifiedBusinesses.push(business);
    }
  }
  return (
    <div>
      <Tabs defaultValue="verified" className="w-full bg-white">
        <TabsList className="w-full">
          <TabsTrigger
            value="verified"
            className="transition-colors duration-300 aria-selected:bg-primary-500 aria-selected:text-light-800"
          >
            Verified
          </TabsTrigger>
          <TabsTrigger
            className="transition-colors duration-300 aria-selected:bg-primary-500 aria-selected:text-light-800"
            value="unverified"
          >
            UnVerified
          </TabsTrigger>
        </TabsList>
        <TabsContent value="verified">
          <VerifiedBusiness verifiedBusinesses={verifiedBusinesses} />
        </TabsContent>
        <TabsContent value="unverified">
          <UnVerifiedBusiness unverifiedBusinesses={unverifiedBusinesses} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
