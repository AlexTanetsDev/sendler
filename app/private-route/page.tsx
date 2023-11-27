import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <h2>Only Admin</h2>
      <Link
        href="/api/auth/signin"
        className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
      >
        Login
      </Link>
    </div>
  );
};

export default page;
