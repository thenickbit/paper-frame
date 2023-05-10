"use client";

import { LogoutButton } from "@/components/LogoutButton";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <h1>Unauthorized</h1>
      <Link href="/">Go to home</Link>
      {/* <LogoutButton /> */}
    </div>
  );
};

export default Page;
