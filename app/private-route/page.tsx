import LogOutButton from "@/components/LogOutButton";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <h2>Only Admin</h2>
     < LogOutButton/>
    </div>
  );
};

export default page;
