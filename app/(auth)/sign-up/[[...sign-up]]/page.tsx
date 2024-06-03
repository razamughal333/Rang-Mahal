"use client";

import { SignUp } from "@clerk/nextjs";

const Page = () => {
  return (
    <main className="flex-center min-h-screen w-full">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-primary-900 hover:bg-primary-500 outine-none border-none !shadow-none",
            formFieldInput:
              "!shadow-none !border-t-0 !border-b-2 focus:!border-b-primary-500 rounded-none outline-none",
          },
        }}
      />
    </main>
  );
};

export default Page;
