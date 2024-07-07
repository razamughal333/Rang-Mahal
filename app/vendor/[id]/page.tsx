import EditBusinessForm from "@/components/EditBusinessForm";
import { getBusinessesById } from "@/lib/actions/bussiness.action";
import React from "react";

const Page = async ({ params }: any) => {
  const business = await getBusinessesById(params.id);
  const parsedBusiness = JSON.parse(business).business;
  return (
    <div>
      <EditBusinessForm business={parsedBusiness} id={params.id} />
    </div>
  );
};

export default Page;
