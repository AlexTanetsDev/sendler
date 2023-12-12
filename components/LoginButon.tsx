"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const LoginButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/login")}
      className=" flex justify-center items-center hover:underline hover:underline-offset-4 py-4 ml-11"
      type="button"
    >
      Увійти
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

export default LoginButton;
