"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const LogOutButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        return signOut({ callbackUrl: "/" });
      }}
      className=" flex justify-center items-center hover:underline hover:underline-offset-4 py-4 ml-11"
      type="button"
    >
      Вийти
      <Image
        className="ml-1"
        src="/svg/login.svg"
        alt="icon login logout"
        width={30}
        height={30}
      />
    </button>
  );
};

export default LogOutButton;
